import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Child Custody | Vasquez Law Firm',
  description: 'Página en español para child-custody',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Child Custody"
      description="Esta página necesita ser traducida al español."
    />
  );
}
