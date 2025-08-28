import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roxboro | Vasquez Law Firm',
  description: 'Página en español para roxboro',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Roxboro"
      description="Esta página necesita ser traducida al español."
    />
  );
}
