'use client';

import { useAppContext } from '@/context/AppContext';

export default function CheckoutSummary() {
  const { cart } = useAppContext();

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {cart.items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>
            {item.name} x {item.quantity}
          </span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}