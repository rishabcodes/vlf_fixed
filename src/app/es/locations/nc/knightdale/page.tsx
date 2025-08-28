import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knightdale | Vasquez Law Firm',
  description: 'Página en español para knightdale',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Knightdale"
      description="Esta página necesita ser traducida al español."
    />
  );
}
