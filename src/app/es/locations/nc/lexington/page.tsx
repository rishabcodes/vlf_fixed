import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lexington | Vasquez Law Firm',
  description: 'Página en español para lexington',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Lexington"
      description="Esta página necesita ser traducida al español."
    />
  );
}
