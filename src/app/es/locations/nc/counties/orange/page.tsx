import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orange | Vasquez Law Firm',
  description: 'Página en español para orange',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Orange"
      description="Esta página necesita ser traducida al español."
    />
  );
}
