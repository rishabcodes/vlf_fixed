'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the actual chat component
const LazyChat = dynamic(
  () => import('./LazyChat'),
  { 
    ssr: false,
    loading: () => null
  }
);

export function OptimizedChat() {
  const [shouldLoadChat, setShouldLoadChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load chat after 3 seconds or on user interaction
    const timer = setTimeout(() => {
      setShouldLoadChat(true);
    }, 3000);

    const handleInteraction = () => {
      setShouldLoadChat(true);
      clearTimeout(timer);
    };

    // Listen for any user interaction
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('mousemove', handleInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
    };
  }, []);

  if (!shouldLoadChat) {
    // Render a lightweight placeholder button
    return (
      <button
        onClick={() => {
          setShouldLoadChat(true);
          setIsVisible(true);
        }}
        className="fixed bottom-4 right-4 z-50 bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg transition-all duration-300"
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  return <LazyChat initiallyVisible={isVisible} />;
}