import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Surry | Vasquez Law Firm',
  description: 'Página en español para surry',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Surry"
      description="Esta página necesita ser traducida al español."
    />
  );
}
