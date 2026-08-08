import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, price } = await req.json();

    // Send the email in the background
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gabrieltolulope50@gmail.com',
      subject: 'New T-Shirt Order!',
      html: `<p>Someone ordered for this t-shirt: <strong>${name}</strong>, and this is the price: <strong>${price}</strong>.</p>`
    }).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send alert:', error);
    return NextResponse.json({ error: 'Failed to send alert' }, { status: 500 });
  }
}
