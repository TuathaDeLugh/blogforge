import { NextRequest, NextResponse } from 'next/server';
import connectdb from '@/util/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { generateOTP, sendEmail } from '@/util/mailer';

export async function POST(request: NextRequest) {
  try {
    await connectdb();
    const { email, password } = await request.json();

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username: email }],
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify password
    const passwordsMatch = await bcrypt.compare(password, user.password || '');
    if (!passwordsMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Generate and send OTP
      const otp = generateOTP();
      
      await User.findByIdAndUpdate(user._id, {
        twoFactorToken: otp,
        twoFactorTokenExpiry: Date.now() + 300000 // 5 minutes
      });

      await sendEmail({
        email: user.email,
        emailType: 'TWO_FA_OTP',
        otpCode: otp
      });

      return NextResponse.json({ 
        requires2FA: true,
        userId: user._id.toString(),
        email: user.email,
        message: "Verification code sent to your email"
      }, { status: 200 });
    }

    // Return success for non-2FA users
    return NextResponse.json({ 
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}