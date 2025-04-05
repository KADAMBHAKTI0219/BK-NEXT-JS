'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SocialRedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('access_token');
    const userStr = searchParams.get('user');

    if (token) {
      localStorage.setItem('jwt', token);
      if (userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
          console.error('Failed to parse user info:', e);
        }
      }
      router.push('/product');
    } else {
      alert('Login failed: No access token received.');
      router.push('/login');
    }
  }, []);

  return <p className="text-center py-10">Logging you in...</p>;
};

export default SocialRedirectPage;
