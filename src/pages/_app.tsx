// pages/_app.tsx
import "@/styles/globals.css";
import { useState, useEffect } from 'react';
import Router from 'next/router';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  // Dark mode স্টেট: true হলে dark mode, false হলে light mode
  const [darkMode, setDarkMode] = useState(false);

  // রাউট পরিবর্তনের জন্য লোডার
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

  // পেজ লোডের সময় localStorage থেকে dark mode প্রেফারেন্স নিয়ে সেট করা
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // dark mode toggle করার ফাংশন
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
          <p className="text-xl font-bold text-black dark:text-white">লোড হচ্ছে...</p>
        </div>
      )}
      {/* Header এর মতো জায়গায় dark mode toggle button রাখা */}
      <div className="p-4 flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
        </button>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
