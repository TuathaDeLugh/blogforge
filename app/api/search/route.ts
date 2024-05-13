import Blog from "@/models/blog";
import connectdb from "@/util/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        await connectdb();
        const query = request.nextUrl.searchParams.get('query');
        if (!query) {
            return NextResponse.json(
                { message: 'Query parameter is missing' },
                { status: 400 }
            );
        }
        const regex = new RegExp(`^${decodeURIComponent(query)}`, "i");
        const blogs = await Blog.aggregate([
            { $match: { 
                $or: [
                    { title: { $regex: regex } },
                    { keywords: { $in: [regex] } }
                ]    
            }},
            { $project: {
                _id: 1,
                title: 1,
                image: { $arrayElemAt: ["$images", 0] },
                creator:1
            }},
            { 
                $sort: { 
                    title: 1,
                    keyword:1
                } }
                
        ]).exec();
        await Blog.populate(blogs, {
            path: 'creator',
            select: 'username avatar'
        });
        return NextResponse.json({ data: blogs }, { status: 200 });
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
