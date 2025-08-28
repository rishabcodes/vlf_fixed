import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adrianna Ingram | Vasquez Law Firm',
  description: 'Página en español para adrianna-ingram',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Adrianna Ingram"
      description="Esta página necesita ser traducida al español."
    />
  );
}
