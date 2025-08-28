import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jackson | Vasquez Law Firm',
  description: 'Página en español para jackson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Jackson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
