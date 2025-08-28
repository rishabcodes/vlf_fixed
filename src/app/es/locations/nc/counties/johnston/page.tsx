import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Johnston | Vasquez Law Firm',
  description: 'Página en español para johnston',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Johnston"
      description="Esta página necesita ser traducida al español."
    />
  );
}
