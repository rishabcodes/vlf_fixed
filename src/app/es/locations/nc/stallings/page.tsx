import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stallings | Vasquez Law Firm',
  description: 'Página en español para stallings',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Stallings"
      description="Esta página necesita ser traducida al español."
    />
  );
}
