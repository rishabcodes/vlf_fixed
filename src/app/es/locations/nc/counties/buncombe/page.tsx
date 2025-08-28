import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buncombe | Vasquez Law Firm',
  description: 'Página en español para buncombe',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Buncombe"
      description="Esta página necesita ser traducida al español."
    />
  );
}
