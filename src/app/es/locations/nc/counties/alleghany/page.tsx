import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alleghany | Vasquez Law Firm',
  description: 'Página en español para alleghany',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Alleghany"
      description="Esta página necesita ser traducida al español."
    />
  );
}
