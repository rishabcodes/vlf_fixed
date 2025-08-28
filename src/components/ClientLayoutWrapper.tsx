'use client';

import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { Toaster } from 'react-hot-toast';
import { Suspense, useState, useEffect } from 'react';
import { ClientChat } from '@/components/ChatWidget/ClientChat';
import { LanguageTogglePortal } from '@/components/lang/LanguageTogglePortal';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Always render MasterLayout for SSR, but wrap client-only components
  return (
    <>
      <MasterLayout>
        {children}
        {mounted && <Toaster position="bottom-right" />}
        {mounted && (
          <Suspense fallback={null}>
            {/* Chat widget lazy loaded for performance - only loads when clicked */}
            <ClientChat />
          </Suspense>
        )}
      </MasterLayout>
      {/* Language Toggle Portal - only render after mount */}
      {mounted && <LanguageTogglePortal />}
    </>
  );
}