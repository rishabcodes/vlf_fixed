import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mount Holly | Vasquez Law Firm',
  description: 'Página en español para mount-holly',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mount Holly"
      description="Esta página necesita ser traducida al español."
    />
  );
}
