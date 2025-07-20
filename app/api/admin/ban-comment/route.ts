import User from "@/models/user";
import AdminAction from "@/models/adminAction";
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

        const { userId, action, duration, reason } = await request.json();
        
        if (!userId || !action || !reason) {
            return NextResponse.json(
                { message: "User ID, action, and reason are required" },
                { status: 400 }
            );
        }

        await connectdb();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Prevent banning admin users from commenting
        if (user.isAdmin) {
            return NextResponse.json(
                { message: "Cannot ban admin users from commenting" },
                { status: 403 }
            );
        }

        let updateData: any = {};
        let emailContent = '';

        if (action === 'ban') {
            updateData.commentBanned = true;
            updateData.commentBanReason = reason;

            if (duration && duration !== 'permanent') {
                const banExpiry = new Date();
                switch (duration) {
                    case '1day':
                        banExpiry.setDate(banExpiry.getDate() + 1);
                        break;
                    case '1week':
                        banExpiry.setDate(banExpiry.getDate() + 7);
                        break;
                    case '1month':
                        banExpiry.setMonth(banExpiry.getMonth() + 1);
                        break;
                    default:
                        banExpiry.setDate(banExpiry.getDate() + 1);
                }
                updateData.commentBanExpiry = banExpiry;
            }

            emailContent = `
                <h2>Comment Privileges Suspended</h2>
                <p>Dear ${user.name || user.username},</p>
                <p>Your commenting privileges on BlogForge have been suspended by an administrator.</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p><strong>Duration:</strong> ${duration === 'permanent' ? 'Permanent' : duration}</p>
                ${updateData.commentBanExpiry ? `<p><strong>Suspension expires:</strong> ${updateData.commentBanExpiry.toLocaleDateString()}</p>` : ''}
                <p>You can still read blogs and use other features, but you cannot post comments during this period.</p>
                <p>If you believe this action was taken in error, please contact our support team.</p>
                <p>Best regards,<br>BlogForge Admin Team</p>
            `;
        } else if (action === 'unban') {
            updateData.commentBanned = false;
            updateData.commentBanReason = null;
            updateData.commentBanExpiry = null;

            emailContent = `
                <h2>Comment Privileges Restored</h2>
                <p>Dear ${user.name || user.username},</p>
                <p>Your commenting privileges on BlogForge have been restored by an administrator.</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p>You can now comment on blogs again.</p>
                <p>Best regards,<br>BlogForge Admin Team</p>
            `;
        }

        // Update user
        await User.findByIdAndUpdate(userId, updateData);

        // Log admin action
        await AdminAction.create({
            adminId: session.user.dbid,
            actionType: action === 'ban' ? 'user_ban' : 'user_unban',
            targetType: 'user',
            targetId: userId,
            targetUserId: userId,
            reason,
            metadata: {
                banDuration: duration,
                banType: 'comment'
            }
        });

        // Send notification email
        try {
            await sendEmail({
                email: user.email,
                emailType: "ADMIN_ACTION",
                userId: user._id,
                customSubject: `Comment Privileges ${action === 'ban' ? 'Suspended' : 'Restored'} - BlogForge`,
                customHtml: emailContent
            });
        } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
        }

        return NextResponse.json(
            { 
                message: `User comment privileges ${action === 'ban' ? 'suspended' : 'restored'} successfully`
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error updating comment ban status:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to update comment ban status',
                error: error.message,
            },
            { status: 500 }
        );
    }
}