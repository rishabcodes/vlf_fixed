import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Princeton | Vasquez Law Firm',
  description: 'Página en español para princeton',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Princeton"
      description="Esta página necesita ser traducida al español."
    />
  );
}
