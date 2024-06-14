import Blog from "@/models/blog";
import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, { params }:any) {
    const { username } = params ;   

    try {
        await connectdb();
        // Fetch the user by username
        const user = await User.findOne({ username }).exec();
        
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch all blogs created by the user
        const allBlogs = await Blog.find({ creator: user._id }).exec();

         // Calculate total saves and total shares
         const totalSaves = allBlogs.reduce((sum, blog) => sum + blog.usersave, 0);
         const totalShares = allBlogs.reduce((sum, blog) => sum + blog.share, 0);

        // Sort blogs by creation date (most recent first)
        const recentBlogs = allBlogs.sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);

        // Sort blogs by 'usersave' (most popular)
        const popularBlogs = allBlogs.sort((a, b) => b.usersave - a.usersave).slice(0, 4);

        // Find the most shared blog
        const mostSharedBlog = allBlogs.sort((a, b) => b.share - a.share)[0];

        // Find the most saved blog
        const mostSavedBlog = allBlogs.sort((a, b) => b.usersave - a.usersave)[0];

        // Prepare the response
        const response = {
            user,
            stats: {
                totalSaves,
                totalShares,
            },
            blogs: {
                all: allBlogs,
                recent: recentBlogs,
                popular: popularBlogs,
                mostShared: mostSharedBlog,
                mostSaved: mostSavedBlog,
            },
        };

        return NextResponse.json(response,{ status : 200 });
    } catch (error) {
        console.error("Error fetching user and blogs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}