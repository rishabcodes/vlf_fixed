import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carteret | Vasquez Law Firm',
  description: 'Página en español para carteret',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Carteret"
      description="Esta página necesita ser traducida al español."
    />
  );
}
