import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Alimony Spousal Support | Vasquez Law Firm',
  description: 'Página en español para alimony-spousal-support',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Alimony Spousal Support"
      description="Esta página necesita ser traducida al español."
    />
  );
}
