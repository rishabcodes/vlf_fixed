import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moore | Vasquez Law Firm',
  description: 'Página en español para moore',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Moore"
      description="Esta página necesita ser traducida al español."
    />
  );
}
