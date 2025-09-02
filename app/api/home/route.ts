import Blog from '@/models/blog';
import User from '@/models/user';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request, response: Response) {
  try {
    const { searchParams } = new URL(request.url);
    let sort = searchParams.get('sort');

    if (!sort) {
      sort = '-1';
    }

    await connectdb();

    // Fetch all published blogs
    const allBlogs = await Blog.find({ status: 'published' })
      .populate('creator', '_id username avatar')
      .sort({ createdAt: -1 })
      .select(
        'title category images info createdAt updatedAt usersave share creator'
      )
      .exec();

    // Recent blogs: Sort by creation date (most recent first) and get top 4
    const recentBlogs = allBlogs.slice(0, 4);

    // Popular blogs: Sort by a custom popularity score and get top 4
    const popularBlogs = allBlogs
      .sort((a, b) => b.share + b.usersave * 2 - (a.share + a.usersave * 2))
      .slice(0, 4);

    // Blogs created within the last month
    const lastMonthBlogs = allBlogs.filter((blog) => {
      const createdAt = new Date(blog.createdAt);
      const now = new Date();
      const timeDiff = now.getTime() - createdAt.getTime();
      return timeDiff < 2 * 365 * 24 * 60 * 60 * 1000;
    });

    // Trending blogs: Same score as popular but only for recent blogs
    const trendingBlogs = lastMonthBlogs
      .sort((a, b) => b.share + b.usersave * 2 - (a.share + a.usersave * 2))
      .slice(0, 5);

    // Most shared blogs: Sort by the share count and get top 5
    const mostSharedBlogs = allBlogs
      .sort((a, b) => b.share - a.share)
      .slice(0, 5);

    // Most saved blogs: Sort by the usersave count and get top 5
    const mostSavedBlogs = allBlogs
      .sort((a, b) => b.usersave - a.usersave)
      .slice(0, 5);

    // Popular blogs by category using aggregation
    const popularBlogsByCategory = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$category' },
      {
        $addFields: {
          score: { $add: ['$share', { $multiply: ['$usersave', 2] }] },
        },
      },
      { $sort: { score: -1 } },
      {
        $group: {
          _id: '$category',
          blog: { $first: '$$ROOT' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'blog.creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      {
        $project: {
          _id: '$blog._id',
          title: '$blog.title',
          images: '$blog.images',
          category: '$blog.category',
          info: '$blog.info',
          creator: {
            _id: '$creator._id',
            username: '$creator.username',
            name: '$creator.name',
            email: '$creator.email',
            avatar: '$creator.avatar',
          },
        },
      },
    ]);

    // Top writers: Fetch users sorted by the custom logic considering only published blogs
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

    // Prepare the response
    const responsePayload = {
      recent: recentBlogs,
      popular: popularBlogs,
      trending: trendingBlogs,
      category: popularBlogsByCategory,
      mostShared: mostSharedBlogs,
      mostSaved: mostSavedBlogs,
      topWriters: topWriters,
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    console.error('Error fetching user and blogs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
