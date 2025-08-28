import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuquay Varina | Vasquez Law Firm',
  description: 'Página en español para fuquay-varina',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Fuquay Varina"
      description="Esta página necesita ser traducida al español."
    />
  );
}
