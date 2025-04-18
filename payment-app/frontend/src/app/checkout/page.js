'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:5000/api/products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch(() => setError('Failed to load product'));
    }
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !product) {
      setProcessing(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/create-checkout-session', {
        product,
      });
      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      }
    } catch (err) {
      setError('Failed to process payment');
      setProcessing(false);
    }
  };

  if (!productId) return <div className="text-red-500 text-center">No product selected</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!product) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 to-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Checkout</h1>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{product.name}</h2>
        <p className="text-lg text-gray-600 mb-6">${product.price}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
            <CardElement
              className="p-3 border rounded-lg bg-gray-50"
              options={{
                style: {
                  base: { fontSize: '16px', color: '#32325d' },
                  invalid: { color: '#fa755a' },
                },
              }}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}