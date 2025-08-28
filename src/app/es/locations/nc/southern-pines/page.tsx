import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Southern Pines | Vasquez Law Firm',
  description: 'Página en español para southern-pines',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Southern Pines"
      description="Esta página necesita ser traducida al español."
    />
  );
}
