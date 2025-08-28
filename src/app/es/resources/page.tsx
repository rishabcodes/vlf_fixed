import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources | Vasquez Law Firm',
  description: 'Página en español para resources',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Resources"
      description="Esta página necesita ser traducida al español."
    />
  );
}
