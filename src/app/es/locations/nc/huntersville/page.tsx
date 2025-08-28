import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Huntersville | Vasquez Law Firm',
  description: 'Página en español para huntersville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Huntersville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
