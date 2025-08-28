import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hickory | Vasquez Law Firm',
  description: 'Página en español para hickory',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Hickory"
      description="Esta página necesita ser traducida al español."
    />
  );
}
