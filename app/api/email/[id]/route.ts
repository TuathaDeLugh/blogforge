import Email from "@/models/mail";
import connectdb from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, { params }:any) {
    const { id } = params;
    await connectdb();
    const email = await Email.findOne({ _id: id });
    return NextResponse.json({ data:email }, { status: 200 });
}