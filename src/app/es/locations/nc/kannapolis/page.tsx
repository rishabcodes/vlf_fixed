import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kannapolis | Vasquez Law Firm',
  description: 'Página en español para kannapolis',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Kannapolis"
      description="Esta página necesita ser traducida al español."
    />
  );
}
