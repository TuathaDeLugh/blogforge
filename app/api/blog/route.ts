import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user'

export async function POST(request: NextRequest) {

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

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        await connectdb();
        const sort = -1;
        const pageParam = request.nextUrl.searchParams.get('page');
        const page = parseInt(pageParam as string) || 1;
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


export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectdb();
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: "Blog Deleted" }, { status: 200 });
    } catch (error: any) {
        console.log(error)
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { blog, user, comment,action } = await request.json()

        await connectdb();
        
        const foundBlog = await Blog.findById(blog).exec();
        if (!foundBlog) {
            console.error("Review not found");
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }
    switch (action) {
        
        case 'add':
            {
            foundBlog.comments.push({user,comment});
            await foundBlog.save();
            return NextResponse.json({ message: "Comment created" }, { status: 200 });
        }
        case 'remove':
            {
                foundBlog.comments.pull({user});
                await foundBlog.save();
                return NextResponse.json({ message: "Comment removed" }, { status: 200 });
            }
            
    }

    } catch (error: any) {
        console.log(error)
    }
}