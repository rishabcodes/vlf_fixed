import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Attorney | Vasquez Law Firm',
  description: 'Página en español para criminal-defense-attorney',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Criminal Defense Attorney"
      description="Esta página necesita ser traducida al español."
    />
  );
}
