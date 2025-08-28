import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cumberland | Vasquez Law Firm',
  description: 'Página en español para cumberland',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cumberland"
      description="Esta página necesita ser traducida al español."
    />
  );
}
