import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yadkin | Vasquez Law Firm',
  description: 'Página en español para yadkin',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Yadkin"
      description="Esta página necesita ser traducida al español."
    />
  );
}
