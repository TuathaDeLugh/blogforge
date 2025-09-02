import Blog from '@/models/blog';
import User from '@/models/user';
import { sendEmail } from '@/util/mailer';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: any) {
  const { id } = params;

  await connectdb();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ data: user }, { status: 200 });
}

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = params;
    const { name, username, email, newMail, avatar, isAdmin, type } =
      await request.json();

    await connectdb();

    const [existingUser, existingUsername, currentUser] = await Promise.all([
      User.findOne({ email: email, _id: { $ne: id } }),
      User.findOne({ username, _id: { $ne: id } }),
      User.findById(id),
    ]);

    if (type === 'info') {
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already used by another user' },
          { status: 400 }
        );
      }
      if (existingUsername) {
        return NextResponse.json(
          { message: 'Username already exists' },
          { status: 400 }
        );
      }
    }

    const updateFields: any = { name, username, avatar, isAdmin };
    let responseMessage = 'User updated successfully';

    if (newMail && newMail !== currentUser.email) {
      updateFields.newMail = newMail;
      await sendEmail({
        email: newMail,
        emailType: 'EMAIL_CHANGE',
        username: currentUser.username,
      });
      responseMessage += '. Email verification link sent to your new email';
    } else if (newMail === currentUser.email) {
      updateFields.newMail = '';
      updateFields.NewMailToken = '';
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return NextResponse.json(
      { message: responseMessage, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: any) {
  const { id } = params;
  const { type, id: rid } = await request.json();

  try {
    await connectdb();

    switch (type) {
      case 'addToSavelist':
        await User.findByIdAndUpdate(id, {
          $push: { savelist: rid },
        });
        await Blog.findByIdAndUpdate(rid, {
          $inc: { usersave: 1 },
        });
        break;
      case 'removeSavelist':
        const user = await User.findById(id);
        if (!user) {
          return NextResponse.json(
            { message: 'User not found' },
            { status: 404 }
          );
        } else {
          const index = user.savelist.indexOf(rid);
          if (index > -1) {
            user.savelist.splice(index, 1);
            await user.save();
            await Blog.findByIdAndUpdate(rid, {
              $inc: { usersave: -1 },
            });
          }
        }
        break;
      default:
        return NextResponse.json(
          { message: 'Invalid action type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error: any) {
    console.error('Error in PATCH handler:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
