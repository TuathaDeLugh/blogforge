import Blog from '@/models/blog';
import Email from '@/models/mail';
import User from '@/models/user';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortDirection = searchParams.get('sort') === '1' ? 1 : -1;

  try {
    await connectdb();

    const topWriters = await User.aggregate([
      {
        $lookup: {
          from: 'blogs',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$creator', '$$userId'] },
                    { $eq: ['$status', 'published'] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: '$creator',
                totalBlogs: { $sum: 1 },
                totalUsersave: { $sum: '$usersave' },
                totalShare: { $sum: '$share' },
              },
            },
          ],
          as: 'publishedBlogs',
        },
      },
      {
        $addFields: {
          totalBlogs: { $arrayElemAt: ['$publishedBlogs.totalBlogs', 0] },
          totalUsersave: { $arrayElemAt: ['$publishedBlogs.totalUsersave', 0] },
          totalShare: { $arrayElemAt: ['$publishedBlogs.totalShare', 0] },
          score: {
            $add: [
              {
                $ifNull: [
                  { $arrayElemAt: ['$publishedBlogs.totalBlogs', 0] },
                  0,
                ],
              },
              {
                $multiply: [
                  {
                    $ifNull: [
                      { $arrayElemAt: ['$publishedBlogs.totalUsersave', 0] },
                      0,
                    ],
                  },
                  2,
                ],
              },
              {
                $ifNull: [
                  { $arrayElemAt: ['$publishedBlogs.totalShare', 0] },
                  0,
                ],
              },
            ],
          },
        },
      },
      { $match: { totalBlogs: { $gt: 0 } } },
      { $sort: { score: -1 } },
      { $limit: 5 },
      {
        $project: {
          username: 1,
          name: 1,
          avatar: 1,
          email: 1,
          score: 1,
          totalBlogs: 1,
          totalUsersave: 1,
          totalShare: 1,
        },
      },
    ]);

    const mostCommentedBlogs = await Blog.aggregate([
      {
        $project: {
          title: 1,
          images: 1,
          commentsCount: { $size: { $ifNull: ['$comments', []] } },
        },
      },
      {
        $sort: {
          commentsCount: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const mostSavedBlogs = await Blog.find()
      .sort({ usersave: -1 })
      .limit(5)
      .select('_id images title usersave');

    const mostSharedBlogs = await Blog.find()
      .sort({ share: -1 })
      .limit(5)
      .select('_id images title share');

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('_id title images category createdAt');

    const popularBlogs = await Blog.find()
      .sort({ usersave: -1 })
      .limit(5)
      .select('_id title images category createdAt');

    const popularCategories = await Blog.aggregate([
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    const totalEmails = await Email.find().countDocuments();

    return NextResponse.json({
      topWriters,
      mostCommentedBlogs,
      mostSavedBlogs,
      mostSharedBlogs,
      recentBlogs,
      popularBlogs,
      popularCategories,
      totalUsers,
      totalBlogs,
      totalEmails,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching data.' },
      { status: 500 }
    );
  }
}
