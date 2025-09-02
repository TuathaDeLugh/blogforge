import { NextRequest, NextResponse } from 'next/server';
import connectdb from '@/util/mongodb';
import User from '@/models/user';

export async function POST(request: NextRequest) {
  try {
    await connectdb();
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 }
      );
    }

    // Find user with the 2FA token
    const user = await User.findOne({
      twoFactorToken: token,
      twoFactorTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'Invalid or expired token',
        },
        { status: 400 }
      );
    }

    // Enable 2FA for the user
    await User.findByIdAndUpdate(user._id, {
      twoFactorEnabled: true,
      twoFactorToken: null,
      twoFactorTokenExpiry: null,
    });

    return NextResponse.json(
      {
        message: 'Two-Factor Authentication has been enabled successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Enable 2FA Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
