import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haywood | Vasquez Law Firm',
  description: 'Página en español para haywood',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Haywood"
      description="Esta página necesita ser traducida al español."
    />
  );
}
