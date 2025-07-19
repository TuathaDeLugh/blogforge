import { NextRequest, NextResponse } from "next/server";
import { BlogAnalytics } from "@/models/analytics";
import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectdb();
        
        const blogId = params.id;
        
        // Get blog analytics
        const analytics = await BlogAnalytics.findOne({ blogId }).populate('blogId', 'title creator');
        
        if (!analytics) {
            return NextResponse.json({ error: "Analytics not found" }, { status: 404 });
        }

        // Calculate engagement rate
        const engagementRate = analytics.totalViews > 0 
            ? ((analytics.totalSaves + analytics.totalShares + analytics.totalComments) / analytics.totalViews * 100).toFixed(2)
            : 0;

        const response = {
            ...analytics.toObject(),
            engagementRate: parseFloat(engagementRate as string)
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching blog analytics:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectdb();
        
        const blogId = params.id;
        const { action, userIdentifier } = await request.json();
        
        // Get current date for daily stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let analytics = await BlogAnalytics.findOne({ blogId });
        
        if (!analytics) {
            analytics = new BlogAnalytics({ blogId });
        }

        // Find or create today's stats
        let todayStats = analytics.dailyStats.find((stat: { date: { getTime: () => number; }; }) => 
            stat.date.getTime() === today.getTime()
        );

        if (!todayStats) {
            todayStats = {
                date: today,
                views: 0,
                uniqueViews: 0,
                saves: 0,
                shares: 0,
                comments: 0
            };
            analytics.dailyStats.push(todayStats);
        }

        // Update analytics based on action
        switch (action) {
            case 'view':
                analytics.totalViews += 1;
                todayStats.views += 1;
                
                // Update blog model and track unique views
                const blog = await Blog.findById(blogId);
                if (blog && userIdentifier && !blog.uniqueViews?.includes(userIdentifier)) {
                    analytics.totalUniqueViews += 1;
                    todayStats.uniqueViews += 1;
                    
                    await Blog.findByIdAndUpdate(blogId, {
                        $inc: { views: 1 },
                        $addToSet: { uniqueViews: userIdentifier }
                    });
                } else {
                    await Blog.findByIdAndUpdate(blogId, { $inc: { views: 1 } });
                }
                break;
                
            case 'save':
                analytics.totalSaves += 1;
                todayStats.saves += 1;
                break;
                
            case 'share':
                analytics.totalShares += 1;
                todayStats.shares += 1;
                break;
                
            case 'comment':
                analytics.totalComments += 1;
                todayStats.comments += 1;
                break;
        }

        analytics.lastUpdated = new Date();
        await analytics.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating blog analytics:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}