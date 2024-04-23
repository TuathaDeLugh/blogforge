import Blog from "@/models/blog";
import User from '@/models/user'
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(req:any, { params }:any,res:any) {
    try {
        await connectdb();
        const sort = 1;
        const { id } = params;
        const filter = req.nextUrl.searchParams.get('filter')
        const page = req.nextUrl.searchParams.get('page') || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;


        let blogs;
        let totalDocuments;

        if (filter === 'all' || filter == undefined || filter == '') {
            blogs = await Blog.find({ "creator": id }).sort({ title: sort }).populate('creator','_id username avatar').select("_id title share usersave images status").skip(skip).limit(pageSize);
            totalDocuments= await Blog.countDocuments({ "creator": id });
        } else {
            blogs = await Blog.find({ "creator": id, "status": filter }).sort({ title: sort }).populate('creator','_id username avatar').select("_id title share usersave images status").skip(skip).limit(pageSize);
            totalDocuments= await Blog.countDocuments({ "creator": id, "status": filter });
        }


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
    } catch (error:any) {
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