import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IComment extends Document {
    userid: Types.ObjectId;
    useravatar?: string;
    username?: string;
    comment?: string;
}

interface IBlog extends Document {
    title: string;
    category: string[];
    images: { _id: string, name?: string, link?: string }[];
    info: string;
    detail: string;
    usersave: number;
    share: number;
    status: 'draft' | 'published' | 'archived';
    keywords?: string[];
    comments: IComment[];
    creator: Types.ObjectId;
}

const commentSchema: Schema<IComment> = new mongoose.Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    useravatar: String,
    username: String,
    comment: String,
}, { timestamps: true });

const blogSchema: Schema<IBlog> = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: [String], required: true },
    images: [{ _id: { type: String, required: true }, name: String, link: String }],
    info: { type: String, required: true },
    detail: { type: String, required: true },
    usersave: { type: Number, default: 0 },
    share: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    keywords: [String],
    comments: [commentSchema],
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
