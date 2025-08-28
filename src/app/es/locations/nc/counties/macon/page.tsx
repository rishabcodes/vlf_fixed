import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Macon | Vasquez Law Firm',
  description: 'Página en español para macon',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Macon"
      description="Esta página necesita ser traducida al español."
    />
  );
}
