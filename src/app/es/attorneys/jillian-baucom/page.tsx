import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jillian Baucom | Vasquez Law Firm',
  description: 'Página en español para jillian-baucom',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Jillian Baucom"
      description="Esta página necesita ser traducida al español."
    />
  );
}
