import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lenoir | Vasquez Law Firm',
  description: 'Página en español para lenoir',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Lenoir"
      description="Esta página necesita ser traducida al español."
    />
  );
}
