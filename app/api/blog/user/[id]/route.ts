import Blog from '@/models/blog';
import User from '@/models/user';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: any,
  response: Response
) {
  try {
    await connectdb();
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');
    const pageParam = searchParams.get('page');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const sortParam = searchParams.get('sort') || 'date-desc';

    const page = parseInt(pageParam as string) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Build query
    let query: any = { creator: id };

    // Add status filter (from URL filter param or status param)
    const statusFilter = status || filter;
    if (statusFilter && statusFilter !== 'all' && statusFilter !== '') {
      query.status = statusFilter;
    }

    // Add search filter
    if (search && search.trim() !== '') {
      query.title = { $regex: search, $options: 'i' };
    }

    // Add category filter - supports multiple categories with OR logic
    if (category && category.trim() !== '') {
      const categories = category
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
      if (categories.length > 0) {
        // Use $in operator for OR logic - matches blogs with ANY of the selected categories
        query.category = { $in: categories };
      }
    }

    // Build sort object
    let sortObject: any = {};
    switch (sortParam) {
      case 'date-desc':
        sortObject = { createdAt: -1 };
        break;
      case 'date-asc':
        sortObject = { createdAt: 1 };
        break;
      case 'views-desc':
        sortObject = { views: -1 };
        break;
      case 'views-asc':
        sortObject = { views: 1 };
        break;
      case 'saves-desc':
        sortObject = { usersave: -1 };
        break;
      case 'saves-asc':
        sortObject = { usersave: 1 };
        break;
      case 'title-asc':
        sortObject = { title: 1 };
        break;
      case 'title-desc':
        sortObject = { title: -1 };
        break;
      default:
        sortObject = { createdAt: -1 };
    }

    const blogs = await Blog.find(query)
      .sort(sortObject)
      .populate('creator', '_id username avatar')
      .select('_id title share usersave images status category views createdAt')
      .skip(skip)
      .limit(pageSize);

    const totalDocuments = await Blog.countDocuments(query);
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
        message: 'Failed to load blogs',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
