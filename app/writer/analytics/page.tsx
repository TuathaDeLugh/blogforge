"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Div, H1 } from "@/Components/Motion/Motion";
import { FaEye, FaHeart, FaShare, FaComment, FaFileAlt } from "react-icons/fa";
import { WriterAnalyticsSkeleton } from "@/Components/Analytics/SkeletonLoader";
import { getUserAnalytics } from "@/controllers/analytics";
import Link from "next/link";

// Safe utility functions to prevent hydration errors
const formatNumber = (num: number): string => {
  if (typeof num !== "number" || isNaN(num)) return "0";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const calculateEngagementRate = (
  views: number,
  saves: number,
  shares: number,
  comments: number
): number => {
  if (!views || views === 0) return 0;
  return ((saves + shares + comments) / views) * 100;
};

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

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
  </div>
);

// Error component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center py-10">
    <p className="text-red-500">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
    >
      Retry
    </button>
  </div>
);

// Empty state component
const EmptyState = () => (
  <section className="md:my-6 space-y-8 max-w-7xl mx-auto px-4">
    <div className="text-center py-20">
      <H1 className="text-4xl font-bold text-gray-500 dark:text-gray-400 mb-4">
        No Analytics Data Yet
      </H1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Start writing blogs to see your analytics here!
      </p>
      <Link
        href="/user/blog/tab"
        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Create Your First Blog
      </Link>
    </div>
  </section>
);

