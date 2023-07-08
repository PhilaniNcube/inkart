
import EmailTemplate from '@/components/Email/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// export const runtime = 'edge';
// export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:Request) {

  const {email, first_name, last_name, order_id, address, city, state} = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'info@inkart.store',
      to: email,
      subject: "Ink Art: Thank you for your order!",
      html: `<p>Hi ${first_name} ${last_name},</p>`
      + `<p>Thank you for your order! We will send you a confirmation when your order ships.</p>`,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
