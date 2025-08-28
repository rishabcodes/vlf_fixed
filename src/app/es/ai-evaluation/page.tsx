import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ai Evaluation | Vasquez Law Firm',
  description: 'Página en español para ai-evaluation',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Ai Evaluation"
      description="Esta página necesita ser traducida al español."
    />
  );
}
