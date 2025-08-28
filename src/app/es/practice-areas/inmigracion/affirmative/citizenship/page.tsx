import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Citizenship | Vasquez Law Firm',
  description: 'Página en español para citizenship',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Citizenship"
      description="Esta página necesita ser traducida al español."
    />
  );
}
