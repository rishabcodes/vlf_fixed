import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clayton | Vasquez Law Firm',
  description: 'Página en español para clayton',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Clayton"
      description="Esta página necesita ser traducida al español."
    />
  );
}
