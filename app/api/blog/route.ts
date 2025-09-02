import Blog from '@/models/blog';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import AdminAction from '@/models/adminAction';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { sendEmail } from '@/util/mailer';
import { checkUserBanStatus, createBanResponse } from '@/util/banCheck';

export async function POST(request: Request) {
  try {
    const { title, category, images, detail, info, status, keywords, creator } =
      await request.json();

    // Check if user is banned
    const banStatus = await checkUserBanStatus(creator);
    if (banStatus.isBanned) {
      return NextResponse.json(
        createBanResponse(
          'Your account has been banned. You cannot create blogs.'
        ),
        { status: 403 }
      );
    }

    await connectdb();
    await Blog.create({
      title,
      category,
      images,
      detail,
      info,
      status,
      keywords,
      creator,
    });

    return NextResponse.json(
      {
        message: 'Blog Saved',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error saving blog:', error);
    return NextResponse.json(
      {
        message: `Failed to save ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectdb();
    const sort = -1;
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const page = parseInt(pageParam as string) || 1;
    const pageSize = 15;
    const skip = (page - 1) * pageSize;

    const blogs = await Blog.find({ status: 'published' })
      .populate('creator', '_id username avatar')
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(pageSize);

    const totalDocuments = await Blog.countDocuments({ status: 'published' });
    const hasNextPage = skip + pageSize < totalDocuments;

    return NextResponse.json(
      {
        data: blogs,
        meta: {
          totalDocuments,
          totalPages: Math.ceil(totalDocuments / pageSize),
          currentPage: page,
          hasNextPage,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in GET handler:', error.message);
    return NextResponse.json(
      { message: 'Failed to load', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectdb();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Blog Deleted' }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to load', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { blog, user, comment, action, commid, adminReason } =
      await request.json();

    await connectdb();

    const foundBlog = await Blog.findById(blog).exec();
    if (!foundBlog) {
      console.error('Blog not found');
      return NextResponse.json({ message: 'not found' }, { status: 404 });
    }
    switch (action) {
      case 'add': {
        // Check if user is banned from commenting
        const banStatus = await checkUserBanStatus(user);
        if (banStatus.commentBanned) {
          return NextResponse.json(
            createBanResponse('You have been banned from commenting.'),
            { status: 403 }
          );
        }

        const id = Math.floor(Math.random() * 1000000).toString();
        foundBlog.comments.push({ _id: id, user, comment });
        await foundBlog.save();
        return NextResponse.json(
          { message: 'Comment created' },
          { status: 200 }
        );
      }
      case 'remove': {
        // Find the comment to be removed
        const commentToRemove = foundBlog.comments.find(
          (c: any) => c._id === commid
        );

        if (commentToRemove) {
          // Get session to check if admin is removing the comment
          const session = await getServerSession(authOptions);
          const isAdminRemoval =
            session?.user?.isAdmin &&
            commentToRemove.user.toString() !== session.user.dbid;

          // Remove the comment
          foundBlog.comments.pull({ _id: commid });
          await foundBlog.save();

          // If admin removed someone else's comment, log and notify
          if (isAdminRemoval && commentToRemove.user) {
            // Get comment author details
            const commentAuthor = await User.findById(commentToRemove.user);

            if (commentAuthor) {
              // Log admin action
              await AdminAction.create({
                adminId: session.user.dbid,
                actionType: 'comment_remove',
                targetType: 'comment',
                targetId: commid,
                targetUserId: commentToRemove.user,
                originalContent: commentToRemove.comment,
                reason: adminReason || 'Inappropriate content',
                metadata: {
                  blogTitle: foundBlog.title,
                  commentContent: commentToRemove.comment,
                },
              });

              // Send notification to comment author
              const emailContent = `
                                <h2>Your Comment Has Been Removed</h2>
                                <p>Dear ${commentAuthor.name || commentAuthor.username},</p>
                                <p>Your comment on the blog "<strong>${foundBlog.title}</strong>" has been removed by an administrator.</p>
                                <p><strong>Removed Comment:</strong></p>
                                <div style="background-color: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid #ccc;">
                                    ${commentToRemove.comment}
                                </div>
                                <p><strong>Reason:</strong> ${adminReason || 'Inappropriate content'}</p>
                                <p>Please ensure your future comments comply with our community guidelines.</p>
                                <p>Best regards,<br>BlogForge Admin Team</p>
                            `;

              try {
                await sendEmail({
                  email: commentAuthor.email,
                  emailType: 'ADMIN_ACTION',
                  userId: commentAuthor._id,
                  customSubject: `Your Comment Has Been Removed - BlogForge`,
                  customHtml: emailContent,
                });
              } catch (emailError) {
                console.error(
                  'Failed to send comment removal notification:',
                  emailError
                );
              }

              // Also notify blog creator if different from comment author
              if (
                foundBlog.creator._id.toString() !==
                commentToRemove.user.toString()
              ) {
                const blogCreatorEmailContent = `
                                    <h2>Comment Removed from Your Blog</h2>
                                    <p>Dear ${foundBlog.creator.name || foundBlog.creator.username},</p>
                                    <p>A comment on your blog "<strong>${foundBlog.title}</strong>" has been removed by an administrator.</p>
                                    <p><strong>Removed Comment:</strong></p>
                                    <div style="background-color: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid #ccc;">
                                        ${commentToRemove.comment}
                                    </div>
                                    <p><strong>Reason:</strong> ${adminReason || 'Inappropriate content'}</p>
                                    <p>Best regards,<br>BlogForge Admin Team</p>
                                `;

                try {
                  await sendEmail({
                    email: foundBlog.creator.email,
                    emailType: 'ADMIN_ACTION',
                    userId: foundBlog.creator._id,
                    customSubject: `Comment Removed from Your Blog - BlogForge`,
                    customHtml: blogCreatorEmailContent,
                  });
                } catch (emailError) {
                  console.error(
                    'Failed to send blog creator notification:',
                    emailError
                  );
                }
              }
            }
          }
        }

        return NextResponse.json(
          { message: 'Comment removed' },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to load', error: error.message },
      { status: 500 }
    );
  }
}
