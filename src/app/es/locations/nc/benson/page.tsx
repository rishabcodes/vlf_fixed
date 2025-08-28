import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Benson | Vasquez Law Firm',
  description: 'Página en español para benson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Benson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
