import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Family Preference Visas | Vasquez Law Firm',
  description: 'Página en español para family-preference-visas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Family Preference Visas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
