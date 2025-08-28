import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Assault Battery | Vasquez Law Firm',
  description: 'Página en español para assault-battery',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Assault Battery"
      description="Esta página necesita ser traducida al español."
    />
  );
}
