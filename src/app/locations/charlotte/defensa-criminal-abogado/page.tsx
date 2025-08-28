import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer | Vasquez Law Firm',
  description: 'Página en español para criminal-defense-lawyer',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Criminal Defense Lawyer"
      description="Esta página necesita ser traducida al español."
    />
  );
}
