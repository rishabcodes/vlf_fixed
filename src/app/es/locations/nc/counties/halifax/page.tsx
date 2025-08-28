import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Halifax | Vasquez Law Firm',
  description: 'Página en español para halifax',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Halifax"
      description="Esta página necesita ser traducida al español."
    />
  );
}
