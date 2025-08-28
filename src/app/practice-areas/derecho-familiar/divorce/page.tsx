import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Divorce | Vasquez Law Firm',
  description: 'Página en español para divorce',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Divorce"
      description="Esta página necesita ser traducida al español."
    />
  );
}
