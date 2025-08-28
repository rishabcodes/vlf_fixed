import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinehurst | Vasquez Law Firm',
  description: 'Página en español para pinehurst',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pinehurst"
      description="Esta página necesita ser traducida al español."
    />
  );
}
