import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perquimans | Vasquez Law Firm',
  description: 'Página en español para perquimans',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Perquimans"
      description="Esta página necesita ser traducida al español."
    />
  );
}
