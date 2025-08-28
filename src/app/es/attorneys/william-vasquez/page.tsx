import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'William Vasquez | Vasquez Law Firm',
  description: 'Página en español para william-vasquez',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="William Vasquez"
      description="Esta página necesita ser traducida al español."
    />
  );
}
