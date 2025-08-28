import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Expungement Expunction | Vasquez Law Firm',
  description: 'Página en español para expungement-expunction',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Expungement Expunction"
      description="Esta página necesita ser traducida al español."
    />
  );
}
