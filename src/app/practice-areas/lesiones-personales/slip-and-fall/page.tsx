import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Slip And Fall | Vasquez Law Firm',
  description: 'Página en español para slip-and-fall',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Slip And Fall"
      description="Esta página necesita ser traducida al español."
    />
  );
}
