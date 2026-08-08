import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export async function POST(req) {
  // Initialize Stripe with the secret key
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20', // or whatever your current api version is
  });

  // Configure Resend
  const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

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

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      const productsSummary = lineItems.data.map(item => {
        return `- ${item.description} (Qty: ${item.quantity})`;
      }).join('<br>');

      // Send the email
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'gabrieltolulope50@gmail.com', // Sending to owner
        subject: `[Klasik] New Order Received! (${currency} ${amountTotal})`,
        html: `
          <p><strong>New Order Alert!</strong></p>
          <p>A customer just completed a checkout session.</p>
          <p><strong>Customer Email:</strong> ${customerEmail}</p>
          <p><strong>Total Amount:</strong> ${currency} ${amountTotal}</p>
          <p><strong>Products Ordered:</strong><br>${productsSummary || 'No line items found.'}</p>
          <p><strong>Shipping Address:</strong><br>${shippingAddress || 'No address provided.'}</p>
          <p><strong>Stripe Session ID:</strong> ${session.id}</p>
        `,
      });
      console.log('Order notification email sent successfully!');
      
    } catch (emailError) {
      console.error('Error sending email or fetching line items:', emailError);
      // We still return 200 to Stripe so it doesn't retry the webhook endlessly
    }
  }

  return NextResponse.json({ received: true });
}
