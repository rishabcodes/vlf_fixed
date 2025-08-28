import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pineville | Vasquez Law Firm',
  description: 'Página en español para pineville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pineville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
