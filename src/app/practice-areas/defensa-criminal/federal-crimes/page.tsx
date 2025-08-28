import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Federal Crimes | Vasquez Law Firm',
  description: 'Página en español para federal-crimes',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Federal Crimes"
      description="Esta página necesita ser traducida al español."
    />
  );
}
