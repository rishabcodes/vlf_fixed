import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wake Forest | Vasquez Law Firm',
  description: 'Página en español para wake-forest',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wake Forest"
      description="Esta página necesita ser traducida al español."
    />
  );
}
