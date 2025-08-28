import { AdminActionTemplate } from "@/models/banTemplate";
import User from "@/models/user";
import connectdb from "@/util/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

// GET - Fetch all admin action templates
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const actionType = searchParams.get('actionType');
        const isActive = searchParams.get('isActive');

        await connectdb();

        let query: any = {};
        if (actionType) query.actionType = actionType;
        if (isActive !== null) query.isActive = isActive === 'true';

        const templates = await AdminActionTemplate.find(query)
            .populate('createdBy', 'username name')
            .sort({ severity: 1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            templates
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching admin action templates:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to fetch admin action templates',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// POST - Create new admin action template
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { name, description, actionType, duration, reason, severity, metadata } = await request.json();

        if (!name || !description || !actionType || !reason) {
            return NextResponse.json(
                { message: "Name, description, action type, and reason are required" },
                { status: 400 }
            );
        }

        await connectdb();

        // Check if template with same name already exists
        const existingTemplate = await AdminActionTemplate.findOne({ name: name.trim() });
        if (existingTemplate) {
            return NextResponse.json(
                { message: "Template with this name already exists" },
                { status: 400 }
            );
        }

        const template = new AdminActionTemplate({
            name: name.trim(),
            description: description.trim(),
            actionType,
            duration: duration || null,
            reason: reason.trim(),
            severity: severity || 'medium',
            metadata: metadata || {},
            createdBy: session.user.dbid
        });

        await template.save();
        await template.populate('createdBy', 'username name');

        return NextResponse.json({
            success: true,
            message: "Admin action template created successfully",
            template
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error creating admin action template:', error.message);
        return NextResponse.json(
            {
                message: 'Failed to create admin action template',
                error: error.message,
            },
            { status: 500 }
        );
    }
}