import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request:any,{params}:any){
    const { id } = params;
    const { title,category,images,detail,status,keyword,creator }  = await request.json();
    await connectdb();
    await Blog.findByIdAndUpdate(id, { title,category,images,detail,status,keyword,creator });
    return NextResponse.json({message:"Blog Updated"},{status:200});
} 

export async function GET(request:any, { params }:any) {
    const { id } = params;
    await connectdb();
    const reviews = await Blog.findOne({ _id : id });
    return NextResponse.json({ data:reviews }, { status: 200 });

}