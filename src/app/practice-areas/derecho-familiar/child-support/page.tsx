import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Child Support | Vasquez Law Firm',
  description: 'Página en español para child-support',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Child Support"
      description="Esta página necesita ser traducida al español."
    />
  );
}
