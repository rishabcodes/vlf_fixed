import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kernersville | Vasquez Law Firm',
  description: 'Página en español para kernersville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Kernersville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
