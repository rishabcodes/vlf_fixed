import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pasquotank | Vasquez Law Firm',
  description: 'Página en español para pasquotank',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pasquotank"
      description="Esta página necesita ser traducida al español."
    />
  );
}
