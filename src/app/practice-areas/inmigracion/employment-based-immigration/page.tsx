import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Employment Based Immigration | Vasquez Law Firm',
  description: 'Página en español para employment-based-immigration',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Employment Based Immigration"
      description="Esta página necesita ser traducida al español."
    />
  );
}
