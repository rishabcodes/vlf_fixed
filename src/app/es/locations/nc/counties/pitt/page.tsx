import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pitt | Vasquez Law Firm',
  description: 'Página en español para pitt',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pitt"
      description="Esta página necesita ser traducida al español."
    />
  );
}
