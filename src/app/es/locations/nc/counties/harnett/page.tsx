import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harnett | Vasquez Law Firm',
  description: 'Página en español para harnett',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Harnett"
      description="Esta página necesita ser traducida al español."
    />
  );
}
