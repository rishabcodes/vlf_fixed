import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Triangle | Vasquez Law Firm',
  description: 'Página en español para triangle',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Triangle"
      description="Esta página necesita ser traducida al español."
    />
  );
}
