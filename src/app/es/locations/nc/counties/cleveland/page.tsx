import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cleveland | Vasquez Law Firm',
  description: 'Página en español para cleveland',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cleveland"
      description="Esta página necesita ser traducida al español."
    />
  );
}
