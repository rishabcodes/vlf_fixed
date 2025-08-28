import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Traffic Offenses Tickets | Vasquez Law Firm',
  description: 'Página en español para traffic-offenses-tickets',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Traffic Offenses Tickets"
      description="Esta página necesita ser traducida al español."
    />
  );
}
