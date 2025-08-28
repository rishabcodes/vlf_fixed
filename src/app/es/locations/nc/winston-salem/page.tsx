import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Winston Salem | Vasquez Law Firm',
  description: 'Página en español para winston-salem',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Winston Salem"
      description="Esta página necesita ser traducida al español."
    />
  );
}
