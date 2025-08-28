import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Third Party Injury Claims | Vasquez Law Firm',
  description: 'Página en español para third-party-injury-claims',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Third Party Injury Claims"
      description="Esta página necesita ser traducida al español."
    />
  );
}
