import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wendell | Vasquez Law Firm',
  description: 'Página en español para wendell',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wendell"
      description="Esta página necesita ser traducida al español."
    />
  );
}
