import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alamance | Vasquez Law Firm',
  description: 'Página en español para alamance',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Alamance"
      description="Esta página necesita ser traducida al español."
    />
  );
}
