import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burlington | Vasquez Law Firm',
  description: 'Página en español para burlington',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Burlington"
      description="Esta página necesita ser traducida al español."
    />
  );
}
