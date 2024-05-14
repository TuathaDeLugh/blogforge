import Blog from "@/models/blog";
import connectdb from "@/util/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        await connectdb();
        const blog = request.nextUrl.searchParams.get('blog');
        if (!blog) {
            return NextResponse.json(
                { message: 'Query parameter is missing' },
                { status: 400 }
            );
        }
        const blogdata = await Blog.findOne({ title : blog}).select('title category images info');
        if (blogdata){
            await Blog.findByIdAndUpdate(blogdata._id, {
                $inc: { share: 1 },
              });
        }
        return NextResponse.json( blogdata , { status: 200 });
    }
    catch (error: any) {
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
