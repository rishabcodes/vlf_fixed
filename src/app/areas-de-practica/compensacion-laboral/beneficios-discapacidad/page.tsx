import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Beneficios por Discapacidad | Vasquez Law Firm',
  description: 'Asegurar beneficios por discapacidad por lesiones laborales',
  keywords: 'beneficios por discapacidad, abogado, servicios legales, compensacion laboral',
};

export default function BeneficiosporDiscapacidadPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="compensacion-laboral"
      subArea="beneficios-discapacidad"
      language="es"
    />
  );
}
