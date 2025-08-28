import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanford | Vasquez Law Firm',
  description: 'Página en español para sanford',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Sanford"
      description="Esta página necesita ser traducida al español."
    />
  );
}
