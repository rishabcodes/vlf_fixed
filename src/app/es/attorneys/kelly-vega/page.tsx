import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelly Vega | Vasquez Law Firm',
  description: 'Página en español para kelly-vega',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Kelly Vega"
      description="Esta página necesita ser traducida al español."
    />
  );
}
