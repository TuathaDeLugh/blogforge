import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(req:any, { params }:any,res:any) {
    try {
        await connectdb();
        const sort = 1;
        const { id } = params;
        const page = req.nextUrl.searchParams.get('page') || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const emails = await Blog.find({ "creator.userid": id }).sort({ title: sort }).select("_id title share pageview images status").skip(skip).limit(pageSize);

        const totalDocuments = await Blog.countDocuments({ "creator.userid": id });

        const hasNextPage = skip + pageSize < totalDocuments;

        return NextResponse.json(
            {
                data: emails,
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
                message: 'Failed to load mail',
                error: error.message, 
            },
            { status: 500 }
        );
    }
}