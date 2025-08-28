import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pender | Vasquez Law Firm',
  description: 'Página en español para pender',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pender"
      description="Esta página necesita ser traducida al español."
    />
  );
}
