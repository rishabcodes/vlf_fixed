import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Construction Site Injuries | Vasquez Law Firm',
  description: 'Página en español para construction-site-injuries',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Construction Site Injuries"
      description="Esta página necesita ser traducida al español."
    />
  );
}
