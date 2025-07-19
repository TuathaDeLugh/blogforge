import { NextRequest, NextResponse } from "next/server";
import { UserAnalytics, BlogAnalytics } from "@/models/analytics";
import Blog from "@/models/blog";
import User from "@/models/user";
import connectdb from "@/util/mongodb";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectdb();
        
        const userId = params.id;
        
        // Get user analytics
        let analytics = await UserAnalytics.findOne({ userId }).populate('userId', 'username name avatar');
        
        if (!analytics) {
            // Create analytics if doesn't exist
            analytics = new UserAnalytics({ userId });
            await analytics.save();
            analytics = await UserAnalytics.findOne({ userId }).populate('userId', 'username name avatar');
        }

        // Get user's blogs for detailed analytics
        const userBlogs = await Blog.find({ creator: userId, status: 'published' }).select('_id title views usersave share comments createdAt');
        
        // Get blog analytics for user's blogs
        const blogAnalytics = await BlogAnalytics.find({ 
            blogId: { $in: userBlogs.map(blog => blog._id) } 
        }).populate('blogId', 'title createdAt');

        // Calculate totals from actual blog data
        const totals = userBlogs.reduce((acc, blog) => {
            acc.totalViews += blog.views || 0;
            acc.totalSaves += blog.usersave || 0;
            acc.totalShares += blog.share || 0;
            acc.totalComments += blog.comments?.length || 0;
            return acc;
        }, { totalViews: 0, totalSaves: 0, totalShares: 0, totalComments: 0 });

        // Update analytics with current totals
        analytics.totalBlogs = userBlogs.length;
        analytics.totalViews = totals.totalViews;
        analytics.totalSaves = totals.totalSaves;
        analytics.totalShares = totals.totalShares;
        analytics.totalComments = totals.totalComments;
        analytics.lastUpdated = new Date();
        await analytics.save();

        // Calculate average engagement
        const avgEngagement = analytics.totalViews > 0 
            ? ((analytics.totalSaves + analytics.totalShares + analytics.totalComments) / analytics.totalViews * 100)
            : 0;

        const response = {
            ...analytics.toObject(),
            avgEngagementRate: avgEngagement,
            blogs: userBlogs.map(blog => {
                const blogAnalytic = blogAnalytics.find(ba => ba.blogId._id.toString() === blog._id.toString());
                return {
                    ...blog.toObject(),
                    analytics: blogAnalytic || null
                };
            })
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching user analytics:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}