import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swain | Vasquez Law Firm',
  description: 'Página en español para swain',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Swain"
      description="Esta página necesita ser traducida al español."
    />
  );
}
