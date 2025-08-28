import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { targetUserId, action } = await request.json();
        
        if (!targetUserId || !action) {
            return NextResponse.json(
                { message: "Target user ID and action are required" },
                { status: 400 }
            );
        }

        await connectdb();

        const currentUser = await User.findById(session.user.dbid);
        if (!currentUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (action === 'block') {
            // Add user to blocked list if not already blocked
            if (!currentUser.blockedUsers.includes(targetUserId)) {
                currentUser.blockedUsers.push(targetUserId);
                await currentUser.save();
            }
        } else if (action === 'unblock') {
            // Remove user from blocked list
            currentUser.blockedUsers = currentUser.blockedUsers.filter(
                (id: any) => id.toString() !== targetUserId
            );
            await currentUser.save();
        }

        return NextResponse.json(
            { 
                message: `User ${action}ed successfully`,
                blockedUsers: currentUser.blockedUsers
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error blocking/unblocking user:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to update block status',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectdb();

        const user = await User.findById(session.user.dbid)
            .populate('blockedUsers', 'username name avatar')
            .select('blockedUsers');

        return NextResponse.json(
            { 
                blockedUsers: user?.blockedUsers || []
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error fetching blocked users:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to fetch blocked users',
                error: error.message,
            },
            { status: 500 }
        );
    }
}