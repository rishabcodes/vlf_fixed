import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nash | Vasquez Law Firm',
  description: 'Página en español para nash',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Nash"
      description="Esta página necesita ser traducida al español."
    />
  );
}
