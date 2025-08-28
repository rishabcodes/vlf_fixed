import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perm Labor Certification | Vasquez Law Firm',
  description: 'Página en español para perm-labor-certification',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Perm Labor Certification"
      description="Esta página necesita ser traducida al español."
    />
  );
}
