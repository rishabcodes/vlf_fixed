import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rowan | Vasquez Law Firm',
  description: 'Página en español para rowan',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Rowan"
      description="Esta página necesita ser traducida al español."
    />
  );
}
