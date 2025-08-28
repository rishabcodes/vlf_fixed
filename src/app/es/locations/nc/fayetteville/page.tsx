import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fayetteville | Vasquez Law Firm',
  description: 'Página en español para fayetteville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Fayetteville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
