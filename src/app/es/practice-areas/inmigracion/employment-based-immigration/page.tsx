import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Employment Based Inmigración | Vasquez Law Firm',
  description: 'Página en español para employment-based-immigration',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Employment Based Inmigración"
      description="Esta página necesita ser traducida al español."
    />
  );
}
