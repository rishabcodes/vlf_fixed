import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newton | Vasquez Law Firm',
  description: 'Página en español para newton',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Newton"
      description="Esta página necesita ser traducida al español."
    />
  );
}
