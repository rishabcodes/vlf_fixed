import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charlotte Nc | Vasquez Law Firm',
  description: 'Página en español para charlotte-nc',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Charlotte Nc"
      description="Esta página necesita ser traducida al español."
    />
  );
}
