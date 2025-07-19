import { NextRequest, NextResponse } from "next/server";
import { SiteAnalytics, BlogAnalytics, UserAnalytics } from "@/models/analytics";
import Blog from "@/models/blog";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import connectdb from "@/util/mongodb";

export async function GET(request: NextRequest) {
    try {
        await connectdb();
        
        // Check if user is admin (you might want to implement proper auth check)
        // const session = await getServerSession();
        // if (!session?.user?.isAdmin) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const { searchParams } = new URL(request.url);
        const days = parseInt(searchParams.get('days') || '30');
        
        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Get overall statistics
        const totalUsers = await User.countDocuments();
        const totalBlogs = await Blog.countDocuments({ status: 'published' });
        const totalDrafts = await Blog.countDocuments({ status: 'draft' });
        
        // Get new users and blogs in the specified period
        const newUsers = await User.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate }
        });
        
        const newBlogs = await Blog.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
            status: 'published'
        });

        // Get total engagement metrics with safe null handling
        const engagementStats = await Blog.aggregate([
            { $match: { status: 'published' } },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: { $ifNull: ['$views', 0] } },
                    totalSaves: { $sum: { $ifNull: ['$usersave', 0] } },
                    totalShares: { $sum: { $ifNull: ['$share', 0] } },
                    totalComments: { $sum: { $size: { $ifNull: ['$comments', []] } } }
                }
            }
        ]);

        const engagement = engagementStats[0] || {
            totalViews: 0,
            totalSaves: 0,
            totalShares: 0,
            totalComments: 0
        };

        // Get top performing blogs
        const topBlogs = await Blog.find({ status: 'published' })
            .populate('creator', 'username name avatar')
            .sort({ views: -1 })
            .limit(10)
            .select('title views usersave share comments createdAt creator');

        // Get top writers by total views with safe null handling
        const topWriters = await Blog.aggregate([
            { $match: { status: 'published' } },
            {
                $group: {
                    _id: '$creator',
                    totalViews: { $sum: { $ifNull: ['$views', 0] } },
                    totalBlogs: { $sum: 1 },
                    totalSaves: { $sum: { $ifNull: ['$usersave', 0] } },
                    totalShares: { $sum: { $ifNull: ['$share', 0] } },
                    totalComments: { $sum: { $size: { $ifNull: ['$comments', []] } } }
                }
            },
            { $sort: { totalViews: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 1,
                    totalViews: 1,
                    totalBlogs: 1,
                    totalSaves: 1,
                    totalShares: 1,
                    totalComments: 1,
                    username: '$user.username',
                    name: '$user.name',
                    avatar: '$user.avatar'
                }
            }
        ]);

        // Get daily analytics for the specified period
        const dailyAnalytics = await SiteAnalytics.find({
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        // Get category performance with safe null handling
        const categoryStats = await Blog.aggregate([
            { $match: { status: 'published' } },
            { $unwind: '$category' },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalViews: { $sum: { $ifNull: ['$views', 0] } },
                    totalSaves: { $sum: { $ifNull: ['$usersave', 0] } },
                    avgViews: { $avg: { $ifNull: ['$views', 0] } }
                }
            },
            { $sort: { totalViews: -1 } },
            { $limit: 10 }
        ]);

        // Calculate growth rates
        const previousPeriodStart = new Date(startDate);
        previousPeriodStart.setDate(previousPeriodStart.getDate() - days);
        
        const previousNewUsers = await User.countDocuments({
            createdAt: { $gte: previousPeriodStart, $lt: startDate }
        });
        
        const previousNewBlogs = await Blog.countDocuments({
            createdAt: { $gte: previousPeriodStart, $lt: startDate },
            status: 'published'
        });

        const userGrowthRate = previousNewUsers > 0 
            ? ((newUsers - previousNewUsers) / previousNewUsers * 100).toFixed(2)
            : newUsers > 0 ? 100 : 0;
            
        const blogGrowthRate = previousNewBlogs > 0 
            ? ((newBlogs - previousNewBlogs) / previousNewBlogs * 100).toFixed(2)
            : newBlogs > 0 ? 100 : 0;

        const response = {
            overview: {
                totalUsers,
                totalBlogs,
                totalDrafts,
                newUsers,
                newBlogs,
                userGrowthRate: parseFloat(userGrowthRate as string),
                blogGrowthRate: parseFloat(blogGrowthRate as string),
                ...engagement
            },
            topBlogs,
            topWriters,
            categoryStats,
            dailyAnalytics,
            period: {
                days,
                startDate,
                endDate
            }
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching admin analytics:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}