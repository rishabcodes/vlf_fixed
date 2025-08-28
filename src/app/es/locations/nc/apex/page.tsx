import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apex | Vasquez Law Firm',
  description: 'Página en español para apex',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Apex"
      description="Esta página necesita ser traducida al español."
    />
  );
}
