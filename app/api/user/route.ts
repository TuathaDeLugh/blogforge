import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request:any)
{
    
    try{
       const{name,username,email,avatar,pass,provider} = await request.json();
       const password = await bcrypt.hash(pass, 10);
        await connectdb();
        const role = 'user';
        await User.create({name,username,email,avatar,password,provider,role});
        

        return NextResponse.json(
           {
            message: "Created",
           }, 
           {status:200}

        );
   }
    catch(error){
        console.log(error)
        return NextResponse.json(
            {
                message: error,
            },
            {status:500}
 
         );
    }
}


export async function GET(req:any,res:any) {
    try {
        await connectdb();
        const page = req.nextUrl.searchParams.get('page') || 1;
        const pageSize = 15;
        const skip = (page - 1) * pageSize;
        const usernameFilter = { username: { $ne: 'admin' } };
        const users = await User.find(usernameFilter).sort({role:1}).select("_id username name email role").skip(skip).limit(pageSize);

        const totalDocuments = await User.countDocuments(usernameFilter);

        const hasNextPage = skip + pageSize < totalDocuments;

        return NextResponse.json(
            {
                data: users,
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

export async function DELETE(request:any){
    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectdb();
        await User.findByIdAndDelete(id);
        return NextResponse.json({message:"User Deleted"},{status:200});
    } catch (error) {
        console.log(error)
    }
}