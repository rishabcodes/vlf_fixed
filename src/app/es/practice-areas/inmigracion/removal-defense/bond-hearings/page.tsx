import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bond Hearings | Vasquez Law Firm',
  description: 'Página en español para bond-hearings',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Bond Hearings"
      description="Esta página necesita ser traducida al español."
    />
  );
}
