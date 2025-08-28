import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Downtown | Vasquez Law Firm',
  description: 'Página en español para downtown',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Downtown"
      description="Esta página necesita ser traducida al español."
    />
  );
}
