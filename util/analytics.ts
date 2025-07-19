// Client-side analytics tracking functions
export async function trackBlogView(blogId: string, userIdentifier?: string) {
    try {
        const response = await fetch(`/api/analytics/blog/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'view',
                userIdentifier: userIdentifier || `anonymous_${Date.now()}`
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error tracking blog view:', error);
        return false;
    }
}

export async function trackBlogSave(blogId: string) {
    try {
        const response = await fetch(`/api/analytics/blog/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'save'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error tracking blog save:', error);
        return false;
    }
}

export async function trackBlogShare(blogId: string) {
    try {
        const response = await fetch(`/api/analytics/blog/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'share'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error tracking blog share:', error);
        return false;
    }
}

export async function trackBlogComment(blogId: string) {
    try {
        const response = await fetch(`/api/analytics/blog/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'comment'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error tracking blog comment:', error);
        return false;
    }
}

// Client-side utility functions

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export function calculateEngagementRate(views: number, saves: number, shares: number, comments: number): number {
    if (views === 0) return 0;
    return ((saves + shares + comments) / views * 100);
}

export function getGrowthRate(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100);
}