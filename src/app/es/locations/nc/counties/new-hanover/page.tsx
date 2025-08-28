import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Hanover | Vasquez Law Firm',
  description: 'Página en español para new-hanover',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="New Hanover"
      description="Esta página necesita ser traducida al español."
    />
  );
}
