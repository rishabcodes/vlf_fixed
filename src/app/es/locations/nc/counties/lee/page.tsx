import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lee | Vasquez Law Firm',
  description: 'Página en español para lee',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Lee"
      description="Esta página necesita ser traducida al español."
    />
  );
}
