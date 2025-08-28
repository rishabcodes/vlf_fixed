import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Disclaimer | Vasquez Law Firm',
  description: 'Página en español para legal-disclaimer',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Legal Disclaimer"
      description="Esta página necesita ser traducida al español."
    />
  );
}
