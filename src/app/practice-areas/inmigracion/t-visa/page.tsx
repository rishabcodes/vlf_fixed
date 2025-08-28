import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Visa T | Víctimas Tráfico Humano NC FL | Vasquez Law Firm',
  description: 'Protección para víctimas de tráfico humano. Visa T, estatus legal, camino a residencia. 919-569-5882',
  keywords: 'visa T, trafico humano, victimas trafico, trabajo forzado, explotacion sexual, visa T certificacion, abogado visa T Raleigh, trafico humano Charlotte, visa T Orlando',
  openGraph: {
    title: 'Abogado Visa T | Protección Víctimas Tráfico | Vasquez Law',
    description: 'Ayudamos víctimas de tráfico humano obtener protección y estatus legal con Visa T.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function TVisaPage() {
  const services = [
    {
      title: 'Tráfico Laboral',
      description: 'Trabajo forzado',
      icon: '⛓️',
      features: [
        'Servidumbre por deuda',
        'Trabajo involuntario',
        'Esclavitud moderna',
        'Amenazas deportación',
        'Retención documentos',
        'Condiciones inhumanas',
      ],
    },
    {
      title: 'Tráfico Sexual',
      description: 'Explotación sexual',
      icon: '🚫',
      features: [
        'Prostitución forzada',
        'Pornografía forzada',
        'Turismo sexual',
        'Menores explotados',
        'Fraude romántico',
        'Coerción sexual',
      ],
    },
    {
      title: 'Requisitos Visa T',
      description: 'Elegibilidad',
      icon: '✅',
      features: [
        'Víctima de tráfico severo',
        'Presente en USA por tráfico',
        'Cooperar con policía',
        'Sufrimiento extremo si removido',
        'Admisible o perdón',
        'Menor de 18 excepción',
      ],
    },
    {
      title: 'Beneficios',
      description: 'Protecciones disponibles',
      icon: '🛡️',
      features: [
        'Estatus legal 4 años',
        'Permiso de trabajo',
        'Green card en 3 años',
        'Beneficios federales',
        'Reunificación familiar',
        'Protección deportación',
      ],
    },
    {
      title: 'Evidencia Clave',
      description: 'Documentación',
      icon: '📄',
      features: [
        'Declaración personal detallada',
        'Certificación LEA (opcional)',
        'Records policiales',
        'Evidencia médica/psicológica',
        'Testigos del tráfico',
        'Documentos de control',
      ],
    },
    {
      title: 'Familia',
      description: 'Derivados incluidos',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Esposo/a',
        'Hijos menores 21',
        'Padres si menor 21',
        'Hermanos menores 18',
        'En peligro por escape',
        'Pueden estar fuera USA',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué es tráfico humano severo para Visa T?',
      answer: 'Tráfico severo incluye: (A) Tráfico sexual - reclutamiento, albergue, transporte, provisión u obtención de persona para acto sexual comercial por fuerza, fraude o coerción, O víctima menor de 18 años. (B) Tráfico laboral - reclutamiento, albergue, transporte, provisión u obtención de persona para trabajo/servicios por fuerza, fraude o coerción para servidumbre involuntaria, peonaje, servidumbre por deuda o esclavitud. Fuerza/fraude/coerción incluye: violencia física, amenazas, abuso legal, retención documentos, manipulación psicológica.',
    },
    {
      question: '¿Necesito certificación policial para Visa T?',
      answer: 'NO es obligatoria pero ayuda mucho. Certificación I-914B de agencia (policía, FBI, DOL, etc.) fortalece caso pero NO requerida. Si menor de 18 años: NO necesita cooperar con policía. Si trauma severo impide cooperación: puede calificar sin cooperación. Alternativas a certificación: evidencia secundaria de ser víctima (declaración detallada, records médicos, testigos, documentos de control). Si policía niega certificación, aún puede aplicar. Importante: debe estar dispuesto a cooperar si contactan en futuro.',
    },
    {
      question: '¿Cuánto tiempo toma obtener Visa T?',
      answer: 'Procesamiento actual: 18-24 meses para decisión inicial. Beneficios mientras espera: elegible para asistencia inmediata de organizaciones (vivienda, comida, médico), carta de elegibilidad para beneficios. Después de aprobación: 4 años de estatus T, permiso de trabajo inmediato, después de 3 años puede aplicar green card (si continúa cooperando o completó investigación). Total para residencia: 4-6 años. Familia derivada puede tomar más tiempo si están fuera de USA.',
    },
    {
      question: '¿Qué pasa si participé en actividades ilegales por el tráfico?',
      answer: 'Protección para actos forzados: si cometió crímenes como resultado directo del tráfico (prostitución, documentos falsos, entrada ilegal, trabajo sin permiso), generalmente NO descalifica. Perdón disponible (I-192) para inadmisibilidades relacionadas al tráfico. Debe mostrar: actividad fue resultado de ser víctima, no voluntario. Excepciones: crímenes muy graves no relacionados pueden ser problema. Sea HONESTO con abogado sobre todo - podemos preparar estrategia. Fiscales pueden dar inmunidad por testimonio.',
    },
    {
      question: '¿Mi familia en peligro puede venir a USA?',
      answer: 'SÍ, protección familiar amplia. Puede pedir: esposo/a e hijos menores 21, si menor de 21 también padres y hermanos solteros menores 18. Si familia enfrenta peligro por su escape/cooperación: evidencia de amenazas fortalece caso. Proceso: file I-914A para cada familiar, pueden estar dentro o fuera USA, si fuera reciben visa T derivada. Tiempo: generalmente 12-18 meses adicionales. Beneficios familiares: mismo estatus T, permiso trabajo, camino a green card.',
    },
    {
      question: '¿Qué recursos hay para víctimas de tráfico?',
      answer: 'Ayuda inmediata disponible: National Human Trafficking Hotline 1-888-373-7888 (24/7, 200+ idiomas). Beneficios pre-certificación: algunas organizaciones proveen vivienda, comida, médico, legal sin esperar visa. Certificación HHS: da acceso a beneficios federales como refugiado. Servicios incluyen: vivienda de emergencia, atención médica/mental, entrenamiento laboral, educación, reunificación familiar. En NC/FL: organizaciones especializadas, Coalition Against Human Trafficking. Todo CONFIDENCIAL y GRATIS para víctimas.',
    },
  ];

  const content = {
    introduction: `Las víctimas de tráfico humano - moderna esclavitud - merecen libertad y justicia. La Visa T ofrece protección poderosa para quienes escaparon trabajo forzado o explotación sexual. Vasquez Law Firm comprende el trauma profundo del tráfico y la valentía necesaria para escapar y denunciar. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando han ayudado víctimas de todos los continentes reconstruir sus vidas en libertad. Manejamos cada caso con máxima confidencialidad, compasión y urgencia. No está solo/a - la ley protege a víctimas valientes y nosotros lucharemos para que obtenga la seguridad y dignidad que merece.`,

    processTitle: 'Proceso Visa T',
    process: [
      {
        step: '1',
        title: 'Rescate/Escape',
        description: 'Llegar a seguridad',
      },
      {
        step: '2',
        title: 'Evaluación',
        description: 'Determinar elegibilidad',
      },
      {
        step: '3',
        title: 'I-918 Aplicación',
        description: 'Evidencia comprehensiva',
      },
      {
        step: '4',
        title: 'Aprobación',
        description: 'Estatus T por 4 años',
      },
      {
        step: '5',
        title: 'Green Card',
        description: 'Residencia permanente',
      },
    ],

    urgencyTitle: '🆘 Escape del Tráfico - Protección Disponible',
    urgencyMessage: 'Traficantes usan miedo como control. Ayuda está disponible ahora. Protección legal existe. No está solo/a.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Visa T',
    whyChoosePoints: [
      'Experiencia específica en casos de tráfico',
      'Red de organizaciones anti-tráfico',
      'Manejo trauma-informado',
      'Acceso a recursos inmediatos',
      'Coordinación con fuerzas del orden',
      'Máxima confidencialidad y seguridad',
      'Sin costo inicial para víctimas',
      'Oficinas seguras en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Indicadores de Tráfico Humano</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">Señales de Control</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ No controla sus documentos</li>
              <li>✓ No puede salir libremente</li>
              <li>✓ Deuda que no puede pagar</li>
              <li>✓ Amenazas a familia</li>
              <li>✓ Aislamiento social extremo</li>
              <li>✓ Vigilancia constante</li>
              <li>✓ Castigos por desobediencia</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Métodos de Coerción</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Violencia física o sexual</li>
              <li>✓ Amenazas de deportación</li>
              <li>✓ Manipulación psicológica</li>
              <li>✓ Servidumbre por deuda</li>
              <li>✓ Confiscación de ganancias</li>
              <li>✓ Restricción de movimiento</li>
              <li>✓ Condiciones degradantes</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Diferencias Entre Visa T y Visa U</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Aspecto</th>
                <th className="py-3 px-4">Visa T</th>
                <th className="py-3 px-4">Visa U</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Para víctimas de</td>
                <td className="py-3 px-4">Tráfico humano severo</td>
                <td className="py-3 px-4">Crímenes calificados</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Cap anual</td>
                <td className="py-3 px-4">5,000 visas</td>
                <td className="py-3 px-4">10,000 visas</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Certificación requerida</td>
                <td className="py-3 px-4">No (pero ayuda)</td>
                <td className="py-3 px-4">Sí, obligatoria</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Duración inicial</td>
                <td className="py-3 px-4">4 años</td>
                <td className="py-3 px-4">4 años</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Green card</td>
                <td className="py-3 px-4">Después 3 años</td>
                <td className="py-3 px-4">Después 3 años</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Beneficios federales</td>
                <td className="py-3 px-4">Sí, como refugiado</td>
                <td className="py-3 px-4">Limitados</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Recursos de Emergencia para Víctimas</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Ayuda Disponible 24/7</h3>
          <div className="space-y-3">
            <p className="text-gray-300">
              <strong className="text-blue-400">National Human Trafficking Hotline:</strong><br/>
              📞 1-888-373-7888 | 💬 Texto: 233733<br/>
              <span className="text-sm">Disponible 24/7 en 200+ idiomas - Completamente confidencial</span>
            </p>
            <p className="text-gray-300">
              <strong className="text-green-400">Polaris Project BeFree Textline:</strong><br/>
              💬 Texto "HELP" al 233733 (BEFREE)
            </p>
            <p className="text-gray-300">
              <strong className="text-purple-400">FBI Tip Line:</strong><br/>
              📞 1-800-CALL-FBI | 🌐 tips.fbi.gov
            </p>
            <p className="text-gray-300">
              <strong className="text-yellow-400">Servicios Locales NC/FL:</strong><br/>
              Pregunte por lista confidencial de refugios y organizaciones
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado Visa T"
      subtitle="Libertad y Protección para Víctimas de Tráfico Humano"
      description="Ayudamos víctimas de tráfico humano obtener seguridad, estatus legal y nueva vida en libertad."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
