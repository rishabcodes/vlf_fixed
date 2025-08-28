import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Granville | Vasquez Law Firm',
  description: 'Página en español para granville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Granville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
