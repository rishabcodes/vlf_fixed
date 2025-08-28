import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Randolph | Vasquez Law Firm',
  description: 'Página en español para randolph',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Randolph"
      description="Esta página necesita ser traducida al español."
    />
  );
}
