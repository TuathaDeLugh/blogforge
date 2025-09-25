import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { email, username, message } = await request.json();

    if (!email || !username || !message) {
      return NextResponse.json(
        { message: 'Email, username, and message are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILHOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    });

    const mailOption = {
      from: process.env.MAILUSER,
      to: email,
      subject: 'Important: Account Deletion Notification - BlogForge',
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
                        <h2 style="color: #333; margin-bottom: 15px;">Hello, ${username}!</h2>
                        
                        <div style="background-color: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #FF6347; margin: 20px 0;">
                            <pre style="font-family: Arial, sans-serif; white-space: pre-wrap; color: #555; line-height: 1.6; margin: 0;">${message}</pre>
                        </div>

                        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                            <h3 style="color: #856404; margin: 0 0 10px 0;">⚠️ Important Information:</h3>
                            <ul style="color: #856404; margin: 0; padding-left: 20px;">
                                <li>Your account will be permanently deleted</li>
                                <li>All personal data will be removed from our systems</li>
                                <li>Your created blogs will be transferred to admin to preserve content</li>
                                <li>This action cannot be undone</li>
                            </ul>
                        </div>

                        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
                            If you have any questions or concerns, please contact our support team immediately at 
                            <a href="mailto:service@blogforge.in" style="color: #FF6347; text-decoration: none;">service@blogforge.in</a>
                        </p>
                    </div>

                    <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
                        <p style="color: #888; font-size: 12px;">This email was sent from BlogForge Admin. Please do not reply to this email.</p>
                        <p style="color: #888; font-size: 12px;">BlogForge, All rights reserved.</p>
                        <p style="color: #888; font-size: 12px;">This email was sent to ${email}. If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #FF6347; text-decoration: none;">contact us</a>.</p>
                    </div>
                </div>
            `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: 'Deletion notification email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending deletion email:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to send deletion email',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
