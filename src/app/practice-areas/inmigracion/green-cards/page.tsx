import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Green Card | Residencia Permanente NC FL | Vasquez Law Firm',
  description: 'Obtenga su green card. Peticiones familiares, empleo, lotería de visas. Expertos en residencia. 919-569-5882',
  keywords: 'green card, tarjeta verde, residencia permanente, peticion familiar, green card matrimonio, green card empleo, loteria visas, green card Raleigh, residencia Charlotte, green card Orlando',
  openGraph: {
    title: 'Abogado de Green Card | Residencia Permanente | Vasquez Law',
    description: 'Expertos obteniendo green cards por familia, empleo, asilo y más. Consulta gratis.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function GreenCardsPage() {
  const services = [
    {
      title: 'Por Familia',
      description: 'Peticiones familiares',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Esposos de ciudadanos',
        'Hijos y padres USC',
        'Hermanos de ciudadanos',
        'Familiares de residentes',
        'Proceso consular',
        'Ajuste de estatus',
      ],
    },
    {
      title: 'Por Empleo',
      description: 'Basado en trabajo',
      icon: '💼',
      features: [
        'EB-1 extraordinaria',
        'EB-2 grado avanzado',
        'EB-3 trabajadores',
        'EB-5 inversión',
        'PERM certificación',
        'NIW interés nacional',
      ],
    },
    {
      title: 'Casos Especiales',
      description: 'Otras categorías',
      icon: '⭐',
      features: [
        'Asilo (1 año después)',
        'VAWA auto-petición',
        'U visa (3 años)',
        'T visa víctimas',
        'Juveniles especiales',
        'Lotería de diversidad',
      ],
    },
    {
      title: 'Renovación',
      description: 'Mantener estatus',
      icon: '🔄',
      features: [
        'Renovar green card',
        'Reemplazar perdida',
        'Remover condiciones',
        'Re-entry permits',
        'Evidencia de estatus',
        'Corrección errores',
      ],
    },
    {
      title: 'Problemas Comunes',
      description: 'Complicaciones',
      icon: '⚠️',
      features: [
        'Inadmisibilidad',
        'Carga pública',
        'Presencia ilegal',
        'Antecedentes criminales',
        'Fraude previo',
        'Perdones I-601/601A',
      ],
    },
    {
      title: 'Proceso Consular',
      description: 'Desde el exterior',
      icon: '🌍',
      features: [
        'DS-260 aplicación',
        'Entrevista consular',
        'Documentos civiles',
        'Examen médico',
        'Affidavit support',
        'Visa de inmigrante',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo toma obtener green card por matrimonio?',
      answer: 'Esposos de CIUDADANOS: 8-14 meses si ajuste en USA, 12-18 meses proceso consular. Esposos de RESIDENTES: 2-3 años esperando visa disponible, luego 8-14 meses procesamiento. Green card condicional si casado menos de 2 años al aprobar (debe remover condiciones después). Factores que afectan: país de origen, complejidad del caso, evidencia de matrimonio real, antecedentes. CRÍTICO: matrimonio debe ser real, no por papeles - USCIS investiga profundamente.',
    },
    {
      question: '¿Puedo trabajar mientras espero green card?',
      answer: 'DEPENDE del tipo de caso: Ajuste de estatus (I-485): puede aplicar para permiso de trabajo (I-765) con aplicación, llega en 3-6 meses. Proceso consular: NO puede trabajar hasta entrar con visa de inmigrante. Algunos con visa actual (H-1B, L-1, etc.) pueden continuar trabajando. VAWA/U/T: elegible para permiso de trabajo. IMPORTANTE: trabajar sin autorización puede descalificar para green card. Siempre verifique elegibilidad antes de trabajar.',
    },
    {
      question: '¿Qué es carga pública y cómo me afecta?',
      answer: 'Carga pública = probabilidad de depender del gobierno para subsistencia. Factores considerados: edad, salud, ingresos, educación, habilidades, sponsor financiero. Beneficios que CUENTAN: cash welfare (TANF), SSI, Medicaid largo plazo, vivienda pública. NO cuentan: WIC, CHIP niños, emergencias Medicaid, food stamps (con excepciones), COVID ayuda. Sponsor (I-864) debe ganar 125% sobre línea de pobreza. Si no suficiente, necesita co-sponsor. Nueva regla 2025 más estricta.',
    },
    {
      question: '¿Pierdo green card si salgo de USA mucho tiempo?',
      answer: 'Riesgo de abandono si: fuera 6+ meses sin re-entry permit, fuera 1+ año definitivamente problema, no mantiene lazos con USA (casa, trabajo, taxes, familia). Para protegerse: viajes menos de 6 meses idealmente, solicite re-entry permit ANTES de salir si 6+ meses, mantenga dirección USA, file taxes, evidencia de lazos. Si fuera 1+ año sin permit: puede necesitar visa SB-1 returning resident o empezar de nuevo. Ciudadanía elimina este problema permanentemente.',
    },
    {
      question: '¿Puedo peticionar a mis padres si soy ciudadano?',
      answer: 'SÍ, padres son "parientes inmediatos" - no hay espera de visa. Requisitos: usted debe ser ciudadano (no residente), tener 21+ años, probar relación padre/hijo con acta nacimiento. Proceso: 8-14 meses si ajuste en USA, 12-18 meses consular. PERO padres deben ser admisibles: si entraron ilegalmente, generalmente proceso consular con perdón I-601A. Si overstay pero entrada legal, pueden ajustar. Cada padre necesita petición separada. Padrastros califican si matrimonio antes de sus 18 años.',
    },
    {
      question: '¿Qué pasa si me niegan la green card?',
      answer: 'Opciones dependen de razón: Si en estatus legal: puede quedarse y apelar, re-aplicar corrigiendo problema, buscar otra categoría. Sin estatus: puede ser puesto en deportación, donde puede renovar aplicación ante juez. Apelaciones: moción de reconsideración/reapertura con USCIS (30 días), AAO para algunos casos, corte federal si violación legal. Razones comunes negación: inadmisibilidad, matrimonio no genuino, falta de documentos, sponsor insuficiente, fraude/misrepresentación. Consulte abogado inmediatamente - tiempo límites estrictos.',
    },
  ];

  const content = {
    introduction: `La green card (residencia permanente) es el sueño de millones - vivir y trabajar permanentemente en Estados Unidos con camino a ciudadanía. Pero el proceso es complejo con múltiples caminos, requisitos estrictos, y trampas costosas. Vasquez Law Firm ha obtenido miles de green cards para clientes por más de 25 años. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando conocen cada categoría, cada requisito, cada forma de acelerar el proceso. Ya sea por familia, trabajo, asilo o categorías especiales, maximizamos sus posibilidades de aprobación. Su residencia permanente es nuestro objetivo.`,

    processTitle: 'Proceso de Green Card',
    process: [
      {
        step: '1',
        title: 'Petición',
        description: 'I-130, I-140, o auto-petición',
      },
      {
        step: '2',
        title: 'Visa Disponible',
        description: 'Inmediata o esperar fecha',
      },
      {
        step: '3',
        title: 'Aplicación',
        description: 'I-485 o DS-260 consular',
      },
      {
        step: '4',
        title: 'Biométricos',
        description: 'Huellas y verificación',
      },
      {
        step: '5',
        title: 'Entrevista',
        description: 'Aprobación final',
      },
    ],

    urgencyTitle: '⏰ Fechas de Prioridad Cambian - Actúe Ya',
    urgencyMessage: 'Visas pueden retroceder. Leyes cambian frecuentemente. Edad de hijos afecta elegibilidad. Cada mes cuenta.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Green Card',
    whyChoosePoints: [
      'Miles de green cards aprobadas exitosamente',
      'Expertos en todas las categorías',
      'Manejo de casos complejos y perdones',
      'Seguimiento de boletín de visas',
      'Preparación meticulosa evita retrasos',
      'Totalmente bilingüe español-inglés',
      'Red de médicos civiles autorizados',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tiempos de Espera Actuales 2025</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Categoría</th>
                <th className="py-3 px-4">Relación</th>
                <th className="py-3 px-4">Espera</th>
                <th className="py-3 px-4">Procesamiento</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Inmediata</td>
                <td className="py-3 px-4">Esposo/hijo/padre USC</td>
                <td className="py-3 px-4">Sin espera</td>
                <td className="py-3 px-4">8-14 meses</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">F1</td>
                <td className="py-3 px-4">Hijo soltero de USC</td>
                <td className="py-3 px-4">7-8 años</td>
                <td className="py-3 px-4">8-14 meses</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">F2A</td>
                <td className="py-3 px-4">Esposo/hijo de LPR</td>
                <td className="py-3 px-4">2-3 años</td>
                <td className="py-3 px-4">8-14 meses</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">F3</td>
                <td className="py-3 px-4">Hijo casado de USC</td>
                <td className="py-3 px-4">12-13 años</td>
                <td className="py-3 px-4">8-14 meses</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">F4</td>
                <td className="py-3 px-4">Hermano de USC</td>
                <td className="py-3 px-4">13-24 años</td>
                <td className="py-3 px-4">8-14 meses</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Tiempos varían por país. México, Filipinas, India, China tienen esperas más largas</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Documentos Esenciales</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Para Petición</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Prueba de estatus peticionario</li>
              <li>✓ Actas de nacimiento</li>
              <li>✓ Certificados matrimonio/divorcio</li>
              <li>✓ Evidencia de relación genuina</li>
              <li>✓ Fotos juntos, comunicaciones</li>
              <li>✓ Cuentas conjuntas si matrimonio</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Para Aplicación</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ I-693 examen médico</li>
              <li>✓ I-864 affidavit de soporte</li>
              <li>✓ Taxes últimos 3 años</li>
              <li>✓ Carta de empleo actual</li>
              <li>✓ Antecedentes penales</li>
              <li>✓ Pasaporte y I-94</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Green Card"
      subtitle="Su Camino a la Residencia Permanente"
      description="Expertos obteniendo green cards por todas las categorías disponibles."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
