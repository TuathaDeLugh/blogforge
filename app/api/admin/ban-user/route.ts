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

        // Prevent banning admin users
        if (user.isAdmin) {
            return NextResponse.json(
                { message: "Cannot ban admin users" },
                { status: 403 }
            );
        }

        let updateData: any = {};
        let emailContent = '';
        let actionType = '';

        if (action === 'ban') {
            updateData.isBanned = true;
            updateData.banReason = reason;
            updateData.isActive = false;
            actionType = 'user_ban';

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
                    case '3months':
                        banExpiry.setMonth(banExpiry.getMonth() + 3);
                        break;
                    default:
                        banExpiry.setDate(banExpiry.getDate() + 1);
                }
                updateData.banExpiry = banExpiry;
            }

            emailContent = `
                <h2>Account Suspended</h2>
                <p>Dear ${user.name || user.username},</p>
                <p>Your BlogForge account has been suspended by an administrator.</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p><strong>Duration:</strong> ${duration === 'permanent' ? 'Permanent' : duration}</p>
                ${updateData.banExpiry ? `<p><strong>Suspension expires:</strong> ${updateData.banExpiry.toLocaleDateString()}</p>` : ''}
                <p>If you believe this action was taken in error, please contact our support team.</p>
                <p>Best regards,<br>BlogForge Admin Team</p>
            `;
        } else if (action === 'unban') {
            updateData.isBanned = false;
            updateData.banReason = null;
            updateData.banExpiry = null;
            updateData.isActive = true;
            actionType = 'user_unban';

            emailContent = `
                <h2>Account Reinstated</h2>
                <p>Dear ${user.name || user.username},</p>
                <p>Your BlogForge account has been reinstated by an administrator.</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p>You can now access your account and use all features of BlogForge.</p>
                <p>Best regards,<br>BlogForge Admin Team</p>
            `;
        }

        // Update user
        await User.findByIdAndUpdate(userId, updateData);

        // Log admin action
        await AdminAction.create({
            adminId: session.user.dbid,
            actionType,
            targetType: 'user',
            targetId: userId,
            targetUserId: userId,
            reason,
            metadata: {
                banDuration: duration
            }
        });

        // Send notification email
        try {
            await sendEmail({
                email: user.email,
                emailType: "ADMIN_ACTION",
                userId: user._id,
                customSubject: `Account ${action === 'ban' ? 'Suspended' : 'Reinstated'} - BlogForge`,
                customHtml: emailContent
            });
        } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
        }

        return NextResponse.json(
            { 
                message: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully`
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error banning/unbanning user:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to update user ban status',
                error: error.message,
            },
            { status: 500 }
        );
    }
}