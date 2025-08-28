import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rebecca Sommer | Vasquez Law Firm',
  description: 'Página en español para rebecca-sommer',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Rebecca Sommer"
      description="Esta página necesita ser traducida al español."
    />
  );
}
