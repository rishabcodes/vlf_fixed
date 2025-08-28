import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Union | Vasquez Law Firm',
  description: 'Página en español para union',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Union"
      description="Esta página necesita ser traducida al español."
    />
  );
}
