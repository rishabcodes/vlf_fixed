import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statesville | Vasquez Law Firm',
  description: 'Página en español para statesville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Statesville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
