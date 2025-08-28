import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clay | Vasquez Law Firm',
  description: 'Página en español para clay',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Clay"
      description="Esta página necesita ser traducida al español."
    />
  );
}
