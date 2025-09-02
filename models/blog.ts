import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    _id: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: [String], required: true },
    images: [{ _id: { type: String }, name: String, link: String }],
    info: { type: String, required: true },
    detail: { type: String, required: true },
    usersave: { type: Number, default: 0 },
    share: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    uniqueViews: [{ type: String }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    keywords: [String],
    comments: [commentSchema],
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
