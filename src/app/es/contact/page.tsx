import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Vasquez Law Firm',
  description: 'Página en español para contact',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Contact"
      description="Esta página necesita ser traducida al español."
    />
  );
}
