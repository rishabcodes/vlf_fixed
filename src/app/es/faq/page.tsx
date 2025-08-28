import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faq | Vasquez Law Firm',
  description: 'Página en español para faq',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Faq"
      description="Esta página necesita ser traducida al español."
    />
  );
}
