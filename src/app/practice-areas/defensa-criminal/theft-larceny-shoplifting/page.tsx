import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Theft Larceny Shoplifting | Vasquez Law Firm',
  description: 'Página en español para theft-larceny-shoplifting',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Theft Larceny Shoplifting"
      description="Esta página necesita ser traducida al español."
    />
  );
}
