import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Equitable Distribution Property Debt Division | Vasquez Law Firm',
  description: 'Página en español para equitable-distribution-property-debt-division',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Equitable Distribution Property Debt Division"
      description="Esta página necesita ser traducida al español."
    />
  );
}
