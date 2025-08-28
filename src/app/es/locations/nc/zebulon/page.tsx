import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zebulon | Vasquez Law Firm',
  description: 'Página en español para zebulon',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Zebulon"
      description="Esta página necesita ser traducida al español."
    />
  );
}
