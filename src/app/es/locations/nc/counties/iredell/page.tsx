import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iredell | Vasquez Law Firm',
  description: 'Página en español para iredell',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Iredell"
      description="Esta página necesita ser traducida al español."
    />
  );
}
