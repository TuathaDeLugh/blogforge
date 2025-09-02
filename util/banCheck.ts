import User from '@/models/user';
import connectdb from './mongodb';

export async function checkUserBanStatus(userId: string) {
  try {
    await connectdb();
    const user = await User.findById(userId).select(
      'isBanned banExpiry commentBanned commentBanExpiry isActive'
    );

    if (!user) {
      return { isBanned: false, commentBanned: false, isActive: true };
    }

    // Check if user ban has expired
    if (user.isBanned && user.banExpiry && new Date() > user.banExpiry) {
      await User.findByIdAndUpdate(userId, {
        isBanned: false,
        banExpiry: null,
        banReason: null,
        isActive: true,
      });
      user.isBanned = false;
      user.isActive = true;
    }

    // Check if comment ban has expired
    if (
      user.commentBanned &&
      user.commentBanExpiry &&
      new Date() > user.commentBanExpiry
    ) {
      await User.findByIdAndUpdate(userId, {
        commentBanned: false,
        commentBanExpiry: null,
        commentBanReason: null,
      });
      user.commentBanned = false;
    }

    return {
      isBanned: user.isBanned,
      commentBanned: user.commentBanned,
      isActive: user.isActive,
    };
  } catch (error) {
    console.error('Error checking ban status:', error);
    return { isBanned: false, commentBanned: false, isActive: true };
  }
}

export function createBanResponse(message: string) {
  return {
    error: message,
    banned: true,
  };
}
