import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deportation | Vasquez Law Firm',
  description: 'Página en español para deportation',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Deportation"
      description="Esta página necesita ser traducida al español."
    />
  );
}
