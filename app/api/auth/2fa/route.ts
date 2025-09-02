import { NextRequest, NextResponse } from 'next/server';
import connectdb from '@/util/mongodb';
import User from '@/models/user';
import { sendEmail, generateOTP } from '@/util/mailer';

// Enable 2FA
export async function POST(request: NextRequest) {
  try {
    await connectdb();
    const { userId, action } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (action === 'enable') {
      // Send confirmation email to enable 2FA
      await sendEmail({
        email: user.email,
        emailType: 'ENABLE_2FA',
      });

      return NextResponse.json(
        {
          message:
            '2FA enable confirmation email sent. Please check your inbox.',
        },
        { status: 200 }
      );
    }

    if (action === 'disable') {
      // Disable 2FA
      await User.findByIdAndUpdate(userId, {
        twoFactorEnabled: false,
        twoFactorToken: null,
        twoFactorTokenExpiry: null,
      });

      return NextResponse.json(
        {
          message: 'Two-Factor Authentication has been disabled.',
        },
        { status: 200 }
      );
    }

    if (action === 'send-otp') {
      // Generate and send OTP for login
      const otp = generateOTP();

      await User.findByIdAndUpdate(userId, {
        twoFactorToken: otp,
        twoFactorTokenExpiry: Date.now() + 300000, // 5 minutes
      });

      await sendEmail({
        email: user.email,
        emailType: 'TWO_FA_OTP',
        otpCode: otp,
      });

      return NextResponse.json(
        {
          message: 'Verification code sent to your email.',
        },
        { status: 200 }
      );
    }

    if (action === 'verify-otp') {
      const { otp } = await request.json();

      if (!user.twoFactorToken || user.twoFactorToken !== otp) {
        return NextResponse.json(
          { message: 'Invalid verification code' },
          { status: 400 }
        );
      }

      if (user.twoFactorTokenExpiry && Date.now() > user.twoFactorTokenExpiry) {
        return NextResponse.json(
          { message: 'Verification code has expired' },
          { status: 400 }
        );
      }

      // Clear the OTP after successful verification
      await User.findByIdAndUpdate(userId, {
        twoFactorToken: null,
        twoFactorTokenExpiry: null,
      });

      return NextResponse.json(
        {
          message: 'Verification successful',
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('2FA API Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
