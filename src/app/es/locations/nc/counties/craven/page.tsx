import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Craven | Vasquez Law Firm',
  description: 'Página en español para craven',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Craven"
      description="Esta página necesita ser traducida al español."
    />
  );
}
