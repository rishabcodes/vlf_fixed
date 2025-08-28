import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mitchell | Vasquez Law Firm',
  description: 'Página en español para mitchell',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mitchell"
      description="Esta página necesita ser traducida al español."
    />
  );
}
