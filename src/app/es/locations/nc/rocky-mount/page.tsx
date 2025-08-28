import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rocky Mount | Vasquez Law Firm',
  description: 'Página en español para rocky-mount',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Rocky Mount"
      description="Esta página necesita ser traducida al español."
    />
  );
}
