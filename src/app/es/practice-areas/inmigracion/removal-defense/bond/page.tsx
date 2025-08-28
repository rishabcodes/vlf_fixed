import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bond | Vasquez Law Firm',
  description: 'Página en español para bond',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Bond"
      description="Esta página necesita ser traducida al español."
    />
  );
}
