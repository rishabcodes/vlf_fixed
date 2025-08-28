import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Removal Defense | Vasquez Law Firm',
  description: 'Página en español para removal-defense',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Removal Defense"
      description="Esta página necesita ser traducida al español."
    />
  );
}
