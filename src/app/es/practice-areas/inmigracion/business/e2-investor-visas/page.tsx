import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E2 Investor Visas | Vasquez Law Firm',
  description: 'Página en español para e2-investor-visas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="E2 Investor Visas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
