import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  userid: {
    type: String,
  },
  useravatar: {
    type: String,
  },
  username: {
    type: String,
  },
  comment: {
    type: String,
  },
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  images: [{
    _id: {
        type: String,
        required: true,
      },
    name: String,
    link: String,
  }],
  info: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  pageview: {
    type: Number,
    default: 0,
  },
  share: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  keywords: {
    type: [String],
  },
  comments: [commentSchema],
  creator: {
    userid: {
      type: String,
      required: true,
    },
    createdby: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
}, { timestamps: true });

const Blog = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export default Blog;
