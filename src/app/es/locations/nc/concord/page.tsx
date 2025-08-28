import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Concord | Vasquez Law Firm',
  description: 'Página en español para concord',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Concord"
      description="Esta página necesita ser traducida al español."
    />
  );
}
