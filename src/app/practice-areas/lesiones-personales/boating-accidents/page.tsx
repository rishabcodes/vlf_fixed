import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Boating Accidents | Vasquez Law Firm',
  description: 'Página en español para boating-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Boating Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
