'use client'
import Cart from '@/components/payment/Cart';
import CheckoutSummary from '@/components/payment/CheckoutSummary';
import PaymentForm from '@/components/payment/PaymentForm';
import { AppProvider, useAppContext } from '@/context/AppContext';
import Link from 'next/link';

export default function PaymentPage() {
  const { resetCart } = useAppContext();

  const handleOrderSuccess = () => {
    resetCart();
    window.location.href = '/success';
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <Link href="/product" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Back to Products
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Cart />
              <CheckoutSummary />
            </div>
            <PaymentForm cart={useAppContext().cart} onOrderSuccess={handleOrderSuccess} />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}