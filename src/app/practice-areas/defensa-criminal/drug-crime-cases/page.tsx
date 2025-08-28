import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Drug Crime Cases | Vasquez Law Firm',
  description: 'Página en español para drug-crime-cases',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Drug Crime Cases"
      description="Esta página necesita ser traducida al español."
    />
  );
}
