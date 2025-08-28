import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Morrisville | Vasquez Law Firm',
  description: 'Página en español para morrisville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Morrisville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
