interface BlogData {
  _id: string;
  title: string;
  views: number;
  usersave: number;
  share: number;
  comments: any[];
  createdAt: string;
  analytics?: any;
}

interface WriterAnalytics {
  userId: string;
  totalBlogs: number;
  totalViews: number;
  totalSaves: number;
  totalShares: number;
  totalComments: number;
  avgEngagementRate: number;
  blogs: BlogData[];
}

export async function getUserAnalytics(userId: string): Promise<WriterAnalytics | null> {
  try {
    const response = await fetch(`/api/analytics/user/${userId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    throw error;
  }
}

export async function getAdminAnalytics(days?: number): Promise<any> {
  try {
    const queryParam = days ? `?days=${days}` : '';
    const response = await fetch(`/api/analytics/admin${queryParam}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Error fetching admin analytics:", error);
    throw error;
  }
}

export async function getBlogAnalytics(blogId: string): Promise<any> {
  try {
    const response = await fetch(`/api/analytics/blog/${blogId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Error fetching blog analytics:", error);
    throw error;
  }
}