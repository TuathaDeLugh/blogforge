import User from "@/models/user";
import { sendEmail } from "@/util/mailer";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    try {
            // const email = "ursailor@gmail.com";
            const {token} = await request.json();
            await connectdb();
            const user = await User.findOne({ verifyToken : token,verifyTokenExpiry: {$gt: Date.now()} });
            if (!user) {
                return NextResponse.json({error: 'Invalid Token'},{status:401});
            }

            const email = user.email;

            user.isVerified=true;
            user.verifyToken="";
            await user.save();
            await sendEmail({ email,emailType:"WELCOME"});
            return NextResponse.json({
                message: "User Verified",
                user,
            }, { status: 200 });

        } catch (error) {
            return NextResponse.json({
                error: "Server Error" + error,
                }, {
                    status:500
                })
        }
}

export async function PUT(request: Request) {
    try {
        const {token} = await request.json();
        await connectdb();
        const user = await User.findOne({ 
            NewMailToken : token , NewMailTokenExpiry : {$gt: Date.now()} });
        if (!user) {
            return NextResponse.json({error: 'Update Email token is Expired'},{status:401});
        }

        user.email=user.newMail;
        user.newMail="";
        user.NewMailToken="";
        await user.save();
        return NextResponse.json({
            message: "User Email Updated",
            user,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: "Server Error" + error,
            }, {
                status:500
            })
    }
}