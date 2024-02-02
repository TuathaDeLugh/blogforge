import mongoose,{Schema} from "mongoose";

const commentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  useravatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
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
  image: [{
    _id: {
        type: String,
        required: true,
        unique: true,
      },
    name: String,
    link: String,
  }],
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
  keyword: {
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
      required: true,
    },
  },
}, { timestamps: true });

const Blog = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export default Blog;
