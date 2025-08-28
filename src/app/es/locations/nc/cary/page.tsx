import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cary | Vasquez Law Firm',
  description: 'Página en español para cary',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cary"
      description="Esta página necesita ser traducida al español."
    />
  );
}
