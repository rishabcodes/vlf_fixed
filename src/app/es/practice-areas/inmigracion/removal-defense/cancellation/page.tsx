import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation | Vasquez Law Firm',
  description: 'Página en español para cancellation',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cancellation"
      description="Esta página necesita ser traducida al español."
    />
  );
}
