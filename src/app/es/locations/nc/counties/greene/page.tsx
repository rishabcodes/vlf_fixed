import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Greene | Vasquez Law Firm',
  description: 'Página en español para greene',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Greene"
      description="Esta página necesita ser traducida al español."
    />
  );
}
