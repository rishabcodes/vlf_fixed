import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kinston | Vasquez Law Firm',
  description: 'Página en español para kinston',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Kinston"
      description="Esta página necesita ser traducida al español."
    />
  );
}
