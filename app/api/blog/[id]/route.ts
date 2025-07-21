import Blog from "@/models/blog";
import User from '@/models/user';
import AdminAction from '@/models/adminAction';
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { sendEmail } from "@/util/mailer";
import { checkUserBanStatus, createBanResponse } from "@/util/banCheck";

export async function PUT(request:Request,{params}:any){
    try {
        if (!User) {
            throw new Error('User model is not registered');
        }
        
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;
        const { title, category, images, detail, info, status, keywords, adminReason } = await request.json();
        
        await connectdb();
        
        // Get the original blog
        const originalBlog = await Blog.findById(id).populate('creator', 'email name username');
        if (!originalBlog) {
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        // Check if this is an admin editing someone else's blog
        const isAdminEdit = session.user.isAdmin && originalBlog.creator._id.toString() !== session.user.dbid;

        // If not admin edit, check if user is banned (admins can always edit)
        if (!isAdminEdit) {
            const banStatus = await checkUserBanStatus(session?.user?.dbid!);
            if (banStatus.isBanned) {
                return NextResponse.json(
                    createBanResponse("Your account has been banned. You cannot edit blogs."),
                    { status: 403 }
                );
            }
        }

        // Update the blog
        await Blog.findByIdAndUpdate(id, { title, category, images, detail, info, status, keywords });

        // If admin edited someone else's blog, log the action and send notification
        if (isAdminEdit) {
            // Log admin action
            await AdminAction.create({
                adminId: session.user.dbid,
                actionType: 'blog_edit',
                targetType: 'blog',
                targetId: id,
                targetUserId: originalBlog.creator._id,
                originalContent: JSON.stringify({
                    title: originalBlog.title,
                    detail: originalBlog.detail,
                    info: originalBlog.info
                }),
                newContent: JSON.stringify({
                    title,
                    detail,
                    info
                }),
                reason: adminReason || 'Admin modification',
                metadata: {
                    blogTitle: originalBlog.title
                }
            });

            // Send notification email to original author
            const emailContent = `
                <h2>Your Blog Has Been Modified</h2>
                <p>Dear ${originalBlog.creator.name || originalBlog.creator.username},</p>
                <p>Your blog titled "<strong>${originalBlog.title}</strong>" has been edited by an administrator.</p>
                <p><strong>Reason:</strong> ${adminReason || 'Content moderation'}</p>
                <p><strong>Original Content:</strong></p>
                <div style="background-color: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid #ccc;">
                    <p><strong>Title:</strong> ${originalBlog.title}</p>
                    <p><strong>Description:</strong> ${originalBlog.info}</p>
                </div>
                <p><strong>Modified Content:</strong></p>
                <div style="background-color: #e8f5e8; padding: 10px; margin: 10px 0; border-left: 4px solid #4caf50;">
                    <p><strong>Title:</strong> ${title}</p>
                    <p><strong>Description:</strong> ${info}</p>
                </div>
                <p>If you have any questions about these changes, please contact our support team.</p>
                <p>Best regards,<br>BlogForge Admin Team</p>
            `;

            try {
                await sendEmail({
                    email: originalBlog.creator.email,
                    emailType: "ADMIN_ACTION",
                    userId: originalBlog.creator._id,
                    customSubject: `Your Blog "${originalBlog.title}" Has Been Modified - BlogForge`,
                    customHtml: emailContent
                });
            } catch (emailError) {
                console.error('Failed to send blog modification notification:', emailError);
            }
        }

        return NextResponse.json({message:"Blog Updated"},{status:200});
    } catch (error: any) {
        console.error('Error updating blog:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to update blog',
                error: error.message,
            },
            { status: 500 }
        );
    }
} 

export async function GET(request:Request, { params }:any) {
    try {
        const { id } = params;
        await connectdb();
        const blog = await Blog.findById(id).populate({path:'creator',select:'_id username avatar'}).populate({path:'comments.user',select:'username avatar'});
        return NextResponse.json({ data:blog }, { status: 200 });
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ 
            message: 'Failed to load blogs',
            error: error.message, 
        },
        { status: 500 });
    }

}