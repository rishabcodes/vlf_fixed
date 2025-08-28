import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado VAWA y Visa U | Víctimas de Crimen NC FL | Vasquez Law Firm',
  description: 'Protección para víctimas de violencia doméstica y crímenes. VAWA, Visa U, estatus legal. 919-569-5882',
  keywords: 'VAWA, visa U, victimas crimen, violencia domestica, abuso, visa U certificacion, VAWA auto peticion, abogado VAWA Raleigh, visa U Charlotte, VAWA Orlando',
  openGraph: {
    title: 'Abogado VAWA y Visa U | Protección para Víctimas | Vasquez Law',
    description: 'Ayudamos víctimas de violencia doméstica y crímenes obtener estatus legal y protección.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function VAWAUVisaPage() {
  const services = [
    {
      title: 'VAWA Auto-Petición',
      description: 'Para víctimas de abuso',
      icon: '💜',
      features: [
        'Esposos abusados USC/LPR',
        'Hijos abusados',
        'Padres de hijo USC abusivo',
        'Sin necesidad del abusador',
        'Proceso confidencial',
        'Green card disponible',
      ],
    },
    {
      title: 'Visa U',
      description: 'Víctimas de crimen',
      icon: '🛡️',
      features: [
        'Víctimas de crimen calificado',
        'Cooperación con policía',
        'Certificación I-918B',
        'Permiso de trabajo',
        'Green card en 3 años',
        'Incluye familia',
      ],
    },
    {
      title: 'Crímenes Calificados',
      description: 'Para Visa U',
      icon: '⚖️',
      features: [
        'Violencia doméstica',
        'Asalto sexual',
        'Tráfico humano',
        'Secuestro',
        'Extorsión',
        'Witness tampering',
      ],
    },
    {
      title: 'Evidencia VAWA',
      description: 'Documentación necesaria',
      icon: '📋',
      features: [
        'Prueba de abuso',
        'Records policiales',
        'Órdenes de protección',
        'Records médicos',
        'Declaraciones de testigos',
        'Evidencia de relación',
      ],
    },
    {
      title: 'Beneficios',
      description: 'Protecciones disponibles',
      icon: '✅',
      features: [
        'Permiso de trabajo',
        'No deportación',
        'Camino a green card',
        'Beneficios públicos',
        'Protección familiar',
        'Confidencialidad total',
      ],
    },
    {
      title: 'Casos Especiales',
      description: 'Situaciones únicas',
      icon: '⭐',
      features: [
        'Víctimas indocumentadas',
        'Con antecedentes criminales',
        'Menores de edad',
        'Tráfico sexual',
        'Violencia de pandillas',
        'Abuso de ancianos',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué es VAWA y quién califica?',
      answer: 'VAWA (Violence Against Women Act) protege víctimas de abuso sin importar género. Califican: esposos/as abusados por ciudadano o residente, hijos abusados por padre USC/LPR, padres abusados por hijo USC adulto. Debe probar: relación calificada, abuso físico O crueldad extrema mental, vivió con abusador, buen carácter moral, matrimonio de buena fe (si aplica). NO necesita ayuda del abusador. Proceso es CONFIDENCIAL - abusador no es notificado. Puede aplicar incluso si divorciado (2 años límite).',
    },
    {
      question: '¿Cómo obtengo certificación para Visa U?',
      answer: 'Certificación I-918B es CRÍTICA - sin ella, no hay Visa U. Debe venir de: policía local/estatal/federal, fiscales, jueces, CPS, EEOC, Dept of Labor, otros. Pasos: (1) Ser víctima de crimen calificado, (2) Tener información útil sobre crimen, (3) Cooperar con investigación/prosecución, (4) Solicitar certificación con evidencia. Agencia tiene discreción - no están obligados. Si niegan: intente otra agencia, espere y reaplique, busque supervisor. Algunos departamentos tienen políticas específicas. Abogado puede ayudar con solicitud.',
    },
    {
      question: '¿Puedo aplicar si tengo antecedentes criminales?',
      answer: 'SÍ es posible pero más complejo. VAWA: ciertos crímenes descalifican (abuso de niños, algunos agravados), pero hay excepciones si conectado al abuso. Visa U: tiene perdón amplio (I-192) para mayoría de inadmisibilidades incluyendo: entrada ilegal, presencia ilegal, deportación previa, ciertos crímenes. Debe mostrar: interés nacional o público, rehabilitación si aplica. Discreción favorable considera: severidad del crimen propio vs sufrido, tiempo transcurrido, evidencia de rehabilitación, necesidad de protección. Consulte abogado - estrategia correcta es crucial.',
    },
    {
      question: '¿Cuánto tiempo toma obtener Visa U?',
      answer: 'Tiempos actuales son MUY largos: 5-6 AÑOS solo para decisión inicial debido a cap de 10,000 visas anuales y 150,000+ pendientes. PERO beneficios vienen antes: Permiso de trabajo (EAD) en 2-3 años para casos bona fide, protección contra deportación inmediata. Después de aprobación: 3 años con Visa U, luego elegible para green card (1-2 años más). Total: 7-10 años para residencia. VAWA generalmente más rápido: 2-3 años para aprobación, green card inmediato si visa disponible.',
    },
    {
      question: '¿Mi familia puede recibir beneficios también?',
      answer: 'SÍ, derivados incluidos. VAWA: hijos solteros menores de 21 automáticamente incluidos en petición. Visa U: puede incluir esposo/a, hijos menores de 21, padres si víctima menor de 21, hermanos menores de 18 si víctima menor de 21. Derivados reciben: mismo estatus que principal, permiso de trabajo, protección deportación, camino a green card. IMPORTANTE: debe incluir en aplicación inicial o antes de aprobar. Si familia en peligro en país, pueden calificar para parole.',
    },
    {
      question: '¿Qué hago si mi abusador amenaza con deportarme?',
      answer: 'NO se deje intimidar - tiene derechos y protección. Pasos inmediatos: (1) Busque seguridad - refugio, familia, amigos, (2) Documente amenazas - grabe, guarde mensajes, testigos, (3) Reporte a policía - obtener reporte es evidencia para VAWA/U, (4) Solicite orden de protección, (5) Contacte abogado de inmigración INMEDIATAMENTE, (6) Aplique para VAWA/U visa lo antes posible. Amenazas migratorias son forma de abuso que fortalece su caso. Recursos: Línea Nacional 1-800-799-7233, refugios locales, organizaciones de víctimas.',
    },
  ];

  const content = {
    introduction: `Las víctimas de violencia doméstica y crímenes graves merecen protección, no deportación. VAWA y la Visa U ofrecen caminos legales hacia seguridad y estatus permanente para víctimas valientes que denuncian abusos. Vasquez Law Firm entiende el trauma, el miedo, y la valentía que requiere buscar ayuda. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando han ayudado a cientos de víctimas escapar del abuso y construir vidas seguras en Estados Unidos. Manejamos su caso con máxima confidencialidad y compasión. No está sola/o - la ley está de su lado y nosotros lucharemos por sus derechos.`,

    processTitle: 'Proceso de Protección',
    process: [
      {
        step: '1',
        title: 'Evaluación Segura',
        description: 'Consulta confidencial',
      },
      {
        step: '2',
        title: 'Documentación',
        description: 'Reunir evidencia de abuso/crimen',
      },
      {
        step: '3',
        title: 'Aplicación',
        description: 'VAWA I-360 o U visa I-918',
      },
      {
        step: '4',
        title: 'Permiso Trabajo',
        description: 'Mientras espera decisión',
      },
      {
        step: '5',
        title: 'Green Card',
        description: 'Residencia permanente',
      },
    ],

    urgencyTitle: '🆘 Su Seguridad No Puede Esperar',
    urgencyMessage: 'Abusadores usan estatus como control. Evidencia desaparece. Límites de tiempo aplican. Protéjase legalmente YA.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para VAWA/Visa U',
    whyChoosePoints: [
      'Cientos de víctimas protegidas exitosamente',
      'Máxima confidencialidad garantizada',
      'Relaciones con agencias certificadoras',
      'Manejo sensitivo del trauma',
      'Red de recursos de apoyo',
      'Sin juicio - solo apoyo y protección',
      'Totalmente bilingüe y culturalmente competente',
      'Oficinas seguras en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Crímenes que Califican para Visa U</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Violencia</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Violencia doméstica</li>
              <li>✓ Asalto agravado</li>
              <li>✓ Homicidio</li>
              <li>✓ Violación</li>
              <li>✓ Incesto</li>
              <li>✓ Tortura</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Explotación</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Tráfico humano</li>
              <li>✓ Trabajo forzado</li>
              <li>✓ Prostitución forzada</li>
              <li>✓ Extorsión</li>
              <li>✓ Fraude en contrato</li>
              <li>✓ Servidumbre</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Otros Crímenes</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Secuestro</li>
              <li>✓ Detención ilegal</li>
              <li>✓ Obstrucción justicia</li>
              <li>✓ Perjurio</li>
              <li>✓ Witness tampering</li>
              <li>✓ Female genital mutilation</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Evidencia Importante para Su Caso</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Documentos Oficiales</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Reportes policiales</li>
                <li>• Órdenes de protección/restricción</li>
                <li>• Records de corte criminal</li>
                <li>• Records médicos de lesiones</li>
                <li>• Records de terapia/consejería</li>
                <li>• Fotos de lesiones o daños</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Evidencia de Apoyo</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Declaraciones de testigos</li>
                <li>• Records de refugio</li>
                <li>• Mensajes amenazantes</li>
                <li>• Records de 911</li>
                <li>• Cartas de organizaciones</li>
                <li>• Diario personal de incidentes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Recursos de Emergencia</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Ayuda Disponible 24/7</h3>
          <ul className="text-gray-300 space-y-2">
            <li>📞 <strong>Línea Nacional Violencia Doméstica:</strong> 1-800-799-7233</li>
            <li>💬 <strong>Texto:</strong> Envíe LOVEIS al 22522</li>
            <li>🏥 <strong>Emergencia Médica:</strong> 911</li>
            <li>🏠 <strong>Refugios locales:</strong> Pregúntenos por lista confidencial</li>
            <li>👮 <strong>Policía:</strong> 911 o número no-emergencia local</li>
            <li>⚖️ <strong>Asistencia Legal Gratis:</strong> Legal Aid NC/FL</li>
          </ul>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado VAWA y Visa U"
      subtitle="Protección Legal para Víctimas de Violencia y Crimen"
      description="Ayudamos víctimas obtener seguridad y estatus legal a través de VAWA y Visa U."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
