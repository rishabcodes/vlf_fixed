import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Equipment Accidents | Vasquez Law Firm',
  description: 'Página en español para equipment-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Equipment Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
