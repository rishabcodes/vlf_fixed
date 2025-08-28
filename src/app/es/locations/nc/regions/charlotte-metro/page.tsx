import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charlotte Metro | Vasquez Law Firm',
  description: 'Página en español para charlotte-metro',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Charlotte Metro"
      description="Esta página necesita ser traducida al español."
    />
  );
}
