import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shelby | Vasquez Law Firm',
  description: 'Página en español para shelby',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Shelby"
      description="Esta página necesita ser traducida al español."
    />
  );
}
