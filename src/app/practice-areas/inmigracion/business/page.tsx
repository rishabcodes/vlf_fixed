import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Business | Vasquez Law Firm',
  description: 'Página en español para business',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Business"
      description="Esta página necesita ser traducida al español."
    />
  );
}
