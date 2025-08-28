import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Western Nc | Vasquez Law Firm',
  description: 'Página en español para western-nc',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Western Nc"
      description="Esta página necesita ser traducida al español."
    />
  );
}
