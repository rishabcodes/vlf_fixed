import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forsyth | Vasquez Law Firm',
  description: 'Página en español para forsyth',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Forsyth"
      description="Esta página necesita ser traducida al español."
    />
  );
}
