import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rolesville | Vasquez Law Firm',
  description: 'Página en español para rolesville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Rolesville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
