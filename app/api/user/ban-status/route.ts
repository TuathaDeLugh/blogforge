import { NextResponse } from 'next/server';
import { checkUserBanStatus } from '@/util/banCheck';
import User from '@/models/user';
import connectdb from '@/util/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectdb();

    // Get user ban details
    const user = await User.findById(userId).select(
      'isBanned banExpiry banReason commentBanned commentBanExpiry commentBanReason'
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check and update expired bans
    const banStatus = await checkUserBanStatus(userId);

    return NextResponse.json(
      {
        isBanned: banStatus.isBanned,
        commentBanned: banStatus.commentBanned,
        banExpiry: user.banExpiry,
        commentBanExpiry: user.commentBanExpiry,
        banReason: user.banReason,
        commentBanReason: user.commentBanReason,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error checking ban status:', error);
    return NextResponse.json(
      { message: 'Failed to check ban status', error: error.message },
      { status: 500 }
    );
  }
}
