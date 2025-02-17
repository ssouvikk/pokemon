// pages/_app.tsx
import "@/styles/globals.css";
import { useState, useEffect } from 'react';
import Router from 'next/router';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
          <p className="text-xl font-bold">লোড হচ্ছে...</p>
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
