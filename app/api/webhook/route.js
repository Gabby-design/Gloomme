import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20', // or whatever your current api version is
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Extract details
    const customerEmail = session.customer_details?.email || session.customer_email || 'No email provided';
    const amountTotal = (session.amount_total / 100).toFixed(2); // Convert cents to dollars/naira
    const currency = session.currency.toUpperCase();
    
    // Address formatting
    const addressInfo = session.customer_details?.address || {};
    const shippingAddress = [
      addressInfo.line1,
      addressInfo.line2,
      addressInfo.city,
      addressInfo.state,
      addressInfo.postal_code,
      addressInfo.country
    ].filter(Boolean).join(', ');

    // For line items (products), we'd typically need to fetch them from the session if they were expanded
    // Or retrieve them via Stripe API using the session ID
    // Since we're doing a simple summary, let's fetch the line items
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      const productsSummary = lineItems.data.map(item => {
        return `- ${item.description} (Qty: ${item.quantity})`;
      }).join('\n');

      // Compose Email Body
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to owner
        subject: `[Klasik] New Order Received! (${currency} ${amountTotal})`,
        text: `
          New Order Alert!
          
          A customer just completed a checkout session.
          
          Customer Email: ${customerEmail}
          Total Amount: ${currency} ${amountTotal}
          
          Products Ordered:
          ${productsSummary || 'No line items found.'}
          
          Shipping Address:
          ${shippingAddress || 'No address provided.'}
          
          Stripe Session ID: ${session.id}
        `.trim().replace(/^ +/gm, ''), // Removes leading indentation
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Order notification email sent successfully!');
      
    } catch (emailError) {
      console.error('Error sending email or fetching line items:', emailError);
      // We still return 200 to Stripe so it doesn't retry the webhook endlessly
    }
  }

  return NextResponse.json({ received: true });
}
