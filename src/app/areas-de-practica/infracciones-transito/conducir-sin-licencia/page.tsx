import { Metadata } from 'next';
import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';

export const metadata: Metadata = {
  title: 'Conducir sin Licencia | Vasquez Law Firm',
  description: 'Ayuda legal por conducir sin licencia válida',
  keywords: 'conducir sin licencia, abogado, servicios legales, infracciones transito',
};

export default function ConducirsinLicenciaPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="infracciones-transito"
      subArea="conducir-sin-licencia"
      language="es"
    />
  );
}
