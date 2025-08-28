import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cabarrus | Vasquez Law Firm',
  description: 'Página en español para cabarrus',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cabarrus"
      description="Esta página necesita ser traducida al español."
    />
  );
}
