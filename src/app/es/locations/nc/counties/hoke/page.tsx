import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hoke | Vasquez Law Firm',
  description: 'Página en español para hoke',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Hoke"
      description="Esta página necesita ser traducida al español."
    />
  );
}
