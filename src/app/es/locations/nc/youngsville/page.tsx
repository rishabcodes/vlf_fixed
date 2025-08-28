import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youngsville | Vasquez Law Firm',
  description: 'Página en español para youngsville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Youngsville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
