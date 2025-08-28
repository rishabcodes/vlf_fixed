import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Madison | Vasquez Law Firm',
  description: 'Página en español para madison',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Madison"
      description="Esta página necesita ser traducida al español."
    />
  );
}
