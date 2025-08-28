import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Northampton | Vasquez Law Firm',
  description: 'Página en español para northampton',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Northampton"
      description="Esta página necesita ser traducida al español."
    />
  );
}
