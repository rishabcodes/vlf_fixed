import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indian Trail | Vasquez Law Firm',
  description: 'Página en español para indian-trail',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Indian Trail"
      description="Esta página necesita ser traducida al español."
    />
  );
}
