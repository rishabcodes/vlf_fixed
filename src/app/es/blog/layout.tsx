import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blog Legal | Bufete de Abogados Vasquez',
  description:
    'Últimas noticias legales, actualizaciones y consejos de nuestros abogados expertos en inmigración, lesiones personales y más.',
};

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  // Layout components (Header/Footer) are handled by MasterLayout in individual pages
  return <>{children}</>;
}
