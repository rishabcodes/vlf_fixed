import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Belmont | Vasquez Law Firm',
  description: 'Página en español para belmont',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Belmont"
      description="Esta página necesita ser traducida al español."
    />
  );
}
