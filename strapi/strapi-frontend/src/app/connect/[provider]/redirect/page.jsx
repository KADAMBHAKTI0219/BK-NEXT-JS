'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const SocialRedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const doSocialLogin = async () => {
      try {
        const token = searchParams.get('access_token') || searchParams.get('id_token');
        const provider = window.location.pathname.includes('google') ? 'google' : 'github';

        if (!token) {
          alert('Login failed: No token in URL');
          return;
        }

        // Send token as "access_token" even if it's an id_token for Google
        const response = await axios.get(
          `http://localhost:1337/api/auth/${provider}/callback?access_token=${token}`
        );

        const data = response.data;

        if (data.jwt && data.user) {
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', JSON.stringify(data.user));
          router.push('/product');
        } else {
          console.error("Unexpected response from backend:", data);
          alert('Login failed: Invalid JWT or user.');
        }

      } catch (error) {
        console.error('Social login error:', error.response?.data || error.message);
        alert('Something went wrong during social login.');
      }
    };

    doSocialLogin();
  }, []);

  return <p className="text-center py-10">Logging you in...</p>;
};

export default SocialRedirectPage;
