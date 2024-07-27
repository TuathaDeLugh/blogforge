import connectdb from '@/util/mongodb';
import { NextResponse } from "next/server";
import { User } from "@/models/user"; 
import { Blog } from "@/models/blog"; 

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
    try {
        await connectdb();
        
        if (!Blog) {
            throw new Error('Blog model is not registered');
        }
        const { searchParams } = new URL(request.url);
        const pageParam = searchParams.get('page');
        const page = parseInt(pageParam as string) || 1;
        const pageSize = 15;
        const skip = (page - 1) * pageSize;

        const user = await User.findById(id);
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const savelistCount = user.savelist.length;

        const savelist = await User.findById(id)
            .populate({
                path: 'savelist',
                match: { status: 'published' },
                select: 'title category info images updatedAt',
                options: {
                    limit: pageSize,
                    skip: skip
                },
                populate: {
                    path: 'creator',
                    select: 'username avatar'
                }
            });

        const totalDocuments = savelistCount;
        const totalPages = Math.ceil(totalDocuments / pageSize);
        const hasNextPage = skip + pageSize < totalDocuments;

        return NextResponse.json({
            data: savelist?.savelist,
            meta: {
                totalDocuments,
                totalPages,
                currentPage: page,
                hasNextPage
            }
        }, { status: 200 });
    } catch (error: any) {
        console.error('Error in GET handler:', error.message);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: error.message
        }, { status: 500 });
    }
}
