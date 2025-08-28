import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rockingham | Vasquez Law Firm',
  description: 'Página en español para rockingham',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Rockingham"
      description="Esta página necesita ser traducida al español."
    />
  );
}
