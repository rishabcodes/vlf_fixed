import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Columbus | Vasquez Law Firm',
  description: 'Página en español para columbus',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Columbus"
      description="Esta página necesita ser traducida al español."
    />
  );
}
