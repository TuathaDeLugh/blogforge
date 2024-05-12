import Blog from "@/models/blog";
import User from '@/models/user';
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request:any,{params}:any){
    if (!User) {
        throw new Error('User model is not registered');
    }
    const { id } = params;
    const { title,category,images,detail,info,status,keyword}  = await request.json();
    await connectdb();
    await Blog.findByIdAndUpdate(id, { title,category,images,detail,info,status,keyword});
    return NextResponse.json({message:"Blog Updated"},{status:200});
} 

export async function GET(request:any, { params }:any) {
    try {
        const { id } = params;
        await connectdb();
        const blog = await Blog.findById(id).populate('creator','_id username avatar');
        return NextResponse.json({ data:blog }, { status: 200 });
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ 
            message: 'Failed to load blogs',
            error: error.message, 
        },
        { status: 500 });
    }

}