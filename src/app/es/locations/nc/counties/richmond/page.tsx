import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Richmond | Vasquez Law Firm',
  description: 'Página en español para richmond',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Richmond"
      description="Esta página necesita ser traducida al español."
    />
  );
}
