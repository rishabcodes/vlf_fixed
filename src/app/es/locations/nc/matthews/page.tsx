import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Matthews | Vasquez Law Firm',
  description: 'Página en español para matthews',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Matthews"
      description="Esta página necesita ser traducida al español."
    />
  );
}
