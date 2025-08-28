import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Currituck | Vasquez Law Firm',
  description: 'Página en español para currituck',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Currituck"
      description="Esta página necesita ser traducida al español."
    />
  );
}
