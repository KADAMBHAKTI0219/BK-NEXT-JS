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
    // Verify token (using the same secret as the backend)
    jwt.verify(token, 'BHAKTI0219');
    return <div>Protected Content</div>;
  } catch (error) {
    redirect('/login');
  }
}
