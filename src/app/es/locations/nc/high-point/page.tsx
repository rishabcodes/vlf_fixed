import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High Point | Vasquez Law Firm',
  description: 'Página en español para high-point',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="High Point"
      description="Esta página necesita ser traducida al español."
    />
  );
}
