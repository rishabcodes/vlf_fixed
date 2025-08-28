import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Morganton | Vasquez Law Firm',
  description: 'Página en español para morganton',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Morganton"
      description="Esta página necesita ser traducida al español."
    />
  );
}
