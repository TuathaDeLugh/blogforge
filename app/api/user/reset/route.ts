import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectdb from "@/util/mongodb";
import {  NextResponse } from "next/server";

export async function PATCH(request: Request) {
        try {
            const {token,newpassword} = await request.json();
            await connectdb();
            const user = await User.findOne({ forgotPasswordToken : token,forgotPasswordExpiry: {$gt: Date.now()} });
            if (!user) {
                console.log("invalid token");
                
                return NextResponse.json({message: 'Invalid Token'},{status:401});
            }
            
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newpassword, salt)

            user.password=hashedPassword;
            user.forgotPasswordToken="";
            await user.save();
            return NextResponse.json({
                message: "Password Reset Sucessfully",
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
