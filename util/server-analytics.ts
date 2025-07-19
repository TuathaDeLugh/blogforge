// Server-side analytics functions for API routes
import { BlogAnalytics, UserAnalytics, SiteAnalytics } from "@/models/analytics";
import Blog from "@/models/blog";
import User from "@/models/user";

export async function updateDailySiteAnalytics() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalUsers = await User.countDocuments();
        const totalBlogs = await Blog.countDocuments({ status: 'published' });
        
        // Count new users and blogs today
        const newUsers = await User.countDocuments({
            createdAt: { $gte: today }
        });
        
        const newBlogs = await Blog.countDocuments({
            createdAt: { $gte: today },
            status: 'published'
        });

        // Get today's engagement stats
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

        // Count active users (users who created content or interacted today)
        const activeUsers = await User.countDocuments({
            $or: [
                { createdAt: { $gte: today } },
                { updatedAt: { $gte: today } }
            ]
        });

        await SiteAnalytics.findOneAndUpdate(
            { date: today },
            {
                totalUsers,
                newUsers,
                totalBlogs,
                newBlogs,
                totalViews: engagement.totalViews,
                totalSaves: engagement.totalSaves,
                totalShares: engagement.totalShares,
                totalComments: engagement.totalComments,
                activeUsers
            },
            { upsert: true, new: true }
        );

        return true;
    } catch (error) {
        console.error('Error updating daily site analytics:', error);
        return false;
    }
}

export function safeNumber(value: any): number {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
}

export function safeArray<T>(value: any): T[] {
    return Array.isArray(value) ? value : [];
}

export function safeString(value: any): string {
    return typeof value === 'string' ? value : '';
}