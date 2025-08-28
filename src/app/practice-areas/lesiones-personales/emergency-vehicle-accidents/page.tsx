import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Emergency Vehicle Accidents | Vasquez Law Firm',
  description: 'Página en español para emergency-vehicle-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Emergency Vehicle Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
