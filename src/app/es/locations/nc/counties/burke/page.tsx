import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burke | Vasquez Law Firm',
  description: 'Página en español para burke',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Burke"
      description="Esta página necesita ser traducida al español."
    />
  );
}
