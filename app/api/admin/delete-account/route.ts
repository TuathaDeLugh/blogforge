import User from '@/models/user';
import Blog from '@/models/blog';
import AdminAction from '@/models/adminAction';
import { AdminActionTemplate } from '@/models/banTemplate';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { userId, reason, templateId, customSubject, emailMessage } =
      await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectdb();

    let finalReason = reason;
    let finalEmailMessage = emailMessage;

    // If using a template, fetch template data
    if (templateId) {
      const template = await AdminActionTemplate.findById(templateId);
      if (
        template &&
        template.isActive &&
        template.actionType === 'delete_account'
      ) {
        finalReason = template.reason;
        finalEmailMessage = template.reason; // Use template reason as email message if not provided

        // Increment usage count
        await AdminActionTemplate.findByIdAndUpdate(templateId, {
          $inc: { usageCount: 1 },
        });
      }
    }

    if (!finalReason) {
      return NextResponse.json(
        { message: 'Reason is required' },
        { status: 400 }
      );
    }

    // Get the user to delete
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Prevent deleting admin users
    if (user.isAdmin) {
      return NextResponse.json(
        { message: 'Cannot delete admin users' },
        { status: 403 }
      );
    }

    // Get admin info for email
    const admin = await User.findById(session.user.dbid);
    const adminName = admin?.name || admin?.username || 'Administrator';

    // Find admin user to reassign blogs
    const adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      return NextResponse.json(
        { message: 'Admin user not found for blog reassignment' },
        { status: 500 }
      );
    }

    // Send notification email before deletion using the existing email system
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.in',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILUSER,
          pass: process.env.MAILPASS,
        },
      });

      const defaultSubject = `Important: Account Deletion Notification - BlogForge`;
      const emailContent =
        finalEmailMessage ||
        `Dear ${user.name || user.username},

Your BlogForge account has been deleted by ${adminName}.

Reason: ${finalReason}
Deleted by: ${adminName}

Your account has been permanently deleted, and all associated data has been removed from our systems. Any blogs you have created have been transferred to our admin account to maintain content integrity for other users.

If you believe this action was taken in error, please contact our support team immediately.

Best regards,
BlogForge Admin Team`;

      const mailOption = {
        from: process.env.MAILUSER,
        to: user.email,
        subject: customSubject || defaultSubject,
        html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FF6347; border-radius: 8px; overflow: hidden; background-color: #fff;">
                        
                        <div style="background-color: #FF6347; padding: 20px; text-align: center;">
                            <h1 style="color: #fff; margin: 0; font-size: 28px;">
                                Account Deletion Notification
                                <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px; margin-top: 10px;">
                                    <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
                                </span>
                            </h1>
                        </div>

                        <div style="padding: 20px; background-color: #f9f9f9;">
                            <h2 style="color: #333; margin-bottom: 15px;">Hello, ${user.name || user.username}!</h2>
                            
                            <div style="background-color: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #FF6347; margin: 20px 0;">
                                <pre style="font-family: Arial, sans-serif; white-space: pre-wrap; color: #555; line-height: 1.6; margin: 0;">${emailContent}</pre>
                            </div>

                            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                                <h3 style="color: #856404; margin: 0 0 10px 0;">⚠️ Important Information:</h3>
                                <ul style="color: #856404; margin: 0; padding-left: 20px;">
                                    <li>Your account has been permanently deleted</li>
                                    <li>All personal data has been removed from our systems</li>
                                    <li>Your created blogs have been transferred to admin to preserve content</li>
                                    <li>This action cannot be undone</li>
                                </ul>
                            </div>

                            <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
                                If you have any questions or concerns, please contact our support team at 
                                <a href="mailto:service@blogforge.in" style="color: #FF6347; text-decoration: none;">service@blogforge.in</a>
                            </p>
                        </div>

                        <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
                            <p style="color: #888; font-size: 12px;">This email was sent from BlogForge Admin. Please do not reply to this email.</p>
                            <p style="color: #888; font-size: 12px;">BlogForge, All rights reserved.</p>
                            <p style="color: #888; font-size: 12px;">This email was sent to ${user.email}. If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #FF6347; text-decoration: none;">contact us</a>.</p>
                        </div>
                    </div>
                `,
      };

      await transporter.sendMail(mailOption);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    // Reassign all blogs created by this user to admin
    const blogsUpdated = await Blog.updateMany(
      { creator: userId },
      { creator: adminUser._id }
    );

    // Log admin action before deletion
    await AdminAction.create({
      adminId: session.user.dbid,
      actionType: 'delete_account',
      targetType: 'user',
      targetId: userId,
      targetUserId: userId,
      reason: finalReason,
      metadata: {
        deletedUsername: user.username,
        deletedEmail: user.email,
        deletedName: user.name,
        blogsReassigned: blogsUpdated.modifiedCount,
        templateId: templateId || null,
        customReason: templateId ? reason : null,
      },
    });

    // Delete the user
    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      {
        message: `User ${user.username} deleted successfully. Email notification sent.`,
        deletedUsername: user.username,
        blogsReassigned: blogsUpdated.modifiedCount,
        templateUsed: templateId ? true : false,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting account:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to delete account',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
