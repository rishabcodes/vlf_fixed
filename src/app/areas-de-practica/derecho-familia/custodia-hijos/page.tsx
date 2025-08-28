import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Custodia de Hijos | Vasquez Law Firm',
  description: 'Representación legal en casos de custodia de menores',
  keywords: 'custodia de hijos, abogado, servicios legales, derecho familia',
};

export default function CustodiadeHijosPage() {
  return (
    <PracticeAreaWrapper practiceArea="derecho-familia" subArea="custodia-hijos" language="es" />
  );
}
