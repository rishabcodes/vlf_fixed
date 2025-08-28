import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Greenville | Vasquez Law Firm',
  description: 'Página en español para greenville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Greenville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
