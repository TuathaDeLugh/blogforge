import { NextResponse } from 'next/server';
import connectdb from '@/util/mongodb';
import Blog from '@/models/blog';

export async function GET(request: Request) {
  try {
    await connectdb();
    const { searchParams } = new URL(request.url);
    const blog = searchParams.get('blog');
    const incrementShare = searchParams.get('increment') === 'true';
    if (!blog) {
      return NextResponse.json(
        { message: 'Query parameter is missing' },
        { status: 400 }
      );
    }
    const blogdata = await Blog.findOne({
      title: blog,
      status: 'published',
    }).select('title category images info');
    if (blogdata && incrementShare) {
      await Blog.findByIdAndUpdate(blogdata._id, {
        $inc: { share: 1 },
      });
    }
    if (!blogdata) {
      return NextResponse.json(
        { message: 'Blog is either deleted or private' },
        { status: 404 }
      );
    }
    return NextResponse.json(blogdata, { status: 200 });
  } catch (error: any) {
    console.error('Error in GET handler:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to Search',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
