// pages/_app.tsx
import "@/styles/globals.css";
import { useState, useEffect } from 'react';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  // Dark mode state: true for dark mode, false for light mode
  const [darkMode, setDarkMode] = useState(false);

  // Loader for route change
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

  // Fetch dark mode preference from localStorage during page load
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

  // Function to toggle dark mode
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
        // Using the Loader component, configurable with props as needed
        <Loader message="Loading..." spinnerSize={64} spinnerColor="border-blue-500" />
      )}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Keep space of approximately 80px for the fixed Navbar at the top */}
      <div className="pt-20">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
