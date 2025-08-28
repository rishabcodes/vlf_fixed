import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '_downloads | Vasquez Law Firm',
  description: 'Página en español para _downloads',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="_downloads"
      description="Esta página necesita ser traducida al español."
    />
  );
}
