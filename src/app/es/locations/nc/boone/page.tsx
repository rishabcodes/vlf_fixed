import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boone | Vasquez Law Firm',
  description: 'Página en español para boone',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Boone"
      description="Esta página necesita ser traducida al español."
    />
  );
}
