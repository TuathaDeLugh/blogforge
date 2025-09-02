import { sendEmail } from '@/util/mailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, emailType } = await request.json();
    console.log(email, emailType);

    await sendEmail({ email, emailType });
    return NextResponse.json(
      {
        message: 'Mail Sent',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Failed to send Mail',
        error,
      },
      { status: 500 }
    );
    console.log(error);
  }
}
