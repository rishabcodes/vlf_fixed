import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Inmigración | Raleigh Charlotte Orlando | Vasquez Law Firm',
  description: 'Abogados de inmigración expertos en NC y FL. Defensa de deportación, tarjetas verdes, visas, ciudadanía, DACA. Consulta gratis 919-569-5882',
  keywords: 'abogado de inmigración, abogado inmigracion cerca de mi, abogado de inmigracion Raleigh, abogado inmigracion Charlotte, abogado inmigracion Orlando, defensa deportacion, tarjeta verde, visa trabajo, ciudadania americana, DACA renovacion',
  openGraph: {
    title: 'Abogado de Inmigración | Defensa y Visas | Vasquez Law Firm',
    description: 'Representación experta en todos los casos de inmigración. Defensa contra deportación, peticiones familiares, visas de trabajo.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function InmigracionPage() {
  const services = [
    {
      title: 'Defensa de Deportación',
      description: 'Protección en corte migratoria',
      icon: '⚖️',
      features: [
        'Cancelación de deportación',
        'Asilo político y refugio',
        'Fianzas migratorias',
        'Apelaciones al BIA',
        'Mociones para reabrir',
        'Salida voluntaria',
      ],
    },
    {
      title: 'Peticiones Familiares',
      description: 'Reunificación familiar legal',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Peticiones I-130',
        'Ajuste de estatus',
        'Proceso consular',
        'Perdones I-601/I-601A',
        'Visas de prometido K-1',
        'VAWA auto-peticiones',
      ],
    },
    {
      title: 'Visas de Trabajo',
      description: 'Autorización de empleo',
      icon: '💼',
      features: [
        'Visas H-1B profesionales',
        'Visas L-1 transferencias',
        'Certificación laboral PERM',
        'Visas O-1 habilidades extraordinarias',
        'Visas E-2 inversionistas',
        'TN para mexicanos/canadienses',
      ],
    },
    {
      title: 'Ciudadanía y Naturalización',
      description: 'Convertirse en ciudadano americano',
      icon: '🇺🇸',
      features: [
        'Aplicación N-400',
        'Preparación para examen',
        'Excepciones médicas',
        'Certificados de ciudadanía',
        'Doble nacionalidad',
        'Apelaciones de negación',
      ],
    },
    {
      title: 'DACA y Dreamers',
      description: 'Protección para jóvenes',
      icon: '🎓',
      features: [
        'Renovaciones DACA',
        'Aplicaciones iniciales',
        'Permisos de viaje',
        'Advance Parole',
        'Ajuste después de entrada legal',
        'Opciones permanentes',
      ],
    },
    {
      title: 'Casos Especiales',
      description: 'Situaciones únicas',
      icon: '🌟',
      features: [
        'Víctimas de crimen (Visa U)',
        'Víctimas de tráfico (Visa T)',
        'Menores no acompañados',
        'TPS estatus temporal',
        'Parole humanitario',
        'Casos de detención',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto cuesta contratar un abogado de inmigración?',
      answer: 'Los honorarios varían según la complejidad del caso. Ofrecemos consultas iniciales gratuitas para evaluar su situación y proporcionar un presupuesto claro. Aceptamos planes de pago para hacer nuestros servicios accesibles. Las tarifas gubernamentales de USCIS se aplican por separado y varían según el tipo de aplicación. Invertir en representación legal adecuada puede evitar errores costosos y retrasos que podrían resultar en negaciones o deportación.',
    },
    {
      question: '¿Puedo arreglar papeles si entré ilegalmente?',
      answer: 'Depende de su situación específica. Opciones posibles incluyen: matrimonio con ciudadano americano más perdón I-601A, asilo si califica por persecución, cancelación de deportación con 10 años de presencia, visa U si fue víctima de crimen, VAWA si sufrió abuso doméstico, TPS si su país califica. Cada caso es único - una consulta determinará sus opciones específicas.',
    },
    {
      question: '¿Cuánto tiempo toma obtener la tarjeta verde?',
      answer: 'Los tiempos varían significativamente: Esposos de ciudadanos: 8-14 meses actualmente. Hijos solteros de ciudadanos: 8-10 años. Hermanos de ciudadanos: 15-24 años. Trabajadores con patrocinio: 1-3 años con PERM. Ajuste con DACA: inmediato si elegible. Proceso consular puede agregar 6-12 meses. Verificamos los boletines de visa mensualmente para actualizaciones.',
    },
    {
      question: '¿Qué hago si ICE llega a mi casa o trabajo?',
      answer: 'Conozca sus derechos: No abra la puerta sin orden judicial firmada por juez. Permanezca en silencio - no responda preguntas. No firme ningún documento sin abogado. No mienta ni presente documentos falsos. Pida hablar con un abogado inmediatamente. Grabe el encuentro si es posible. Tenga un plan familiar de emergencia. Guarde nuestro número para emergencias: 919-569-5882.',
    },
    {
      question: '¿Puedo viajar mientras espero mi caso de inmigración?',
      answer: 'Depende de su estatus: Con tarjeta verde: sí, pero viajes largos pueden afectar naturalización. Con visa válida: generalmente sí. DACA con Advance Parole: posible para ciertos propósitos. Asylum pendiente: no recomendado sin Advance Parole. Sin estatus: salir cancela ajuste de estatus. En proceso de deportación: salida se considera deportación. Siempre consulte antes de viajar.',
    },
    {
      question: '¿Hablan español en su oficina?',
      answer: 'Sí, todo nuestro equipo es bilingüe. Atendemos en español e inglés en todas nuestras oficinas de Raleigh, Charlotte, Smithfield y Orlando. Todos los documentos se pueden preparar en ambos idiomas. Las consultas, llamadas y comunicaciones son en su idioma preferido. Entendemos las necesidades culturales de nuestra comunidad latina. No necesita traer intérprete.',
    },
  ];

  const content = {
    introduction: `Enfrentar el sistema de inmigración estadounidense puede ser abrumador, especialmente cuando su familia, trabajo y futuro están en juego. Con más de 25 años de experiencia defendiendo los derechos de inmigrantes, Vasquez Law Firm ha ayudado a miles de familias a lograr sus sueños americanos. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden los desafíos únicos que enfrenta nuestra comunidad latina. Desde defender contra la deportación hasta reunir familias y obtener ciudadanía, luchamos incansablemente por cada cliente. No está solo en este proceso - estamos aquí para guiarlo en cada paso hacia un futuro seguro en Estados Unidos.`,

    processTitle: 'Proceso de Consulta de Inmigración',
    process: [
      {
        step: '1',
        title: 'Consulta Inicial',
        description: 'Evaluación gratuita de su caso',
      },
      {
        step: '2',
        title: 'Análisis Legal',
        description: 'Identificar mejores opciones',
      },
      {
        step: '3',
        title: 'Preparación',
        description: 'Reunir documentos necesarios',
      },
      {
        step: '4',
        title: 'Presentación',
        description: 'Someter aplicaciones correctamente',
      },
      {
        step: '5',
        title: 'Seguimiento',
        description: 'Monitorear y responder a USCIS',
      },
    ],

    urgencyTitle: '⚠️ Las Leyes de Inmigración Cambian Constantemente',
    urgencyMessage: 'Políticas migratorias pueden cambiar sin aviso. Fechas límite importantes se acercan. Retrasos pueden resultar en deportación. Actúe ahora para proteger su futuro.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law Firm',
    whyChoosePoints: [
      'Más de 25 años defendiendo inmigrantes',
      'Miles de casos exitosos',
      'Abogados completamente bilingües',
      'Oficinas en NC y FL para servirle mejor',
      'Disponible 24/7 para emergencias migratorias',
      'Planes de pago flexibles',
      'Tecnología moderna para casos más rápidos',
      'Comprometidos con la comunidad latina',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tipos de Casos de Inmigración que Manejamos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Casos Familiares</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Peticiones para esposos e hijos</li>
              <li>✓ Padres de ciudadanos mayores de 21</li>
              <li>✓ Hermanos de ciudadanos</li>
              <li>✓ Ajuste de estatus</li>
              <li>✓ Proceso consular</li>
              <li>✓ Perdones por presencia ilegal</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Defensa Criminal</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Corte de inmigración</li>
              <li>✓ Fianzas migratorias</li>
              <li>✓ Cancelación de deportación</li>
              <li>✓ Asilo y refugio</li>
              <li>✓ Apelaciones al BIA</li>
              <li>✓ Detención por ICE</li>
            </ul>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Beneficios Especiales</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ DACA y renovaciones</li>
              <li>✓ TPS estatus temporal</li>
              <li>✓ Visa U para víctimas</li>
              <li>✓ VAWA violencia doméstica</li>
              <li>✓ Visa T tráfico humano</li>
              <li>✓ Parole humanitario</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tarifas Gubernamentales de USCIS</h2>
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Información Importante Sobre Tarifas Gubernamentales</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-3">Tipos de Aplicaciones</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• <strong>Ciudadanía (N-400):</strong> Incluye tarifa de aplicación y biométricos</li>
                <li>• <strong>Tarjeta Verde (I-485):</strong> Ajuste de estatus con tarifas adicionales</li>
                <li>• <strong>Renovación DACA:</strong> Tarifa gubernamental estándar</li>
                <li>• <strong>Peticiones Familiares (I-130):</strong> Sin costo de biométricos</li>
                <li>• <strong>Permisos de Trabajo:</strong> Incluye procesamiento de documentos</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-3">Factores que Afectan Costos</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• <strong>Tipo de aplicación:</strong> Cada formulario tiene tarifas diferentes</li>
                <li>• <strong>Biométricos:</strong> Algunas aplicaciones requieren citas adicionales</li>
                <li>• <strong>Documentos adicionales:</strong> Traducciones y certificaciones</li>
                <li>• <strong>Cambios de USCIS:</strong> Las tarifas se actualizan regularmente</li>
                <li>• <strong>Complejidad del caso:</strong> Casos difíciles pueden requerir más trámites</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
            <p className="text-yellow-200 text-sm"><strong>Importante:</strong> Las tarifas gubernamentales de USCIS cambian regularmente. Durante su consulta gratuita, le proporcionaremos información actualizada sobre todos los costos gubernamentales que se aplicarán a su caso específico.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Conozca Sus Derechos</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Todos Tienen Derechos, Sin Importar Su Estatus</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Si ICE lo Detiene</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Derecho a permanecer callado</li>
                <li>• Derecho a no firmar nada</li>
                <li>• Derecho a un abogado</li>
                <li>• Derecho a una llamada</li>
                <li>• Derecho a intérprete</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">En Su Casa</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• No abra sin orden judicial</li>
                <li>• Pida ver la orden por ventana</li>
                <li>• Orden debe estar firmada por juez</li>
                <li>• ICE no puede entrar sin permiso</li>
                <li>• Puede negarse a responder</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Ubicaciones para Servirle Mejor</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Carolina del Norte</h3>
            <div className="text-gray-300 space-y-4">
              <div>
                <strong>Raleigh:</strong> Centro de la comunidad latina
                <p className="text-sm">Cerca de consulados y corte de inmigración</p>
              </div>
              <div>
                <strong>Charlotte:</strong> Ciudad más grande de NC
                <p className="text-sm">Gran población inmigrante</p>
              </div>
              <div>
                <strong>Smithfield:</strong> Corazón del este de NC
                <p className="text-sm">Sirviendo comunidades rurales</p>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Florida</h3>
            <div className="text-gray-300 space-y-4">
              <div>
                <strong>Orlando:</strong> Centro de Florida
                <p className="text-sm">Corte de inmigración y oficina de USCIS</p>
              </div>
              <div>
                <strong>Cobertura Estatal:</strong> Todo Florida
                <p className="text-sm">Miami, Tampa, Jacksonville</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Inmigración"
      subtitle="Defendiendo Sus Derechos, Protegiendo Su Futuro"
      description="Representación experta en todos los asuntos de inmigración con abogados bilingües comprometidos con su éxito."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
