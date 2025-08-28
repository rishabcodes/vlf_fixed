import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Adopción | Vasquez Law Firm',
  description: 'Asistencia legal con procedimientos de adopción',
  keywords: 'adopción, abogado, servicios legales, derecho familia',
};

export default function AdopcinPage() {
  return <PracticeAreaWrapper practiceArea="derecho-familia" subArea="adopcion" language="es" />;
}
