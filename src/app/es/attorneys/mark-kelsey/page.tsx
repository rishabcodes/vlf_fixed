import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mark Kelsey | Vasquez Law Firm',
  description: 'Página en español para mark-kelsey',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mark Kelsey"
      description="Esta página necesita ser traducida al español."
    />
  );
}
