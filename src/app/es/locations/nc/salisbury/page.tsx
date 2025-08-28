import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salisbury | Vasquez Law Firm',
  description: 'Página en español para salisbury',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Salisbury"
      description="Esta página necesita ser traducida al español."
    />
  );
}
