import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fort Liberty | Vasquez Law Firm',
  description: 'Página en español para fort-liberty',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Fort Liberty"
      description="Esta página necesita ser traducida al español."
    />
  );
}
