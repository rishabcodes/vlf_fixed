import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Affirmative | Vasquez Law Firm',
  description: 'Página en español para affirmative',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Affirmative"
      description="Esta página necesita ser traducida al español."
    />
  );
}
