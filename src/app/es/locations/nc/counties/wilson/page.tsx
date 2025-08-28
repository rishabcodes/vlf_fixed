import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wilson | Vasquez Law Firm',
  description: 'Página en español para wilson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wilson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
