import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tyrrell | Vasquez Law Firm',
  description: 'Página en español para tyrrell',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Tyrrell"
      description="Esta página necesita ser traducida al español."
    />
  );
}
