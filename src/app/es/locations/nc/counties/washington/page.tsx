import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Washington | Vasquez Law Firm',
  description: 'Página en español para washington',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Washington"
      description="Esta página necesita ser traducida al español."
    />
  );
}
