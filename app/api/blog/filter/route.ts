import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
    try {
        await connectdb();
        const sort = -1;
        const filter = req.nextUrl.searchParams.get('category');
        const page = req.nextUrl.searchParams.get('page') || 1;
        const pageSize = 15;
        const skip = (page - 1) * pageSize;

        const blogs = await Blog.find({category: filter}).sort({ createdAt: sort }).skip(skip).limit(pageSize);

        const totalDocuments = await Blog.countDocuments({category: filter});

        const hasNextPage = skip + pageSize < totalDocuments;

        return NextResponse.json(
            {
                data: blogs,
                meta: {
                    totalDocuments,
                    totalPages: Math.ceil(totalDocuments / pageSize),
                    currentPage: parseInt(page),
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