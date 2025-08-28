import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transylvania | Vasquez Law Firm',
  description: 'Página en español para transylvania',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Transylvania"
      description="Esta página necesita ser traducida al español."
    />
  );
}
