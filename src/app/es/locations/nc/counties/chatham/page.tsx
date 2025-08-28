import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chatham | Vasquez Law Firm',
  description: 'Página en español para chatham',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Chatham"
      description="Esta página necesita ser traducida al español."
    />
  );
}
