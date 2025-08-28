import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Vasquez Law Firm',
  description: 'Página en español para about',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="About"
      description="Esta página necesita ser traducida al español."
    />
  );
}
