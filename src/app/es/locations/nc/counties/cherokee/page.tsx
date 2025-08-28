import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cherokee | Vasquez Law Firm',
  description: 'Página en español para cherokee',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cherokee"
      description="Esta página necesita ser traducida al español."
    />
  );
}
