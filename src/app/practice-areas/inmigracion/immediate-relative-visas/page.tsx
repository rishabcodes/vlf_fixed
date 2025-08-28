import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Immediate Relative Visas | Vasquez Law Firm',
  description: 'Página en español para immediate-relative-visas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Immediate Relative Visas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
