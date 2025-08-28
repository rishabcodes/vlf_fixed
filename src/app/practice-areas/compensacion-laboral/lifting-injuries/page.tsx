import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Lifting Injuries | Vasquez Law Firm',
  description: 'Página en español para lifting-injuries',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Lifting Injuries"
      description="Esta página necesita ser traducida al español."
    />
  );
}
