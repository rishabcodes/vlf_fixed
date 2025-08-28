'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const login = useCallback(
    async (provider?: string) => {
      if (provider) {
        await signIn(provider);
      } else {
        router.push('/auth/signin');
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push('/');
  }, [router]);

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user;

  const hasRole = useCallback(
    (role: string | string[]) => {
      if (!user) return false;
      const roles = Array.isArray(role) ? role : [role];
      return roles.includes(user.role);
    },
    [user]
  );

  const isAdmin = useCallback(() => hasRole('ADMIN'), [hasRole]);
  const isAttorney = useCallback(() => hasRole(['ATTORNEY', 'ADMIN']), [hasRole]);
  const isClient = useCallback(() => hasRole('CLIENT'), [hasRole]);

  return {
    user,
    session,
    status,
    isAuthenticated,
    isLoading,
    login,
    logout,
    update,
    hasRole,
    isAdmin,
    isAttorney,
    isClient,
  };
}
