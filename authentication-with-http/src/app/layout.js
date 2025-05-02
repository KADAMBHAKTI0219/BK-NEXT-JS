import LogoutButton from '@/components/logout';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> | <Link href="/login">Login</Link> |{' '}
          <Link href="/protected">Protected</Link> | <LogoutButton/>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}