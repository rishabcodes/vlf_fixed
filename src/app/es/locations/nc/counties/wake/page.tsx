import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wake | Vasquez Law Firm',
  description: 'Página en español para wake',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wake"
      description="Esta página necesita ser traducida al español."
    />
  );
}
