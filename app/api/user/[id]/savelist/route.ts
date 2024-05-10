import connectdb from '@/util/mongodb';
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Blog from "@/models/blog";



export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        await connectdb();
        const user = await User.findById(id).populate('savelist');
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
        return NextResponse.json({ data: user.savelist }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
