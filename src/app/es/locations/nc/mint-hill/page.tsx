import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mint Hill | Vasquez Law Firm',
  description: 'Página en español para mint-hill',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mint Hill"
      description="Esta página necesita ser traducida al español."
    />
  );
}
