import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stokes | Vasquez Law Firm',
  description: 'Página en español para stokes',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Stokes"
      description="Esta página necesita ser traducida al español."
    />
  );
}
