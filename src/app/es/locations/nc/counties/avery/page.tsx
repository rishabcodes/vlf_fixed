import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avery | Vasquez Law Firm',
  description: 'Página en español para avery',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Avery"
      description="Esta página necesita ser traducida al español."
    />
  );
}
