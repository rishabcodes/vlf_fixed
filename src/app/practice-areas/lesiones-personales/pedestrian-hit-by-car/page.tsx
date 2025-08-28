import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Pedestrian Hit By Car | Vasquez Law Firm',
  description: 'Página en español para pedestrian-hit-by-car',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pedestrian Hit By Car"
      description="Esta página necesita ser traducida al español."
    />
  );
}
