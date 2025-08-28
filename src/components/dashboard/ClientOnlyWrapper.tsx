'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnlyWrapper({ children, fallback = null }: ClientOnlyWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
