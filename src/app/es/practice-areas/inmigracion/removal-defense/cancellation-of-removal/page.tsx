import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation Of Removal | Vasquez Law Firm',
  description: 'Página en español para cancellation-of-removal',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cancellation Of Removal"
      description="Esta página necesita ser traducida al español."
    />
  );
}
