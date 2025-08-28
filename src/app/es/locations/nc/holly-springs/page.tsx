import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Holly Springs | Vasquez Law Firm',
  description: 'Página en español para holly-springs',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Holly Springs"
      description="Esta página necesita ser traducida al español."
    />
  );
}
