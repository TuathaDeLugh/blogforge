import User from '@/models/user';
import Blog from '@/models/blog';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request, response: Response) {
  try {
    await connectdb();
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const page = parseInt(pageParam as string) || 1;
    const pageSize = 9;
    const skip = (page - 1) * pageSize;

    const userData = await Blog.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$creator',
          totalBlogs: { $sum: 1 },
          totalShares: { $sum: '$share' },
          totalSaves: { $sum: '$usersave' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          _id: '$userDetails._id',
          username: '$userDetails.username',
          name: '$userDetails.name',
          avatar: '$userDetails.avatar',
          joined: '$userDetails.createdAt',
          totalBlogs: 1,
          totalShares: 1,
          totalSaves: 1,
        },
      },
      { $sort: { totalBlogs: -1, totalShares: -1, totalSaves: -1 } }, // Sort by total blogs, shares, and saves in descending order
      { $skip: skip },
      { $limit: pageSize },
    ]);

    const totalWritersCount = await Blog.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$creator',
        },
      },
      { $count: 'totalWriters' },
    ]);

    const totalWriters =
      totalWritersCount.length > 0 ? totalWritersCount[0].totalWriters : 0;

    const totalPages = Math.ceil(totalWriters / pageSize);
    const hasNextPage = page < totalPages;

    const formatJoinedDate = (joined: Date): string => {
      const now = new Date();
      const joinedDate = new Date(joined);
      const diff = Math.abs(now.getTime() - joinedDate.getTime());
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

      if (diffDays < 14) {
        return `${diffDays} days ago`;
      } else if (diffDays < 28) {
        return `${Math.floor(diffDays / 7)} weeks ago`;
      } else if (diffDays < 365) {
        return `${Math.floor(diffDays / 30)} months ago`;
      } else {
        return joinedDate.toLocaleDateString();
      }
    };

    return NextResponse.json(
      {
        success: true,
        data: userData.map((writer) => ({
          ...writer,
          joined: formatJoinedDate(writer.joined),
        })),
        meta: {
          totalWriters,
          totalPages,
          currentPage: page,
          hasNextPage,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in GET handler:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to load',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
