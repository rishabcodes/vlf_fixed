import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scotland | Vasquez Law Firm',
  description: 'Página en español para scotland',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Scotland"
      description="Esta página necesita ser traducida al español."
    />
  );
}
