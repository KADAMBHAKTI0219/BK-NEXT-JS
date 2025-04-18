'use client';

import { useAppContext } from '@/context/AppContext';

export default function Cart() {
  const { cart, addItem, removeItem } = useAppContext();

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-800 rounded-2xl p-6 max-w-lg mx-auto">
      <h6 className="font-bold text-2xl text-white mb-6">Your Cart</h6>
      {cart.items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        cart.items.map((item) => (
          <div
            key={item.id}
            className="p-4 flex justify-between border-b border-blueGray-700"
          >
            <div className="w-2/3">
              <h6 className="font-bold text-white mb-1">{item.name}</h6>
              <span className="text-gray-400">
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </div>
            <div className="w-1/3 flex justify-end items-center">
              <button
                onClick={() => removeItem(item)}
                className="mr-2 text-sm text-gray-400 hover:text-gray-200"
              >
                Remove
              </button>
              <button
                onClick={() => addItem(item)}
                className="text-sm text-gray-400 hover:text-gray-200"
              >
                Add
              </button>
            </div>
          </div>
        ))
      )}
      <div className="mt-6 text-white font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}