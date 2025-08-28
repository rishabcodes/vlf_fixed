import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wilkes | Vasquez Law Firm',
  description: 'Página en español para wilkes',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wilkes"
      description="Esta página necesita ser traducida al español."
    />
  );
}
