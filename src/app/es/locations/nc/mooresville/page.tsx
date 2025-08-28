import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mooresville | Vasquez Law Firm',
  description: 'Página en español para mooresville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mooresville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
