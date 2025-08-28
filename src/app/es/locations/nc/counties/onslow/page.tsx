import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onslow | Vasquez Law Firm',
  description: 'Página en español para onslow',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Onslow"
      description="Esta página necesita ser traducida al español."
    />
  );
}
