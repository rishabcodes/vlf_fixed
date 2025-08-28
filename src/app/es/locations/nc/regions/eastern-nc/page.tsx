import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eastern Nc | Vasquez Law Firm',
  description: 'Página en español para eastern-nc',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Eastern Nc"
      description="Esta página necesita ser traducida al español."
    />
  );
}
