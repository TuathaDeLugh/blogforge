import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
        try {
            const {token} = await request.json();
            await connectdb();
            const user = await User.findOne({ verifyToken : token,verifyTokenExpiry: {$gt: Date.now()} });
            if (!user) {
                return NextResponse.json({error: 'Invalid Token'},{status:401});
            }

            user.isVerified=true;
            user.verifyToken="";
            await user.save();
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
