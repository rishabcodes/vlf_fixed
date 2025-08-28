import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Violaciones CDL | Vasquez Law Firm',
  description: 'Defensa para violaciones de licencia de conducir comercial',
  keywords: 'violaciones cdl, abogado, servicios legales, infracciones transito',
};

export default function ViolacionesCDLPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="violaciones-cdl"
      language="es"
    />
  );
}
