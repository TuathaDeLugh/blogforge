import User from "@/models/user";
import Blog from "@/models/blog";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: Request) {
    try {
        // Check if user is admin
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        await connectdb();

        // Check if user exists
        const userToDelete = await User.findById(userId);
        if (!userToDelete) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Prevent deletion of admin user
        if (userToDelete.username === 'admin' || userToDelete.isAdmin) {
            return NextResponse.json(
                { message: "Cannot delete admin user" },
                { status: 403 }
            );
        }

        // Find admin user to reassign blogs
        const adminUser = await User.findOne({ username: 'admin' });
        if (!adminUser) {
            return NextResponse.json(
                { message: "Admin user not found for blog reassignment" },
                { status: 500 }
            );
        }

        // Reassign all blogs created by this user to admin
        const blogsUpdated = await Blog.updateMany(
            { creator: userId },
            { creator: adminUser._id }
        );

        // Delete the user
        await User.findByIdAndDelete(userId);

        return NextResponse.json(
            { 
                message: "User deleted successfully",
                blogsReassigned: blogsUpdated.modifiedCount
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error deleting user:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to delete user',
                error: error.message,
            },
            { status: 500 }
        );
    }
}