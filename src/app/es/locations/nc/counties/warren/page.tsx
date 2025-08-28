import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warren | Vasquez Law Firm',
  description: 'Página en español para warren',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Warren"
      description="Esta página necesita ser traducida al español."
    />
  );
}
