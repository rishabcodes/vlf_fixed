import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Areas | Vasquez Law Firm',
  description: 'Página en español para practice-areas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Practice Areas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
