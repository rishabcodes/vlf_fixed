import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attorneys | Vasquez Law Firm',
  description: 'Página en español para attorneys',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Attorneys"
      description="Esta página necesita ser traducida al español."
    />
  );
}
