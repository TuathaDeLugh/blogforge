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

        const { userId, newUsername, reason, templateId, customSubject } = await request.json();
        
        if (!userId || !newUsername) {
            return NextResponse.json(
                { message: "User ID and new username are required" },
                { status: 400 }
            );
        }

        await connectdb();

        let finalReason = reason;

        // If using a template, fetch template data
        if (templateId) {
            const template = await AdminActionTemplate.findById(templateId);
            if (template && template.isActive && template.actionType === 'username_change') {
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
            reason: finalReason,
            metadata: {
                originalUsername,
                newUsername,
                templateId: templateId || null,
                customReason: templateId ? reason : null
            }
        });

        // Get admin info for email
        const admin = await User.findById(session.user.dbid);
        const adminName = admin?.name || admin?.username || 'Administrator';

        // Send notification email
        const emailContent = `
            <h2>Username Changed</h2>
            <p>Dear ${user.name || originalUsername},</p>
            <p>Your username has been changed to <strong>${newUsername}</strong> by <strong>${adminName}</strong>.</p>
            <p><strong>Original Username:</strong> @${originalUsername}</p>
            <p><strong>New Username:</strong> @${newUsername}</p>
            <p><strong>Reason:</strong> ${finalReason}</p>
            <p><strong>Changed by:</strong> ${adminName}</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>BlogForge Admin Team</p>
        `;

        try {
            const defaultSubject = `Username Changed to ${newUsername} - BlogForge`;
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

        return NextResponse.json(
            { 
                message: `Username changed from ${originalUsername} to ${newUsername} successfully`,
                originalUsername,
                newUsername,
                templateUsed: templateId ? true : false
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