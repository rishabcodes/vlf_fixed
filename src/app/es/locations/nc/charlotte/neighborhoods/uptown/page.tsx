import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uptown | Vasquez Law Firm',
  description: 'Página en español para uptown',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Uptown"
      description="Esta página necesita ser traducida al español."
    />
  );
}
