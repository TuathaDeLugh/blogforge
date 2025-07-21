import BanTemplate from "@/models/banTemplate";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

// PUT - Update ban template
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { name, description, banType, duration, reason, severity, isActive } = await request.json();
        const { id } = params;

        if (!name || !description || !banType || !reason) {
            return NextResponse.json(
                { message: "Name, description, ban type, and reason are required" },
                { status: 400 }
            );
        }

        await connectdb();

        // Check if another template with same name exists
        const existingTemplate = await BanTemplate.findOne({ 
            name: name.trim(), 
            _id: { $ne: id } 
        });
        if (existingTemplate) {
            return NextResponse.json(
                { message: "Template with this name already exists" },
                { status: 400 }
            );
        }

        const template = await BanTemplate.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                description: description.trim(),
                banType,
                duration: duration || null,
                reason: reason.trim(),
                severity: severity || 'medium',
                isActive: isActive !== undefined ? isActive : true
            },
            { new: true }
        ).populate('createdBy', 'username name');

        if (!template) {
            return NextResponse.json(
                { message: "Template not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Ban template updated successfully",
            template
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating ban template:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to update ban template',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// DELETE - Delete ban template
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;

        await connectdb();

        const template = await BanTemplate.findByIdAndDelete(id);

        if (!template) {
            return NextResponse.json(
                { message: "Template not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Ban template deleted successfully"
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error deleting ban template:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to delete ban template',
                error: error.message,
            },
            { status: 500 }
        );
    }
}