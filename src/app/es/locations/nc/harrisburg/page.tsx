import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harrisburg | Vasquez Law Firm',
  description: 'Página en español para harrisburg',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Harrisburg"
      description="Esta página necesita ser traducida al español."
    />
  );
}
