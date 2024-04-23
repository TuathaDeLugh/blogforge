import User from "@/models/user";
import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: any, res: any) {
    try {
        await connectdb();

        const page = request.nextUrl.searchParams.get('page') || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const userData = await Blog.aggregate([
            { $match: { status: "published" } },
            { $group: {
                _id: "$creator",
                totalBlogs: { $sum: 1 },
                totalShares: { $sum: "$share" },
                totalSaves: { $sum: "$usersave" }
            }},
            { $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "userDetails"
            }},
            { $unwind: "$userDetails" },
            { $project: {
                _id: "$userDetails._id",
                username: "$userDetails.username",
                name: "$userDetails.name",
                avatar: "$userDetails.avatar",
                joined:"$userDetails.createdAt",
                totalBlogs: 1,
                totalShares: 1,
                totalSaves: 1
            }},
            { $skip: skip }, 
            { $limit: pageSize } 
        ]);

        const totalWriters = userData.length;
        const totalPages = Math.ceil(totalWriters / pageSize);
        const hasNextPage = parseInt(page) < totalPages;

        return NextResponse.json({
            success: true,
            data: userData,
            meta: {
                totalWriters,
                totalPages,
                currentPage: parseInt(page),
                hasNextPage
            }
        }, { status: 200 });
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
