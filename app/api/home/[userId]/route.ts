import Blog from "@/models/blog";
import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    await connectdb();

    const { userId } = params;
    const { searchParams } = new URL(request.url);
     const sortDirection = searchParams.get('sort') === '1' ? 1 : -1;


    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "User ID is required" });
    }

    const user = await User.findById(userId).populate('savelist');
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const savedCategories: string[] = user.savelist.reduce((categories: string[], blog: any) => {
      return categories.concat(blog.category);
    }, []);

    const uniqueCategories = Array.from(new Set(savedCategories));

    // Fetch blogs from the same categories
    const recommendedBlogs = await Blog.find({
      category: { $in: uniqueCategories },
      status: 'published'
    }).populate('creator', '_id username avatar')
      .select('title category images info createdAt updatedAt usersave share creator')
      .exec();

    // Filter out blogs already saved by the user
    const filteredBlogs = recommendedBlogs.filter(blog => !user.savelist.includes(blog._id));

    // Shuffle the blogs to change the order each time
    const shuffledBlogs = filteredBlogs.sort(() => 0.5 - Math.random());

    // Limit the number of blogs to 6
    const limitedBlogs = shuffledBlogs.slice(0, 6);

    return NextResponse.json(limitedBlogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching user and blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
