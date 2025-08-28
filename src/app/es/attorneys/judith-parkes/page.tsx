import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Judith Parkes | Vasquez Law Firm',
  description: 'Página en español para judith-parkes',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Judith Parkes"
      description="Esta página necesita ser traducida al español."
    />
  );
}
