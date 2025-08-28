import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asheville | Vasquez Law Firm',
  description: 'Página en español para asheville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Asheville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
