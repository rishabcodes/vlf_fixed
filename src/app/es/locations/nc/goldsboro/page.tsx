import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goldsboro | Vasquez Law Firm',
  description: 'Página en español para goldsboro',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Goldsboro"
      description="Esta página necesita ser traducida al español."
    />
  );
}
