import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vasquez Law Firm | Abogados en Carolina del Norte',
  description: 'Representación legal experimentada en Carolina del Norte. Inmigración, Lesiones Personales, Derecho Familiar y Defensa Criminal.',
};

export default function SpanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="es">
      {children}
    </div>
  );
}
