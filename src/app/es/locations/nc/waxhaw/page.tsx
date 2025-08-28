import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Waxhaw | Vasquez Law Firm',
  description: 'Página en español para waxhaw',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Waxhaw"
      description="Esta página necesita ser traducida al español."
    />
  );
}
