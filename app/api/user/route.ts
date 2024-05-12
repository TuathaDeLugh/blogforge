import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/util/mailer";

export async function POST(request: NextRequest) {

    try {
        const { name, username, email, avatar, pass, provider } = await request.json();
        await connectdb();
        const user = await User.findOne({ email });
        const existUsername = await User.findOne({ username });
        if (user) {
            return NextResponse.json({ error: "User already existed with this email" }, { status: 400 })
        }
        else {
            if (existUsername) {
                return NextResponse.json({ error: "Username Already Taken" }, { status: 401 })
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(pass, salt)

            const newUser =new User({
                name,
                username,
                email,
                avatar,
                provider,
                password:hashedPassword
            })
            const saveduser = await newUser.save();

            await sendEmail({email,emailType:"VERIFY"})
            // await sendEmail({ email: 'ursailor@gmail.com', emailType: "RESET"})
            return NextResponse.json({
                message: "Created",
                saveduser,
            }, { status: 200 });
        }
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: error,
            },
            { status: 500 }

        );
    }
}


export async function GET(request: NextRequest, response: NextResponse) {
    try {
        await connectdb();
        const pageParam = request.nextUrl.searchParams.get('page');
        const page = parseInt(pageParam as string) || 1;
        const pageSize = 15;
        const skip = (page - 1) * pageSize;
        const usernameFilter = { username: { $ne: 'admin' } };
        const users = await User.find(usernameFilter).sort({ isAdmin: 1 }).select("_id username name email isAdmin").skip(skip).limit(pageSize);

        const totalDocuments = await User.countDocuments(usernameFilter);

        const hasNextPage = skip + pageSize < totalDocuments;

        return NextResponse.json(
            {
                data: users,
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

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectdb();
        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: "User Deleted" }, { status: 200 });
    } catch (error) {
        console.log(error)
    }
}