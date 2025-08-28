import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Vasquez Law Firm',
  description: 'Página en español para cookie-policy',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Cookie Policy"
      description="Esta página necesita ser traducida al español."
    />
  );
}
