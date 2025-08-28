import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watauga | Vasquez Law Firm',
  description: 'Página en español para watauga',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Watauga"
      description="Esta página necesita ser traducida al español."
    />
  );
}
