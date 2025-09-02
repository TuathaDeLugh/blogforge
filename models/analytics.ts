import mongoose, { Schema } from 'mongoose';

const dailyStatsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    views: { type: Number, default: 0 },
    uniqueViews: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  { _id: false }
);

const blogAnalyticsSchema = new mongoose.Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
      unique: true,
    },
    totalViews: { type: Number, default: 0 },
    totalUniqueViews: { type: Number, default: 0 },
    totalSaves: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    dailyStats: [dailyStatsSchema],
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const userAnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalBlogs: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    totalSaves: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    dailyStats: [dailyStatsSchema],
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const siteAnalyticsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, unique: true },
    totalUsers: { type: Number, default: 0 },
    newUsers: { type: Number, default: 0 },
    totalBlogs: { type: Number, default: 0 },
    newBlogs: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    totalSaves: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const BlogAnalytics =
  mongoose.models.BlogAnalytics ||
  mongoose.model('BlogAnalytics', blogAnalyticsSchema);
export const UserAnalytics =
  mongoose.models.UserAnalytics ||
  mongoose.model('UserAnalytics', userAnalyticsSchema);
export const SiteAnalytics =
  mongoose.models.SiteAnalytics ||
  mongoose.model('SiteAnalytics', siteAnalyticsSchema);

export default { BlogAnalytics, UserAnalytics, SiteAnalytics };
