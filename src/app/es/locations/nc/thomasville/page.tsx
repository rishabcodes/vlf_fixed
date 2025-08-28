import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thomasville | Vasquez Law Firm',
  description: 'Página en español para thomasville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Thomasville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
