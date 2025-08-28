import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pine Level | Vasquez Law Firm',
  description: 'Página en español para pine-level',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pine Level"
      description="Esta página necesita ser traducida al español."
    />
  );
}
