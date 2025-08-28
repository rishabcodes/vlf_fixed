import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Repetitive Stress Carpal Tunnel | Vasquez Law Firm',
  description: 'Página en español para repetitive-stress-carpal-tunnel',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Repetitive Stress Carpal Tunnel"
      description="Esta página necesita ser traducida al español."
    />
  );
}
