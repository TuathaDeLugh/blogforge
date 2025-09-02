import Blog from '@/models/blog';
import User from '@/models/user';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await connectdb();
    const sort = -1;
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('category');
    const pageParam = searchParams.get('page');
    const page = parseInt(pageParam as string) || 1;
    const pageSize = 15;
    const skip = (page - 1) * pageSize;

    const blogs = await Blog.find({ category: filter, status: 'published' })
      .populate('creator', '_id username avatar')
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(pageSize);

    const totalDocuments = await Blog.countDocuments({
      category: filter,
      status: 'published',
    });
    const hasNextPage = skip + pageSize < totalDocuments;

    return NextResponse.json(
      {
        data: blogs,
        meta: {
          totalDocuments,
          totalPages: Math.ceil(totalDocuments / pageSize),
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
