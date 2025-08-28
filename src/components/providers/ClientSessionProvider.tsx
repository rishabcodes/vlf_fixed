'use client';

import { ReactNode, useState, useEffect } from 'react';
import SessionProvider from './SessionProvider';

interface Props {
  children: ReactNode;
}

/**
 * Client-only SessionProvider wrapper that prevents auth context
 * from being accessed during static generation (SSG).
 * This fixes build errors for statically generated pages.
 */
export default function ClientSessionProvider({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render children for SSR, but only wrap with SessionProvider after mount
  if (!mounted) {
    return <>{children}</>;
  }

  return <SessionProvider>{children}</SessionProvider>;
}