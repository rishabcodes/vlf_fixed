import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Uninsured Motorist | Vasquez Law Firm',
  description: 'Página en español para uninsured-motorist',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Uninsured Motorist"
      description="Esta página necesita ser traducida al español."
    />
  );
}
