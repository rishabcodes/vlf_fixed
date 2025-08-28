import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Fiance K Visas | Vasquez Law Firm',
  description: 'Página en español para fiance-k-visas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Fiance K Visas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
