import BanTemplate from '@/models/banTemplate';
import User from '@/models/user';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

// GET - Fetch all ban templates
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const banType = searchParams.get('banType');
    const isActive = searchParams.get('isActive');

    await connectdb();

    let query: any = {};
    if (banType) query.banType = banType;
    if (isActive !== null) query.isActive = isActive === 'true';

    const templates = await BanTemplate.find(query)
      .populate('createdBy', 'username name')
      .sort({ severity: 1, createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        templates,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching ban templates:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to fetch ban templates',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Create new ban template
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, banType, duration, reason, severity } =
      await request.json();

    if (!name || !description || !banType || !reason) {
      return NextResponse.json(
        { message: 'Name, description, ban type, and reason are required' },
        { status: 400 }
      );
    }

    await connectdb();

    // Check if template with same name already exists
    const existingTemplate = await BanTemplate.findOne({ name: name.trim() });
    if (existingTemplate) {
      return NextResponse.json(
        { message: 'Template with this name already exists' },
        { status: 400 }
      );
    }

    const template = new BanTemplate({
      name: name.trim(),
      description: description.trim(),
      banType,
      duration: duration || null,
      reason: reason.trim(),
      severity: severity || 'medium',
      createdBy: session.user.dbid,
    });

    await template.save();
    await template.populate('createdBy', 'username name');

    return NextResponse.json(
      {
        success: true,
        message: 'Ban template created successfully',
        template,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating ban template:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to create ban template',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
