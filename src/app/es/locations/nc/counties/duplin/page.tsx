import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Duplin | Vasquez Law Firm',
  description: 'Página en español para duplin',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Duplin"
      description="Esta página necesita ser traducida al español."
    />
  );
}
