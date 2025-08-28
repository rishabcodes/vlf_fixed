import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vasquez Law Firm',
  description: 'Página en español para privacy-policy',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Privacy Policy"
      description="Esta página necesita ser traducida al español."
    />
  );
}
