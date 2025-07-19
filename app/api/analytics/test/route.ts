import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/util/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";

export async function GET(request: NextRequest) {
    try {
        await connectdb();
        
        // Test basic database connectivity and model access
        const totalUsers = await User.countDocuments();
        const totalBlogs = await Blog.countDocuments();
        
        // Test blog aggregation
        const blogStats = await Blog.aggregate([
            { $match: { status: 'published' } },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: { $ifNull: ['$views', 0] } },
                    totalSaves: { $sum: { $ifNull: ['$usersave', 0] } },
                    totalShares: { $sum: { $ifNull: ['$share', 0] } },
                    count: { $sum: 1 }
                }
            }
        ]);

        const stats = blogStats[0] || {
            totalViews: 0,
            totalSaves: 0,
            totalShares: 0,
            count: 0
        };

        return NextResponse.json({
            success: true,
            message: "Analytics test successful",
            data: {
                totalUsers,
                totalBlogs,
                publishedBlogs: stats.count,
                totalViews: stats.totalViews,
                totalSaves: stats.totalSaves,
                totalShares: stats.totalShares
            }
        });
    } catch (error) {
        console.error("Analytics test error:", error);
        return NextResponse.json({ 
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}