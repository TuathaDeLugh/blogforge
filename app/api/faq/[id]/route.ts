import FaQ from '@/models/faq';
import connectdb from '@/util/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: any) {
  const { id } = params;
  await connectdb();
  const email = await FaQ.findOne({ _id: id });
  return NextResponse.json({ data: email }, { status: 200 });
}

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = params;
    const { title, info } = await request.json();
    await connectdb();
    await FaQ.findByIdAndUpdate(id, { title, info });
    return NextResponse.json({ message: 'FaQ Updated' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
