import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Triad | Vasquez Law Firm',
  description: 'Página en español para triad',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Triad"
      description="Esta página necesita ser traducida al español."
    />
  );
}
