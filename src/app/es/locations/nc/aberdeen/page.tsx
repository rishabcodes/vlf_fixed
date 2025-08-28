import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aberdeen | Vasquez Law Firm',
  description: 'Página en español para aberdeen',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Aberdeen"
      description="Esta página necesita ser traducida al español."
    />
  );
}
