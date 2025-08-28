import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Detention Bond Hearings | Vasquez Law Firm',
  description: 'Página en español para detention-bond-hearings',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Detention Bond Hearings"
      description="Esta página necesita ser traducida al español."
    />
  );
}
