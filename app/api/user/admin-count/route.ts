import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectdb();
        const adminCount = await User.countDocuments({ isAdmin: true });
        
        return NextResponse.json(
            {
                count: adminCount,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error getting admin count:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to get admin count',
                error: error.message,
            },
            { status: 500 }
        );
    }
}