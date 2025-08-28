import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chapel Hill | Vasquez Law Firm',
  description: 'Página en español para chapel-hill',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Chapel Hill"
      description="Esta página necesita ser traducida al español."
    />
  );
}
