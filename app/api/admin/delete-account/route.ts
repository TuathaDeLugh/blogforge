import User from "@/models/user";
import AdminAction from "@/models/adminAction";
import { AdminActionTemplate } from "@/models/banTemplate";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { sendEmail } from "@/util/mailer";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }

        const { userId, reason, templateId, customSubject } = await request.json();
        
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        await connectdb();

        let finalReason = reason;

        // If using a template, fetch template data
        if (templateId) {
            const template = await AdminActionTemplate.findById(templateId);
            if (template && template.isActive && template.actionType === 'delete_account') {
                finalReason = template.reason;
                
                // Increment usage count
                await AdminActionTemplate.findByIdAndUpdate(templateId, {
                    $inc: { usageCount: 1 }
                });
            }
        }

        if (!finalReason) {
            return NextResponse.json(
                { message: "Reason is required" },
                { status: 400 }
            );
        }

        // Get the user to delete
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Prevent deleting admin users
        if (user.isAdmin) {
            return NextResponse.json(
                { message: "Cannot delete admin users" },
                { status: 403 }
            );
        }

        // Get admin info for email
        const admin = await User.findById(session.user.dbid);
        const adminName = admin?.name || admin?.username || 'Administrator';

        // Send notification email before deletion
        const emailContent = `
            <h2>Account Deleted</h2>
            <p>Dear ${user.name || user.username},</p>
            <p>Your BlogForge account has been deleted by <strong>${adminName}</strong>.</p>
            <p><strong>Username:</strong> @${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Reason:</strong> ${finalReason}</p>
            <p><strong>Deleted by:</strong> ${adminName}</p>
            <p>All your data, including blogs and comments, has been permanently removed from our system.</p>
            <p>If you believe this action was taken in error, please contact our support team immediately.</p>
            <p>Best regards,<br>BlogForge Admin Team</p>
        `;

        try {
            const defaultSubject = `Account Deleted - BlogForge`;
            await sendEmail({
                email: user.email,
                emailType: "ADMIN_ACTION",
                userId: user._id,
                customSubject: customSubject || defaultSubject,
                customHtml: emailContent
            });
        } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
        }

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
                templateId: templateId || null,
                customReason: templateId ? reason : null
            }
        });

        // Delete the user
        await User.findByIdAndDelete(userId);

        return NextResponse.json(
            { 
                message: `Account for ${user.username} deleted successfully`,
                deletedUsername: user.username,
                templateUsed: templateId ? true : false
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