import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gastonia | Vasquez Law Firm',
  description: 'Página en español para gastonia',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Gastonia"
      description="Esta página necesita ser traducida al español."
    />
  );
}
