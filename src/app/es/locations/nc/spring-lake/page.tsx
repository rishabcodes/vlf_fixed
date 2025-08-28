import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spring Lake | Vasquez Law Firm',
  description: 'Página en español para spring-lake',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Spring Lake"
      description="Esta página necesita ser traducida al español."
    />
  );
}
