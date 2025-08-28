import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cornelius | Vasquez Law Firm',
  description: 'Página en español para cornelius',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cornelius"
      description="Esta página necesita ser traducida al español."
    />
  );
}
