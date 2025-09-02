'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Div, H1 } from '@/Components/Motion/Motion';
import {
  FaEye,
  FaHeart,
  FaShare,
  FaComment,
  FaUsers,
  FaFileAlt,
  FaAngleDoubleUp,
  FaAngleDoubleDown,
} from 'react-icons/fa';
import { AdminAnalyticsSkeleton } from '@/Components/Analytics/SkeletonLoader';
import { getAdminAnalytics } from '@/controllers/analytics';

const formatNumber = (num: number): string => {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
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

interface AnalyticsOverview {
  totalUsers: number;
  totalBlogs: number;
  totalDrafts: number;
  newUsers: number;
  newBlogs: number;
  userGrowthRate: number;
  blogGrowthRate: number;
  totalViews: number;
  totalSaves: number;
  totalShares: number;
  totalComments: number;
}

interface TopBlog {
  _id: string;
  title: string;
  views: number;
  creator?: {
    username: string;
  };
}

interface TopWriter {
  _id: string;
  username: string;
  totalBlogs: number;
  totalViews: number;
}

interface CategoryStat {
  _id: string;
  count: number;
  totalViews: number;
  avgViews: number;
}

interface AnalyticsData {
  overview: AnalyticsOverview;
  topBlogs: TopBlog[];
  topWriters: TopWriter[];
  categoryStats: CategoryStat[];
  dailyAnalytics: any[];
  period: {
    days: number;
    startDate: string;
    endDate: string;
  };
}

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
  </div>
);

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

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState(30);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchAnalytics();
    }
  }, [period, mounted]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAdminAnalytics(period);
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to load analytics data'
      );
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  const safeAnalytics = useMemo(() => {
    if (!analytics) return null;

    return {
      overview: {
        totalUsers: analytics.overview?.totalUsers || 0,
        totalBlogs: analytics.overview?.totalBlogs || 0,
        totalDrafts: analytics.overview?.totalDrafts || 0,
        newUsers: analytics.overview?.newUsers || 0,
        newBlogs: analytics.overview?.newBlogs || 0,
        userGrowthRate: analytics.overview?.userGrowthRate || 0,
        blogGrowthRate: analytics.overview?.blogGrowthRate || 0,
        totalViews: analytics.overview?.totalViews || 0,
        totalSaves: analytics.overview?.totalSaves || 0,
        totalShares: analytics.overview?.totalShares || 0,
        totalComments: analytics.overview?.totalComments || 0,
      },
      topBlogs: Array.isArray(analytics.topBlogs) ? analytics.topBlogs : [],
      topWriters: Array.isArray(analytics.topWriters)
        ? analytics.topWriters
        : [],
      categoryStats: Array.isArray(analytics.categoryStats)
        ? analytics.categoryStats
        : [],
    };
  }, [analytics]);

  if (!mounted) {
    return <AdminAnalyticsSkeleton />;
  }

  if (loading) {
    return <AdminAnalyticsSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!safeAnalytics) {
    return <ErrorMessage message="No analytics data available" />;
  }

  const { overview, topBlogs, topWriters, categoryStats } = safeAnalytics;

  return (
    <section className="md:my-6 space-y-8">
      {/* Header */}
      <div className="md:relative -z-10">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
        >
          Analytics
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white"
        >
          Analytics Dashboard
        </H1>
      </div>

      {/* Period Selector */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-2 mb-6"
      >
        {[7, 30, 90].map((days) => (
          <button
            key={days}
            onClick={() => setPeriod(days)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              period === days
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {days} Days
          </button>
        ))}
      </Div>

      {/* Overview Stats */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {formatNumber(overview.totalUsers)}
              </p>
              <div className="flex items-center mt-1">
                {overview.userGrowthRate >= 0 ? (
                  <FaAngleDoubleUp className="text-green-500 mr-1" />
                ) : (
                  <FaAngleDoubleDown className="text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm ${
                    overview.userGrowthRate >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {overview.userGrowthRate.toFixed(1)}%
                </span>
              </div>
            </div>
            <FaUsers className="text-blue-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Blogs
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatNumber(overview.totalBlogs)}
              </p>
              <div className="flex items-center mt-1">
                {overview.blogGrowthRate >= 0 ? (
                  <FaAngleDoubleUp className="text-green-500 mr-1" />
                ) : (
                  <FaAngleDoubleDown className="text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm ${
                    overview.blogGrowthRate >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {overview.blogGrowthRate.toFixed(1)}%
                </span>
              </div>
            </div>
            <FaFileAlt className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Views
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {formatNumber(overview.totalViews)}
              </p>
              <p className="text-xs text-gray-500">All time</p>
            </div>
            <FaEye className="text-purple-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Engagement
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {calculateEngagementRate(
                  overview.totalViews,
                  overview.totalSaves,
                  overview.totalShares,
                  overview.totalComments
                ).toFixed(1)}
                %
              </p>
              <p className="text-xs text-gray-500">Rate</p>
            </div>
            <FaHeart className="text-orange-500 text-3xl" />
          </div>
        </div>
      </Div>

      {/* Engagement Metrics */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Saves
              </p>
              <p className="text-xl font-bold">
                {formatNumber(overview.totalSaves)}
              </p>
            </div>
            <FaHeart className="text-red-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Shares
              </p>
              <p className="text-xl font-bold">
                {formatNumber(overview.totalShares)}
              </p>
            </div>
            <FaShare className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Comments
              </p>
              <p className="text-xl font-bold">
                {formatNumber(overview.totalComments)}
              </p>
            </div>
            <FaComment className="text-green-500 text-2xl" />
          </div>
        </div>
      </Div>

      {/* Top Performing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Blogs */}
        <Div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
            Top Performing Blogs
          </h2>
          <div className="space-y-3">
            {topBlogs.length > 0 ? (
              topBlogs.slice(0, 5).map((blog, index) => (
                <div
                  key={blog._id || index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">
                      {blog.title || 'Untitled'}
                    </p>
                    <p className="text-xs text-gray-500">
                      by {blog.creator?.username || 'Unknown'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">
                      {formatNumber(blog.views || 0)}
                    </p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No blog data available
              </p>
            )}
          </div>
        </Div>

        {/* Top Writers */}
        <Div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
            Top Writers
          </h2>
          <div className="space-y-3">
            {topWriters.length > 0 ? (
              topWriters.slice(0, 5).map((writer, index) => (
                <div
                  key={writer._id || index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {writer.username || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {writer.totalBlogs || 0} blogs
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">
                      {formatNumber(writer.totalViews || 0)}
                    </p>
                    <p className="text-xs text-gray-500">total views</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No writer data available
              </p>
            )}
          </div>
        </Div>
      </div>

      {/* Category Performance */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
          Category Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryStats.length > 0 ? (
            categoryStats.slice(0, 10).map((category, index) => (
              <div
                key={category._id || index}
                className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg text-center"
              >
                <h3 className="font-bold text-lg">
                  {category._id || 'Unknown'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.count || 0} posts
                </p>
                <p className="text-sm text-purple-600 font-medium">
                  {formatNumber(category.totalViews || 0)} views
                </p>
                <p className="text-xs text-gray-500">
                  Avg: {Math.round(category.avgViews || 0)} views/post
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No category data available</p>
            </div>
          )}
        </div>
      </Div>
    </section>
  );
}
