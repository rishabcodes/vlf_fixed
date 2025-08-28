import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bertie | Vasquez Law Firm',
  description: 'Página en español para bertie',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Bertie"
      description="Esta página necesita ser traducida al español."
    />
  );
}
