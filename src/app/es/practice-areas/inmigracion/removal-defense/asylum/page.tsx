import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asylum | Vasquez Law Firm',
  description: 'Página en español para asylum',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Asylum"
      description="Esta página necesita ser traducida al español."
    />
  );
}
