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

        const { userId, newUsername, reason } = await request.json();
        
        if (!userId || !newUsername || !reason) {
            return NextResponse.json(
                { message: "User ID, new username, and reason are required" },
                { status: 400 }
            );
        }

        await connectdb();

        // Check if new username already exists
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return NextResponse.json(
                { message: "Username already exists" },
                { status: 400 }
            );
        }

        // Get the user to update
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const originalUsername = user.username;

        // Update username
        await User.findByIdAndUpdate(userId, { username: newUsername });

        // Log admin action
        await AdminAction.create({
            adminId: session.user.dbid,
            actionType: 'username_change',
            targetType: 'user',
            targetId: userId,
            targetUserId: userId,
            reason,
            metadata: {
                originalUsername,
                newUsername
            }
        });

        // Send notification email
        const emailContent = `
            <h2>Username Changed</h2>
            <p>Dear ${user.name || originalUsername},</p>
            <p>Your username has been changed by an administrator.</p>
            <p><strong>Original Username:</strong> ${originalUsername}</p>
            <p><strong>New Username:</strong> ${newUsername}</p>
            <p><strong>Reason:</strong> ${reason}</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>BlogForge Admin Team</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                emailType: "ADMIN_ACTION",
                userId: user._id,
                customSubject: "Username Changed - BlogForge",
                customHtml: emailContent
            });
        } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
        }

        return NextResponse.json(
            { 
                message: "Username changed successfully",
                originalUsername,
                newUsername
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error changing username:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to change username',
                error: error.message,
            },
            { status: 500 }
        );
    }
}