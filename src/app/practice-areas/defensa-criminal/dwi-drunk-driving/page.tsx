import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Dwi Drunk Driving | Vasquez Law Firm',
  description: 'Página en español para dwi-drunk-driving',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Dwi Drunk Driving"
      description="Esta página necesita ser traducida al español."
    />
  );
}
