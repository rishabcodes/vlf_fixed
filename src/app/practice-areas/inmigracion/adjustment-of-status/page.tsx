import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Ajuste de Estatus | Green Card NC FL | Vasquez Law Firm',
  description: 'Abogados expertos en ajuste de estatus I-485. Obtenga su green card sin salir de USA. Consulta gratis. 919-569-5882',
  keywords: 'ajuste de estatus, I-485, green card sin salir, abogado ajuste estatus, residencia permanente, cambio de estatus, ajuste estatus Raleigh, green card Charlotte, ajuste estatus Orlando',
  openGraph: {
    title: 'Abogado de Ajuste de Estatus | Green Card sin Salir | Vasquez Law',
    description: 'Conviértase en residente permanente sin salir de Estados Unidos. Expertos en I-485.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function AjusteEstatusPage() {
  const services = [
    {
      title: 'Elegibilidad I-485',
      description: 'Requisitos para ajustar',
      icon: '✅',
      features: [
        'Entrada legal a USA',
        'Visa disponible inmediatamente',
        'Petición aprobada (I-130/I-140)',
        'Presencia física en USA',
        'Elegible para inmigrar',
        'Sin barras permanentes',
      ],
    },
    {
      title: 'Proceso Completo',
      description: 'Todos los formularios',
      icon: '📋',
      features: [
        'I-485 aplicación principal',
        'I-765 permiso de trabajo',
        'I-131 permiso de viaje',
        'I-693 examen médico',
        'I-864 declaración de sostenimiento',
        'Documentos de soporte',
      ],
    },
    {
      title: 'Casos Familiares',
      description: 'Peticiones de familia',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Esposos de ciudadanos',
        'Hijos de ciudadanos',
        'Padres de ciudadanos',
        'Hermanos de ciudadanos',
        'Familiares de residentes',
        'Ajuste derivado',
      ],
    },
    {
      title: 'Casos de Empleo',
      description: 'Basado en trabajo',
      icon: '💼',
      features: [
        'EB-1 habilidad extraordinaria',
        'EB-2 grado avanzado',
        'EB-3 trabajadores calificados',
        'Transferencias L-1',
        'Ajuste después de H-1B',
        'National Interest Waiver',
      ],
    },
    {
      title: 'Complicaciones',
      description: 'Casos difíciles',
      icon: '⚠️',
      features: [
        'Entrada sin inspección',
        'Presencia ilegal acumulada',
        'Violaciones de estatus',
        'Antecedentes criminales',
        'Negaciones previas',
        'Perdones necesarios',
      ],
    },
    {
      title: 'Entrevista USCIS',
      description: 'Preparación completa',
      icon: '🎯',
      features: [
        'Documentos requeridos',
        'Preguntas comunes',
        'Preparación de testimonio',
        'Interpretación disponible',
        'Acompañamiento legal',
        'Respuesta a RFE',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Puedo ajustar estatus si entré ilegalmente?',
      answer: 'Generalmente NO, con excepciones importantes: (1) Esposos/hijos/padres de ciudadanos con petición 245(i) presentada antes del 30/04/2001, (2) Beneficiarios de asilo o refugio, (3) Visa U/T/VAWA aprobada, (4) Cubanos bajo Ley de Ajuste Cubano, (5) TPS con advance parole y reentrada. La mayoría que entró sin inspección debe hacer proceso consular con perdón I-601A. Consulte para evaluar excepciones específicas a su caso.',
    },
    {
      question: '¿Cuánto tiempo toma el ajuste de estatus en 2025?',
      answer: 'Tiempos actuales varían significativamente: Casos familiares inmediatos (esposos/hijos/padres de ciudadanos): 8-14 meses. Casos de empleo: 8-24 meses dependiendo de categoría. Con entrevista requerida: agregar 4-8 meses. Oficinas de USCIS en NC y FL tienen diferentes tiempos. Permiso de trabajo llega en 3-6 meses. Permiso de viaje similar. Puede verificar tiempos específicos en sitio de USCIS con su número de recibo.',
    },
    {
      question: '¿Puedo trabajar y viajar mientras espero?',
      answer: 'SÍ, con documentos apropiados: Trabajo - File I-765 con I-485 para permiso de trabajo (EAD). Llega en 3-6 meses. Válido por 2 años, renovable. Viaje - File I-131 para Advance Parole. CUIDADO: No viajar sin advance parole o abandona aplicación. Algunas personas no deben viajar (presencia ilegal, órdenes previas). Consulte antes de viajar. Combo card incluye trabajo y viaje en un documento.',
    },
    {
      question: '¿Qué pasa si me niegan el ajuste de estatus?',
      answer: 'Depende de la razón de negación: Si en estatus legal - puede permanecer y apelar o re-aplicar. Sin estatus - puede ser puesto en proceso de deportación. Opciones: (1) Moción para reconsiderar/reabrir con USCIS, (2) Apelación al AAO si disponible, (3) Nueva aplicación si corrige problema, (4) Proceso consular como alternativa, (5) Otras formas de alivio en corte. Actúe rápido - algunos recursos tienen plazos de 30-33 días.',
    },
    {
      question: '¿Necesito examen médico para ajuste de estatus?',
      answer: 'SÍ, formulario I-693 obligatorio. Debe ser con doctor civil autorizado por USCIS (no cualquier doctor). Incluye: examen físico, vacunas requeridas, pruebas de tuberculosis, pruebas de sífilis/gonorrea. Costo típico $200-$500 (no cubierto por seguro). Válido 2 años desde firma del doctor. Puede presentar con I-485 o llevar a entrevista. Ciertas condiciones médicas pueden requerir perdón.',
    },
    {
      question: '¿Mi familia puede ajustar conmigo?',
      answer: 'Depende de su categoría: Familiares inmediatos de ciudadanos - deben tener su propia petición. Categorías de preferencia familiar - derivados incluidos. Casos de empleo - esposo e hijos menores de 21 incluidos como derivados. Asilo/Refugio - esposo/hijos pueden ajustar después. IMPORTANTE: Hijos pueden "envejecer" (cumplir 21) y perder elegibilidad. CSPA puede proteger edad en algunos casos. Matrimonios durante proceso pueden complicar.',
    },
  ];

  const content = {
    introduction: `El ajuste de estatus es el proceso para obtener la residencia permanente (green card) sin salir de Estados Unidos. Este camino crucial hacia la residencia permite mantener su vida, trabajo y familia mientras espera. Vasquez Law Firm tiene décadas de experiencia navegando las complejidades del formulario I-485 y requisitos asociados. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden que cada día cuenta cuando está construyendo su futuro americano. Desde casos familiares simples hasta situaciones complejas con perdones, maximizamos sus posibilidades de aprobación mientras mantiene su vida normal.`,

    processTitle: 'Proceso de Ajuste de Estatus',
    process: [
      {
        step: '1',
        title: 'Evaluación',
        description: 'Confirmar elegibilidad',
      },
      {
        step: '2',
        title: 'Preparación',
        description: 'Reunir documentos completos',
      },
      {
        step: '3',
        title: 'Presentación',
        description: 'I-485 y formularios relacionados',
      },
      {
        step: '4',
        title: 'Biométricos',
        description: 'Huellas y fotos',
      },
      {
        step: '5',
        title: 'Entrevista',
        description: 'Aprobación final',
      },
    ],

    urgencyTitle: '⏰ Las Visas Tienen Límites - Actúe Ahora',
    urgencyMessage: 'Retrocesos en boletín de visas pueden retrasar años. Cambios de estatus afectan elegibilidad. Hijos pueden perder beneficios al cumplir 21.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Su Ajuste',
    whyChoosePoints: [
      'Miles de ajustes aprobados exitosamente',
      'Experiencia con casos complejos y perdones',
      'Preparación meticulosa evita RFEs',
      'Respuesta rápida a solicitudes de USCIS',
      'Acompañamiento en entrevistas',
      'Totalmente bilingüe - español e inglés',
      'Seguimiento de fechas prioritarias',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Documentos Necesarios para I-485</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Documentos Básicos</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Pasaporte y I-94</li>
              <li>✓ Acta de nacimiento traducida</li>
              <li>✓ Certificados matrimonio/divorcio</li>
              <li>✓ Fotos tipo pasaporte (8)</li>
              <li>✓ Petición aprobada (I-130/I-140)</li>
              <li>✓ Examen médico I-693</li>
              <li>✓ Declaración sostenimiento I-864</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Evidencia Adicional</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Taxes últimos 3 años</li>
              <li>✓ Cartas de empleo</li>
              <li>✓ Estados de cuenta bancarios</li>
              <li>✓ Títulos de propiedad</li>
              <li>✓ Records criminales (si aplica)</li>
              <li>✓ Evidencia de estatus legal</li>
              <li>✓ Prueba de relación (familiar)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tiempos de Procesamiento 2025</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Tipo de Caso</th>
                <th className="py-3 px-4">Centro de Servicio</th>
                <th className="py-3 px-4">Tiempo Promedio</th>
                <th className="py-3 px-4">Permiso Trabajo</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Familiar Inmediato</td>
                <td className="py-3 px-4">NBC/Local</td>
                <td className="py-3 px-4">8-14 meses</td>
                <td className="py-3 px-4">3-6 meses</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Empleo EB-1/2/3</td>
                <td className="py-3 px-4">Texas/Nebraska</td>
                <td className="py-3 px-4">10-24 meses</td>
                <td className="py-3 px-4">4-7 meses</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Asilo/Refugio</td>
                <td className="py-3 px-4">Nebraska</td>
                <td className="py-3 px-4">6-12 meses</td>
                <td className="py-3 px-4">N/A</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">VAWA</td>
                <td className="py-3 px-4">Vermont</td>
                <td className="py-3 px-4">12-20 meses</td>
                <td className="py-3 px-4">5-8 meses</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Tiempos varían según carga de trabajo y caso específico</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Razones Comunes de Negación</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Evite Estos Problemas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Inadmisibilidad</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Presencia ilegal &gt; 180 días</li>
                <li>• Carga pública probable</li>
                <li>• Antecedentes criminales</li>
                <li>• Fraude/Misrepresentación</li>
                <li>• Violaciones de inmigración previas</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Errores de Aplicación</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Formularios incompletos</li>
                <li>• Falta de evidencia</li>
                <li>• No responder a RFE</li>
                <li>• Información inconsistente</li>
                <li>• Documentos vencidos</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">💡 Un abogado experimentado previene estas negaciones</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Ajuste de Estatus"
      subtitle="Obtenga Su Green Card Sin Salir de Estados Unidos"
      description="Expertos en I-485 ayudándole a convertirse en residente permanente mientras mantiene su vida en USA."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
