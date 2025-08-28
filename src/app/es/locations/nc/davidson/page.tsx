import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Davidson | Vasquez Law Firm',
  description: 'Página en español para davidson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Davidson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
