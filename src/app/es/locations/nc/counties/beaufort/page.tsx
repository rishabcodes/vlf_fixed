import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beaufort | Vasquez Law Firm',
  description: 'Página en español para beaufort',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Beaufort"
      description="Esta página necesita ser traducida al español."
    />
  );
}
