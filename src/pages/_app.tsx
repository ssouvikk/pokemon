// pages/_app.tsx
import "@/styles/globals.css";
import { useState, useEffect } from 'react';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';

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
        // Loader কম্পোনেন্টকে ব্যবহার করে, প্রয়োজনে প্রোপস দিয়ে কনফিগার করা যায়
        <Loader message="লোড হচ্ছে..." spinnerSize={64} spinnerColor="border-blue-500" />
      )}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Fixed Navbar এর জন্য উপরের 80px (প্রায়) জায়গা রেখে দিন */}
      <div className="pt-20">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
