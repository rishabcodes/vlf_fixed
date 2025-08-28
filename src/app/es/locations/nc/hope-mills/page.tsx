import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hope Mills | Vasquez Law Firm',
  description: 'Página en español para hope-mills',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Hope Mills"
      description="Esta página necesita ser traducida al español."
    />
  );
}
