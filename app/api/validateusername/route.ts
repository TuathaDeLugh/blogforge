import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";


export async function GET(req:any,res:any) {
    const username = req.nextUrl.searchParams.get('username') 
    try {
        await connectdb();
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ isUsernameTaken: true });
          }
      
          return NextResponse.json({ isUsernameTaken: false });
    }
    catch (error) {
        console.error('Error validating username:', error);
        return NextResponse.json({
            message: error,
        },
        {status:500})
    }
}