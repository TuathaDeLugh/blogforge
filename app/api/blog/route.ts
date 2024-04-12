import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/user'

export async function POST(request: any) {

    try {
        const { title,category,images,detail,info,status,keywords,creator } = await request.json();
        await connectdb();
        await Blog.create({ title, category, images, detail,info , status, keywords, creator });


        return NextResponse.json(
            {
                message: "Blog Saved",
            },
            { status: 200 }

        );
    }
    catch (error: any) {
        console.error("Error saving blog:", error);
        return NextResponse.json(
            {
                message: `Failed to save ${error}`,
            },
            { status: 500 }

        );
    }
}

export async function GET(req: any, res: any) {
    try {
        await connectdb();
        const sort = -1;
        const page = req.nextUrl.searchParams.get('page') || 1;
        const pageSize = 15;
        const skip = (page - 1) * pageSize;

        const blogs = await Blog.find({status: 'published'}).populate('creator','_id username avatar').sort({ createdAt: sort }).skip(skip).limit(pageSize);

        const totalDocuments = await Blog.countDocuments({status: 'published'});

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


export async function DELETE(request: any) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectdb();
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: "Blog Deleted" }, { status: 200 });
    } catch (error: any) {
        console.log(error)
    }
}