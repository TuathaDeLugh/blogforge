import { AdminActionTemplate } from '@/models/banTemplate';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/options';

// PUT - Update admin action template
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const {
      name,
      description,
      actionType,
      duration,
      reason,
      severity,
      isActive,
    } = await request.json();
    const { id } = params;

    if (!name || !description || !actionType || !reason) {
      return NextResponse.json(
        { message: 'Name, description, action type, and reason are required' },
        { status: 400 }
      );
    }

    await connectdb();

    // Check if another template with same name exists
    const existingTemplate = await AdminActionTemplate.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });
    if (existingTemplate) {
      return NextResponse.json(
        { message: 'Template with this name already exists' },
        { status: 400 }
      );
    }

    const template = await AdminActionTemplate.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        actionType,
        duration: duration || null,
        reason: reason.trim(),
        severity: severity || 'medium',
        isActive: isActive !== undefined ? isActive : true,
      },
      { new: true }
    ).populate('createdBy', 'username name');

    if (!template) {
      return NextResponse.json(
        { message: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Admin action template updated successfully',
        template,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating admin action template:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to update admin action template',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete admin action template
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    await connectdb();

    const template = await AdminActionTemplate.findByIdAndDelete(id);

    if (!template) {
      return NextResponse.json(
        { message: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Admin action template deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting admin action template:', error.message);
    return NextResponse.json(
      {
        message: 'Failed to delete admin action template',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
