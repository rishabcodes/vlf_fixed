import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Visa Process | Vasquez Law Firm',
  description: 'Página en español para visa-process',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Visa Process"
      description="Esta página necesita ser traducida al español."
    />
  );
}
