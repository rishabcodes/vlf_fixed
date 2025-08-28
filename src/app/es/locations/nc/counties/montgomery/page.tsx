import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Montgomery | Vasquez Law Firm',
  description: 'Página en español para montgomery',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Montgomery"
      description="Esta página necesita ser traducida al español."
    />
  );
}
