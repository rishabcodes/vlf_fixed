import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jacksonville | Vasquez Law Firm',
  description: 'Página en español para jacksonville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Jacksonville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
