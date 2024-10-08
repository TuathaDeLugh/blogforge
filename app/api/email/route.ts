import Email from "@/models/mail";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const { name, email, subject, details } = await request.json();
        await connectdb();
        await Email.create({ name, email, subject, details });


        return NextResponse.json(
            {
                message: "Mail Saved",
            },
            { status: 200 }

        );
    }
    catch (error: any) {
        return NextResponse.json(
            {
                message: "failed to load mail",
            },
            { status: 500 }

        );
    }
}

export async function GET(request: Request, response:Response) {
    try {
        await connectdb();
        const sort = -1;
        const { searchParams } = new URL(request.url);
        const pageParam = searchParams.get('page');
        const page = parseInt(pageParam as string) || 1;
        const pageSize = 15;
        const skip = (page - 1) * pageSize;

        const emails = await Email.find().sort({ createdAt: sort }).skip(skip).limit(pageSize);

        const totalDocuments = await Email.countDocuments();

        const hasNextPage = skip + pageSize < totalDocuments;

        return NextResponse.json(
            {
                data: emails,
                meta: {
                    totalDocuments,
                    totalPages: Math.ceil(totalDocuments / pageSize),
                    currentPage: page,
                    hasNextPage,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error in GET handler:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to load mail',
                error: error.message,
            },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await connectdb();
        await Email.findByIdAndDelete(id);
        return NextResponse.json({ message: "Project Deleted" }, { status: 200 });
    } catch (error: any) {
        console.log(error)
    }
}