import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Truck Accidents | Vasquez Law Firm',
  description: 'Página en español para truck-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Truck Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
