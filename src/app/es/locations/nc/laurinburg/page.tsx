import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laurinburg | Vasquez Law Firm',
  description: 'Página en español para laurinburg',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Laurinburg"
      description="Esta página necesita ser traducida al español."
    />
  );
}
