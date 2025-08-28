import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Franklin | Vasquez Law Firm',
  description: 'Página en español para franklin',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Franklin"
      description="Esta página necesita ser traducida al español."
    />
  );
}
