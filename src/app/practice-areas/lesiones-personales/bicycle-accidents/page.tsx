import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Bicycle Accidents | Vasquez Law Firm',
  description: 'Página en español para bicycle-accidents',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Bicycle Accidents"
      description="Esta página necesita ser traducida al español."
    />
  );
}
