import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wayne | Vasquez Law Firm',
  description: 'Página en español para wayne',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wayne"
      description="Esta página necesita ser traducida al español."
    />
  );
}
