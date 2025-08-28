import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'L1 Visas | Vasquez Law Firm',
  description: 'Página en español para l1-visas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="L1 Visas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
