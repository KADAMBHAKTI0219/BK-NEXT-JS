'use client'
import { Inter } from 'next/font/google';
import './globals.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const inter = Inter({ subsets: ['latin'] });
const stripePromise = loadStripe('pk_test_51RF8KY4KwnHPNHoovsVJ2mNIaFwJ4UFkC0BR9XVkEPN3f7WBKrZIPVE8BRAJOUA4ExjgmlRKhATZS9cjEY9ffGVE00RBdl2Bjo');


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Elements stripe={stripePromise}>{children}</Elements>
      </body>
    </html>
  );
}