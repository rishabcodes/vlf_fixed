import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Lawyer | Vasquez Law Firm',
  description: 'Página en español para immigration-lawyer',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Immigration Lawyer"
      description="Esta página necesita ser traducida al español."
    />
  );
}
