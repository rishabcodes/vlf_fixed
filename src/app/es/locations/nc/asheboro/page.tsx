import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asheboro | Vasquez Law Firm',
  description: 'Página en español para asheboro',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Asheboro"
      description="Esta página necesita ser traducida al español."
    />
  );
}
