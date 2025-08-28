import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Contact | Vasquez Law Firm',
  description: 'Página en español para quick-contact',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Quick Contact"
      description="Esta página necesita ser traducida al español."
    />
  );
}
