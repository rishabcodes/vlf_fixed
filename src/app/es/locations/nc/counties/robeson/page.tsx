import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robeson | Vasquez Law Firm',
  description: 'Página en español para robeson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Robeson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
