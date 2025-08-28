import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Wrongful Death | Vasquez Law Firm',
  description: 'Página en español para wrongful-death',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wrongful Death"
      description="Esta página necesita ser traducida al español."
    />
  );
}
