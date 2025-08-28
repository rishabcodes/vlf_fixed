import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Camden | Vasquez Law Firm',
  description: 'Página en español para camden',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Camden"
      description="Esta página necesita ser traducida al español."
    />
  );
}
