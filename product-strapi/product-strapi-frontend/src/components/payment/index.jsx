"use client"
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY); // Replace with your Stripe publishable key

export default function PaymentPage() {
  const [product, setProduct] = useState({
    name: 'Sample Product',
    price: 999, // Amount in cents
    quantity: 1,
  });

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product }),
    });

    const { clientSecret } = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: clientSecret,
    });

    if (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <p className="mb-2">Product: {product.name}</p>
      <p className="mb-4">Price: ${(product.price / 100).toFixed(2)}</p>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        disabled={!stripePromise}
      >
        Pay Now
      </button>
    </div>
  );
}