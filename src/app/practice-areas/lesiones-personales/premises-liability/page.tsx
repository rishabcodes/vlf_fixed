import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Premises Liability | Vasquez Law Firm',
  description: 'Página en español para premises-liability',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Premises Liability"
      description="Esta página necesita ser traducida al español."
    />
  );
}
