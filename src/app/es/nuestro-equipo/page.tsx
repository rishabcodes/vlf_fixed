import { Metadata } from 'next';
import NuestroEquipoPageClient from './NuestroEquipoPageClient';

export const metadata: Metadata = {
  title: 'Nuestro Equipo | Vasquez Law Firm',
  description: 'Conozca al equipo dedicado de Vasquez Law Firm. Nuestro personal bilingüe está comprometido a brindar apoyo legal excepcional a nuestros clientes.',
  keywords: 'equipo legal, personal bufete de abogados, apoyo legal bilingüe, equipo Vasquez Law Firm',
};

export default function NuestroEquipoPage() {
  return <NuestroEquipoPageClient />;
}
