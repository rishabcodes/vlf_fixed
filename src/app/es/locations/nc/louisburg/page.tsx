import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Louisburg | Vasquez Law Firm',
  description: 'Página en español para louisburg',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Louisburg"
      description="Esta página necesita ser traducida al español."
    />
  );
}
