'use client';

import { useState, useEffect } from 'react';
import { LazyChat } from './LazyChat';

// Client-only chat component that renders after mount
export function ClientChat() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render after mount to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return <LazyChat />;
}