'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ cart, onOrderSuccess, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    // Confirm the payment
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      // Create order in Strapi
      try {
        const amount = Math.round(
          cart.items.reduce((total, item) => total + item.price * item.quantity, 0) * 100
        );
        const orderResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify({
              data: {
                amount: amount / 100, // Store in dollars
                products: cart.items.map((item) => item.id),
              },
            }),
          }
        );

        if (!orderResponse.ok) {
          throw new Error('Failed to create order in Strapi');
        }

        onOrderSuccess();
      } catch (err) {
        setError('Failed to save order: ' + err.message);
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      {clientSecret ? <PaymentElement /> : <p>Loading payment form...</p>}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing || !cart.items.length || !clientSecret}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default function PaymentForm({ cart, onOrderSuccess }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cart.items.length) {
      setClientSecret(null);
      return;
    }

    // Calculate total amount (in cents)
    const amount = Math.round(
      cart.items.reduce((total, item) => total + item.price * item.quantity, 0) * 100
    );

    // Fetch clientSecret when cart changes
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, currency: 'usd' }),
        });

        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError('Failed to create payment intent');
        }
      } catch (err) {
        setError('Error fetching payment intent: ' + err.message);
      }
    };

    fetchClientSecret();
  }, [cart]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!cart.items.length) {
    return <div className="text-gray-600 text-center mt-10">Your cart is empty.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm cart={cart} onOrderSuccess={onOrderSuccess} clientSecret={clientSecret} />
    </Elements>
  );
}