import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Durham | Vasquez Law Firm',
  description: 'Página en español para durham',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Durham"
      description="Esta página necesita ser traducida al español."
    />
  );
}
