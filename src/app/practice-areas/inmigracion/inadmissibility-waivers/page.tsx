import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Inadmissibility Waivers | Vasquez Law Firm',
  description: 'Página en español para inadmissibility-waivers',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Inadmissibility Waivers"
      description="Esta página necesita ser traducida al español."
    />
  );
}
