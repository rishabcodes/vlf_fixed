import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Domestic Violence Abuse | Vasquez Law Firm',
  description: 'Página en español para domestic-violence-abuse',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Domestic Violence Abuse"
      description="Esta página necesita ser traducida al español."
    />
  );
}
