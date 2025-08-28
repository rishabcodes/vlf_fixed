import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alexander | Vasquez Law Firm',
  description: 'Página en español para alexander',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Alexander"
      description="Esta página necesita ser traducida al español."
    />
  );
}
