import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warrenton | Vasquez Law Firm',
  description: 'Página en español para warrenton',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Warrenton"
      description="Esta página necesita ser traducida al español."
    />
  );
}
