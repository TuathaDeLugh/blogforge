import FaQ from '@/models/faq';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, info } = await request.json();
    await connectdb();
    await FaQ.create({ title, info });

    return NextResponse.json(
      {
        message: 'Mail Saved',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'failed to load mail',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, response: Response) {
  try {
    await connectdb();
    const sort = -1;

    const faqs = await FaQ.find().sort({ createdAt: sort });

    return NextResponse.json({ data: faqs }, { status: 200 });
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
    await FaQ.findByIdAndDelete(id);
    return NextResponse.json({ message: 'FaQ Deleted' }, { status: 200 });
  } catch (error: any) {
    console.log(error);
  }
}
