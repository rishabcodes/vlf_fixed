import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Probation Violation | Vasquez Law Firm',
  description: 'Página en español para probation-violation',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Probation Violation"
      description="Esta página necesita ser traducida al español."
    />
  );
}
