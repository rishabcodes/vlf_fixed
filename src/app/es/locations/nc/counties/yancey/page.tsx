import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yancey | Vasquez Law Firm',
  description: 'Página en español para yancey',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Yancey"
      description="Esta página necesita ser traducida al español."
    />
  );
}
