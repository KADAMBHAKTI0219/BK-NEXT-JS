import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function ProtectedPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET ||  'BHAKTI02');
  } catch (error) {
    redirect('/login');
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Protected Page</h1>
      <p className="text-gray-600">This is a protected page. You are authenticated!</p>
    </div>
  );
}