import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oxford | Vasquez Law Firm',
  description: 'Página en español para oxford',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Oxford"
      description="Esta página necesita ser traducida al español."
    />
  );
}
