import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smithfield | Vasquez Law Firm',
  description: 'Página en español para smithfield',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Smithfield"
      description="Esta página necesita ser traducida al español."
    />
  );
}
