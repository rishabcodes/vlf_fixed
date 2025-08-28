import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[Slug] | Vasquez Law Firm',
  description: 'Página en español para [slug]',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="[Slug]"
      description="Esta página necesita ser traducida al español."
    />
  );
}
