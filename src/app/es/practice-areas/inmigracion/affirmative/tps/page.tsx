import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tps | Vasquez Law Firm',
  description: 'Página en español para tps',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Tps"
      description="Esta página necesita ser traducida al español."
    />
  );
}
