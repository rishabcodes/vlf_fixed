import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lumberton | Vasquez Law Firm',
  description: 'Página en español para lumberton',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Lumberton"
      description="Esta página necesita ser traducida al español."
    />
  );
}
