'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20', // Ensure this matches your API version or is compatible
});

export async function checkoutAction(cart) {
  try {
    if (!cart || cart.length === 0) {
      throw new Error('Cart is empty');
    }

    // Map cart items to Stripe line_items
    const lineItems = cart.map((item) => {
      return {
        price_data: {
          currency: 'ngn',
          product_data: {
            name: `${item.title} - ${item.size} (${item.color})`,
            images: [item.image],
            metadata: {
              productId: item.id,
              size: item.size,
              color: item.color,
            },
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents/kobo
        },
        quantity: item.quantity,
      };
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const hasFreeShipping = subtotal >= 70000;

    // Construct origin URL for redirect
    // Use NEXT_PUBLIC_SITE_URL if defined, otherwise fallback to localhost
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const sessionParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['NG', 'US', 'GB'], // Adjust as needed
      },
    };

    if (!hasFreeShipping) {
      sessionParams.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 250000, // ₦2500 in kobo
              currency: 'ngn',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return { url: session.url };
  } catch (error) {
    console.error('Checkout error:', error);
    throw new Error(error.message);
  }
}
