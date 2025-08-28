import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Asilo | Refugio Legal NC FL | Vasquez Law Firm',
  description: 'Abogados expertos en asilo y refugio. Protección para perseguidos. Casos afirmativos y defensivos. 919-569-5882',
  keywords: 'abogado asilo, asylum lawyer español, refugio legal, persecucion politica, persecucion religiosa, asilo afirmativo, asilo defensivo, asilo Raleigh, asilo Charlotte, asilo Orlando',
  openGraph: {
    title: 'Abogado de Asilo y Refugio | Protección Legal | Vasquez Law',
    description: 'Ayudamos a personas perseguidas obtener asilo en Estados Unidos. Experiencia en casos complejos.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function AsiloPage() {
  const services = [
    {
      title: 'Asilo Afirmativo',
      description: 'Con USCIS',
      icon: '🏛️',
      features: [
        'Aplicación I-589',
        'Entrevista con oficial',
        'Sin corte inicial',
        'Dentro del año',
        'Evidencia de persecución',
        'Declaraciones detalladas',
      ],
    },
    {
      title: 'Asilo Defensivo',
      description: 'En corte de inmigración',
      icon: '⚖️',
      features: [
        'Durante deportación',
        'Ante juez de inmigración',
        'Audiencias múltiples',
        'Testimonio en corte',
        'Examen cruzado',
        'Apelaciones posibles',
      ],
    },
    {
      title: 'Tipos de Persecución',
      description: 'Bases protegidas',
      icon: '🛡️',
      features: [
        'Raza o etnia',
        'Religión',
        'Nacionalidad',
        'Opinión política',
        'Grupo social particular',
        'Tortura pasada',
      ],
    },
    {
      title: 'Evidencia Crucial',
      description: 'Documentación necesaria',
      icon: '📄',
      features: [
        'Amenazas documentadas',
        'Reportes policiales',
        'Records médicos',
        'Artículos de país',
        'Testigos expertos',
        'Testimonios corroborantes',
      ],
    },
    {
      title: 'Beneficios de Asilo',
      description: 'Después de aprobación',
      icon: '✅',
      features: [
        'Permiso de trabajo',
        'Traer familia',
        'Green card en 1 año',
        'Ciudadanía en 5 años',
        'Documento de viaje',
        'Beneficios públicos',
      ],
    },
    {
      title: 'Casos Especiales',
      description: 'Situaciones únicas',
      icon: '⭐',
      features: [
        'Menores no acompañados',
        'Víctimas de tráfico',
        'Violencia de género',
        'Persecución LGBTQ+',
        'Objetores de conciencia',
        'Testigos protegidos',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo tengo para aplicar para asilo?',
      answer: 'Debe aplicar dentro de UN AÑO de su última entrada a USA. Excepciones: circunstancias extraordinarias (enfermedad seria, menor de edad, cambios en país), cambios en circunstancias (nuevo gobierno, nuevas leyes persecutorias, cambio en su situación personal). SIN la fecha límite de un año, puede calificar para: Withholding of Removal (estándar más alto), Protección bajo Convención Contra Tortura. CRÍTICO: documente razón del retraso. Cada día cuenta.',
    },
    {
      question: '¿Qué es persecución y cómo la pruebo?',
      answer: 'Persecución = daño serio o amenaza por característica protegida. Incluye: violencia física, amenazas de muerte, tortura, detención arbitraria, violación/abuso sexual, negación de empleo/educación severa. NO es suficiente: discriminación general, problemas económicos, violencia criminal común. Debe probar: persecución pasada O miedo bien fundado futuro, por gobierno O grupos que gobierno no puede/quiere controlar, nexo con característica protegida. Evidencia clave: su testimonio creíble + documentación de apoyo.',
    },
    {
      question: '¿Puedo trabajar mientras espero decisión de asilo?',
      answer: 'Sí, pero debe esperar. Elegible para permiso de trabajo 150 días después de presentar I-589 completo. Puede aplicar (I-765) en día 150, recibe EAD aproximadamente 30 días después. Total: aproximadamente 6 meses de espera. EAD inicial gratis con asilo pendiente. Renovaciones cada 2 años mientras caso pendiente. Si gana asilo, automáticamente autorizado a trabajar (no necesita EAD pero puede obtenerlo). Reloj de asilo puede parar por demoras que usted causa.',
    },
    {
      question: '¿Mi familia puede obtener asilo conmigo?',
      answer: 'Esposo/a e hijos solteros menores de 21 años pueden incluirse si: están en USA, los incluye en I-589, mantienen relación al momento de decisión. Si familia está fuera de USA: después de ganar asilo, puede pedir I-730 (sin costo), debe presentar dentro de 2 años de asilo aprobado, familia viene como asilados derivados. Padres/hermanos NO califican como derivados, pero puede peticionar después de obtener green card/ciudadanía. Hijos pueden "envejecer" - presente rápido.',
    },
    {
      question: '¿Qué pasa si me niegan el asilo?',
      answer: 'Depende del tipo: ASILO AFIRMATIVO negado: referido a corte de inmigración, nueva oportunidad ante juez, puede presentar evidencia adicional, proceso defensivo completo. ASILO DEFENSIVO negado: puede apelar a BIA (30 días), luego Corte de Apelaciones, posible withholding/CAT, posible moción de reapertura. Sin estatus legal: puede ser ordenada deportación. Opciones: salida voluntaria, otras formas de alivio, quedarse y apelar (riesgo de detención). Consulte abogado INMEDIATAMENTE.',
    },
    {
      question: '¿Puedo viajar a mi país si tengo asilo?',
      answer: 'NO regrese a país de persecución - puede perder asilo permanentemente. Se considera que no teme persecución si regresa voluntariamente. Para viajar a OTROS países: necesita Documento de Viaje de Refugiado (I-131), válido por 1 año, aplicar 60-90 días antes de viaje, algunos países no lo aceptan. Excepciones extremadamente limitadas para regresar (muerte de familiar inmediato + evidencia de seguridad). Incluso visita breve puede resultar en terminación de asilo en futuro.',
    },
  ];

  const content = {
    introduction: `El asilo ofrece protección vital para personas que no pueden regresar a sus países debido a persecución por su raza, religión, nacionalidad, opinión política o pertenencia a grupo social particular. Estados Unidos tiene obligación legal y moral de proteger a refugiados. Vasquez Law Firm ha representado exitosamente a cientos de solicitantes de asilo de todo el mundo. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden el trauma de la persecución y la importancia de su caso. Preparamos aplicaciones meticulosas, lo preparamos para testimonio, y luchamos incansablemente por su protección. Su seguridad es nuestra prioridad.`,

    processTitle: 'Proceso de Asilo',
    process: [
      {
        step: '1',
        title: 'Evaluación',
        description: 'Analizar elegibilidad y evidencia',
      },
      {
        step: '2',
        title: 'I-589',
        description: 'Preparar aplicación detallada',
      },
      {
        step: '3',
        title: 'Biométricos',
        description: 'Huellas y verificación',
      },
      {
        step: '4',
        title: 'Entrevista/Audiencia',
        description: 'Presentar caso',
      },
      {
        step: '5',
        title: 'Decisión',
        description: 'Aprobación o apelación',
      },
    ],

    urgencyTitle: '⏰ Fecha Límite de Un Año - Actúe Ahora',
    urgencyMessage: 'Debe aplicar dentro de un año de entrada. Retrasos pueden descalificarlo. Evidencia desaparece. Situación en país puede cambiar.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Asilo',
    whyChoosePoints: [
      'Cientos de casos de asilo ganados',
      'Experiencia con persecución compleja',
      'Red de expertos en países',
      'Preparación exhaustiva de testimonio',
      'Representación en corte agresiva',
      'Totalmente bilingüe y culturalmente sensible',
      'Apoyo psicológico disponible',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Elementos Clave para Ganar Asilo</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Credibilidad</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Testimonio consistente</li>
              <li>✓ Detalles específicos</li>
              <li>✓ Documentación de apoyo</li>
              <li>✓ Sin contradicciones</li>
              <li>✓ Comportamiento apropiado</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Evidencia del País</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Reportes de derechos humanos</li>
              <li>✓ Artículos de noticias</li>
              <li>✓ Informes del Departamento de Estado</li>
              <li>✓ Testimonios de expertos</li>
              <li>✓ Documentación de incidentes similares</li>
            </ul>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Nexo Protegido</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Conexión clara con motivo</li>
              <li>✓ No solo violencia criminal</li>
              <li>✓ Grupo social definido</li>
              <li>✓ Opinión política impuesta</li>
              <li>✓ Perseguidor motivado por característica</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Diferencias Entre Protecciones</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Tipo</th>
                <th className="py-3 px-4">Estándar</th>
                <th className="py-3 px-4">Beneficios</th>
                <th className="py-3 px-4">Limitaciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Asilo</td>
                <td className="py-3 px-4">Miedo bien fundado (10%)</td>
                <td className="py-3 px-4">Green card, ciudadanía, familia</td>
                <td className="py-3 px-4">1 año límite</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Withholding</td>
                <td className="py-3 px-4">Más probable que no (51%)</td>
                <td className="py-3 px-4">No deportación, trabajo</td>
                <td className="py-3 px-4">No green card, no familia</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">CAT</td>
                <td className="py-3 px-4">Más probable tortura</td>
                <td className="py-3 px-4">No deportación</td>
                <td className="py-3 px-4">Muy limitado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Asilo"
      subtitle="Protección Legal para Perseguidos"
      description="Representación experta en casos de asilo y refugio para quienes huyen de persecución."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
