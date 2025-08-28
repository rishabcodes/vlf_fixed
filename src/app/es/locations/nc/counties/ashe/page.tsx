import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ashe | Vasquez Law Firm',
  description: 'Página en español para ashe',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Ashe"
      description="Esta página necesita ser traducida al español."
    />
  );
}
