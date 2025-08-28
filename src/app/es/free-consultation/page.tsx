import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Consultation | Vasquez Law Firm',
  description: 'Página en español para free-consultation',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Free Consultation"
      description="Esta página necesita ser traducida al español."
    />
  );
}
