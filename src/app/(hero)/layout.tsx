import { MasterLayout } from '@/design-system/templates/MasterLayout';

export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      {children}
    </MasterLayout>
  );
}