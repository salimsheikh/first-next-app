'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const NotFound = () => {

  const router = useRouter();

   useEffect(() => {
    // Example of redirecting to home after 5 seconds
     const timer = setTimeout(() => {
        router.push('/');
     }, 3000);

     return () => clearTimeout(timer);

   }, [router]);

  return (
    <div className="container-not-found">
      <h1 className="title">404 - Page Not Found</h1>
      <p className="description">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="link">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;