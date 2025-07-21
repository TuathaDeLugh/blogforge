import AdminAction from "@/models/adminAction";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const actionType = searchParams.get('actionType');
        const targetType = searchParams.get('targetType');

        await connectdb();

        // Build filter
        const filter: any = {};
        if (actionType) filter.actionType = actionType;
        if (targetType) filter.targetType = targetType;

        const skip = (page - 1) * limit;

        const actions = await AdminAction.find(filter)
            .populate('adminId', 'username name avatar')
            .populate('targetUserId', 'username name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalActions = await AdminAction.countDocuments(filter);

        return NextResponse.json(
            {
                data: actions,
                meta: {
                    totalDocuments: totalActions,
                    totalPages: Math.ceil(totalActions / limit),
                    currentPage: page,
                    hasNextPage: skip + limit < totalActions,
                },
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error fetching admin actions:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to fetch admin actions',
                error: error.message,
            },
            { status: 500 }
        );
    }
}