import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green Cards | Vasquez Law Firm',
  description: 'Página en español para green-cards',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Green Cards"
      description="Esta página necesita ser traducida al español."
    />
  );
}
