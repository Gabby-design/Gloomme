import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const { name, price } = await req.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gabrieltolulope50@gmail.com',
      subject: 'New T-Shirt Order!',
      text: `Someone ordered for this t-shirt: ${name}, and this is the price: ${price}.`,
      html: `<p>Someone ordered for this t-shirt: <strong>${name}</strong>, and this is the price: <strong>${price}</strong>.</p>`
    };

    // Send the email in the background without blocking (optional, but good practice)
    transporter.sendMail(mailOptions).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send alert:', error);
    return NextResponse.json({ error: 'Failed to send alert' }, { status: 500 });
  }
}
