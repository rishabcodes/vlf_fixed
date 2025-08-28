import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Motorcycle Accidents | Vasquez Law Firm',
  description: 'Página en español para motorcycle-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Motorcycle Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
