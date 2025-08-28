import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import ClientPortalLayout from '@/components/portal/layout';

export const metadata: Metadata = {
  title: 'Client Portal - Vasquez Law Firm',
  description: 'Secure client portal for case management and communication',
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const session = await getServerSession();
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/portal');
  }

  return <ClientPortalLayout>{children}</ClientPortalLayout>;
}
