import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Results | Vasquez Law Firm',
  description: 'Página en español para case-results',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Case Results"
      description="Esta página necesita ser traducida al español."
    />
  );
}
