import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mount Airy | Vasquez Law Firm',
  description: 'Página en español para mount-airy',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mount Airy"
      description="Esta página necesita ser traducida al español."
    />
  );
}