export default function WriterAnalyticsPage() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<WriterAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && session?.user?.dbid) {
      fetchAnalytics();
    } else if (mounted && !session) {
      setLoading(false);
    }
  }, [session, mounted]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUserAnalytics(session?.user?.dbid!);
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching writer analytics:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load analytics data"
      );
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  // Memoize computed values to prevent hydration issues
  const safeAnalytics = useMemo(() => {
    if (!analytics) return null;

    return {
      userId: analytics.userId || "",
      totalBlogs: analytics.totalBlogs || 0,
      totalViews: analytics.totalViews || 0,
      totalSaves: analytics.totalSaves || 0,
      totalShares: analytics.totalShares || 0,
      totalComments: analytics.totalComments || 0,
      avgEngagementRate: analytics.avgEngagementRate || 0,
      blogs: Array.isArray(analytics.blogs) ? analytics.blogs : [],
    };
  }, [analytics]);

  const topBlog = useMemo(() => {
    if (!safeAnalytics?.blogs || safeAnalytics.blogs.length === 0) return null;

    return safeAnalytics.blogs.reduce((prev, current) =>
      (prev?.views || 0) > (current?.views || 0) ? prev : current
    );
  }, [safeAnalytics]);

  if (!mounted) {
    return <WriterAnalyticsSkeleton />;
  }

  if (!session) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Please log in to view your analytics</p>
        <Link
          href="/login"
          className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <WriterAnalyticsSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!safeAnalytics || safeAnalytics.totalBlogs === 0) {
    return <EmptyState />;
  }

  return (
    <section className="md:my-12 space-y-8 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="md:relative -z-10">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
        >
          My Analytics
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white"
        >
          My Analytics Dashboard
        </H1>
      </div>

      {/* Overview Stats */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Blogs
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {safeAnalytics.totalBlogs}
              </p>
            </div>
            <FaFileAlt className="text-blue-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Views
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {formatNumber(safeAnalytics.totalViews)}
              </p>
            </div>
            <FaEye className="text-purple-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Saves
              </p>
              <p className="text-2xl font-bold text-red-600">
                {formatNumber(safeAnalytics.totalSaves)}
              </p>
            </div>
            <FaHeart className="text-red-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Shares
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatNumber(safeAnalytics.totalShares)}
              </p>
            </div>
            <FaShare className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Comments
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {formatNumber(safeAnalytics.totalComments)}
              </p>
            </div>
            <FaComment className="text-orange-500 text-3xl" />
          </div>
        </div>
      </Div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Rate */}
        <Div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
            Performance Metrics
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Average Engagement Rate
              </span>
              <span className="text-2xl font-bold text-orange-600">
                {safeAnalytics.avgEngagementRate.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Average Views per Blog
              </span>
              <span className="text-xl font-semibold">
                {Math.round(
                  safeAnalytics.totalViews / safeAnalytics.totalBlogs || 0
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Average Saves per Blog
              </span>
              <span className="text-xl font-semibold">
                {Math.round(
                  safeAnalytics.totalSaves / safeAnalytics.totalBlogs || 0
                )}
              </span>
            </div>
          </div>
        </Div>

        {/* Top Performing Blog */}
        {topBlog && (
          <Div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
              Top Performing Blog
            </h2>
            <div className="space-y-3">
              <h3 className="font-bold text-lg">
                {topBlog.title || "Untitled"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {formatNumber(topBlog.views || 0)}
                  </p>
                  <p className="text-sm text-gray-500">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {formatNumber(topBlog.usersave || 0)}
                  </p>
                  <p className="text-sm text-gray-500">Saves</p>
                </div>
              </div>
              <Link
                href={`/blogs/${topBlog._id}`}
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                View Blog
              </Link>
            </div>
          </Div>
        )}
      </div>

      {/* Blog Performance Table */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
          Blog Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="py-3 px-4 border-b dark:border-slate-600 font-semibold">
                  Title
                </th>
                <th className="py-3 px-4 border-b dark:border-slate-600 font-semibold text-center">
                  Views
                </th>
                <th className="py-3 px-4 border-b dark:border-slate-600 font-semibold text-center">
                  Saves
                </th>
                <th className="py-3 px-4 border-b dark:border-slate-600 font-semibold text-center">
                  Shares
                </th>
                <th className="py-3 px-4 border-b dark:border-slate-600 font-semibold text-center">
                  Comments
                </th>
                <th className="py-3 px-4 border-b dark:border-slate-600 font-semibold text-center">
                  Engagement
                </th>
                <th className="py-3 px-4 border-b dark:border-slate-600 font-semibold text-center">
                  Published
                </th>
              </tr>
            </thead>
            <tbody>
              {safeAnalytics.blogs
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .map((blog, index) => {
                  const engagementRate = calculateEngagementRate(
                    blog.views || 0,
                    blog.usersave || 0,
                    blog.share || 0,
                    blog.comments?.length || 0
                  );

                  return (
                    <tr
                      key={blog._id || index}
                      className="odd:bg-transparent even:bg-slate-50 dark:even:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <td className="py-3 px-4 border-b dark:border-slate-600">
                        <Link
                          href={`/blogs/${blog._id}`}
                          className="text-blue-500 hover:underline font-medium"
                        >
                          {blog.title || "Untitled"}
                        </Link>
                      </td>
                      <td className="py-3 px-4 border-b dark:border-slate-600 text-center font-semibold text-purple-600">
                        {formatNumber(blog.views || 0)}
                      </td>
                      <td className="py-3 px-4 border-b dark:border-slate-600 text-center font-semibold text-red-600">
                        {formatNumber(blog.usersave || 0)}
                      </td>
                      <td className="py-3 px-4 border-b dark:border-slate-600 text-center font-semibold text-green-600">
                        {formatNumber(blog.share || 0)}
                      </td>
                      <td className="py-3 px-4 border-b dark:border-slate-600 text-center font-semibold text-orange-600">
                        {blog.comments?.length || 0}
                      </td>
                      <td className="py-3 px-4 border-b dark:border-slate-600 text-center">
                        <span
                          className={`font-semibold ${
                            engagementRate > 5
                              ? "text-green-600"
                              : engagementRate > 2
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {engagementRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b dark:border-slate-600 text-center text-sm text-gray-500">
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Div>
    </section>
  );
}
