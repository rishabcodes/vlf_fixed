import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado DACA | Acción Diferida NC FL | Vasquez Law Firm',
  description: 'Abogados expertos en DACA. Renovaciones y aplicaciones iniciales. Proteja su futuro. Consulta gratis. 919-569-5882',
  keywords: 'DACA, accion diferida, dreamers, abogado DACA, renovacion DACA, permiso trabajo DACA, DACA Raleigh, DACA Charlotte, DACA Orlando',
  openGraph: {
    title: 'Abogado DACA | Protección para Dreamers | Vasquez Law',
    description: 'Expertos en DACA ayudando a jóvenes mantener estatus legal y permisos de trabajo.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function DACAPage() {
  const services = [
    {
      title: 'Renovación DACA',
      description: 'Mantener su estatus',
      icon: '🔄',
      features: [
        'Renovación cada 2 años',
        'Documentación actualizada',
        'Cambios de dirección',
        'Evidencia continua',
        'Procesamiento expedito',
        'Seguimiento de fechas',
      ],
    },
    {
      title: 'Requisitos DACA',
      description: 'Elegibilidad completa',
      icon: '✅',
      features: [
        'Llegó antes de 16 años',
        'Antes del 15 junio 2012',
        'Nacido después 16 junio 1981',
        'En escuela o graduado',
        'Sin condenas graves',
        'Presencia continua',
      ],
    },
    {
      title: 'Permiso de Trabajo',
      description: 'Autorización de empleo',
      icon: '💼',
      features: [
        'EAD por 2 años',
        'Número seguro social',
        'Licencia de conducir',
        'Trabajar legalmente',
        'Abrir cuentas bancarias',
        'Construir crédito',
      ],
    },
    {
      title: 'Advance Parole',
      description: 'Permiso de viaje',
      icon: '✈️',
      features: [
        'Emergencias humanitarias',
        'Educación en exterior',
        'Empleo autorizado',
        'Proceso cuidadoso',
        'Riesgos y beneficios',
        'Entrada legal posible',
      ],
    },
    {
      title: 'Caminos Futuros',
      description: 'Opciones permanentes',
      icon: '🛤️',
      features: [
        'Matrimonio con ciudadano',
        'Peticiones familiares',
        'Empleo especializado',
        'Asilo si califica',
        'Visa U o T',
        'Legislación futura',
      ],
    },
    {
      title: 'Protección Legal',
      description: 'Defensa de derechos',
      icon: '🛡️',
      features: [
        'Si arrestan o detienen',
        'Cambios de política',
        'Corte de inmigración',
        'Información confidencial',
        'Derechos laborales',
        'Discriminación',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Puedo aplicar para DACA por primera vez en 2025?',
      answer: 'Actualmente NO hay aplicaciones iniciales de DACA debido a decisiones judiciales. Solo se aceptan RENOVACIONES para quienes ya tienen o tuvieron DACA. Situación puede cambiar con nuevas leyes o decisiones de corte. Es CRÍTICO mantener evidencia de elegibilidad (llegada antes de 16, presencia desde 2012) en caso de que se abran aplicaciones. Consulte abogado para explorar otras opciones mientras espera cambios en DACA.',
    },
    {
      question: '¿Cuándo debo renovar mi DACA?',
      answer: 'Recomendamos renovar 150-120 días antes de expiración (4-5 meses). USCIS acepta renovaciones hasta 150 días antes. Tiempos de procesamiento actuales: 3-5 meses. Si expira sin renovar: pierde permiso de trabajo inmediatamente, puede ser puesto en proceso de deportación, empleador debe terminar empleo, pierde licencia de conducir en muchos estados. NUNCA deje expirar. Ponga recordatorios múltiples. Si expira, consulte abogado INMEDIATAMENTE.',
    },
    {
      question: '¿Puedo viajar fuera de USA con DACA?',
      answer: 'Solo con Advance Parole aprobado ANTES de salir. Razones válidas: emergencia humanitaria (enfermedad/muerte familiar), educación (estudios, conferencias), empleo (trabajo de empleador). NO turismo o vacaciones. RIESGOS: puede ser negada reentrada, inspección minuciosa en frontera, cambios de política durante viaje. BENEFICIOS: entrada legal puede ayudar para ajuste de estatus futuro. NUNCA viaje sin advance parole o pierde DACA permanentemente.',
    },
    {
      question: '¿Qué pasa si me arrestan teniendo DACA?',
      answer: 'Cualquier arresto es SERIO para DACA. Pasos inmediatos: NO hable sin abogado, no firme nada, contacte abogado de inmigración Y criminal inmediatamente. Condenas que terminan DACA: felonías, 3+ misdemeanors, 1 misdemeanor significativo (DUI, violencia doméstica, drogas, armas). Incluso cargos desestimados deben reportarse en renovación. Programas de diversión pueden afectar. CRÍTICO: resolver cargos criminales ANTES de renovar DACA. Un error puede terminar su protección permanentemente.',
    },
    {
      question: '¿DACA me da camino a green card?',
      answer: 'DACA por sí solo NO da residencia permanente. Pero puede ayudar: Si viajó con advance parole = entrada legal puede permitir ajuste de estatus si tiene petición familiar. Matrimonio con ciudadano + advance parole = posible ajuste sin salir. Petición de empleo con entrada legal. Protección mientras espera otras opciones. Importante: cada caso es único. Algunos con DACA tienen barras de 3/10 años si tuvieron presencia ilegal antes. Consulte abogado para plan personalizado.',
    },
    {
      question: '¿Qué información comparte USCIS sobre DACA?',
      answer: 'USCIS tiene política de NO compartir información de DACA para deportación EXCEPTO: seguridad nacional, seguridad pública, fraude/misrepresentación, orden judicial. Su información incluye: dirección, empleador, huellas, historial criminal. Preocupaciones: política puede cambiar con nueva administración, información existe en sistema permanentemente. Por eso es CRÍTICO: mantener dirección actualizada, no cometer crímenes, no mentir en aplicaciones, tener plan de emergencia con familia.',
    },
  ];

  const content = {
    introduction: `DACA ha protegido a más de 600,000 jóvenes que llegaron a Estados Unidos como niños, permitiéndoles trabajar legalmente, estudiar y construir sus vidas sin miedo a deportación. Aunque el futuro del programa enfrenta desafíos legales, las renovaciones continúan y es crucial mantener su estatus activo. Vasquez Law Firm ha ayudado a miles de Dreamers desde el inicio de DACA en 2012. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden la importancia de DACA para su vida y familia. Le ayudamos con renovaciones puntuales, advance parole cuando es apropiado, y exploramos todas las opciones para estatus permanente. Su sueño americano merece protección experta.`,

    processTitle: 'Proceso de Renovación DACA',
    process: [
      {
        step: '1',
        title: 'Evaluación',
        description: 'Revisar elegibilidad continua',
      },
      {
        step: '2',
        title: 'Documentación',
        description: 'Actualizar evidencia',
      },
      {
        step: '3',
        title: 'Aplicación',
        description: 'I-821D, I-765, I-765WS',
      },
      {
        step: '4',
        title: 'Biométricos',
        description: 'Cita de huellas',
      },
      {
        step: '5',
        title: 'Aprobación',
        description: 'Nuevo EAD por 2 años',
      },
    ],

    urgencyTitle: '⏰ No Deje Expirar Su DACA',
    urgencyMessage: 'Renovar tarde significa perder trabajo. Sin estatus queda vulnerable. Cambios políticos son constantes. Proteja su futuro HOY.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para DACA',
    whyChoosePoints: [
      'Experiencia desde inicio de DACA en 2012',
      'Miles de renovaciones exitosas',
      'Seguimiento de fechas de expiración',
      'Advance parole cuando apropiado',
      'Exploramos opciones permanentes',
      'Totalmente bilingüe y confidencial',
      'Apoyo en emergencias 24/7',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Documentos Necesarios para Renovación</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Formularios Requeridos</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ I-821D (Acción Diferida)</li>
              <li>✓ I-765 (Permiso de Trabajo)</li>
              <li>✓ I-765WS (Hoja de Trabajo)</li>
              <li>✓ Pago de $495 (money order)</li>
              <li>✓ 2 fotos tipo pasaporte</li>
              <li>✓ Copia de EAD anterior</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Evidencia de Presencia</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Records de escuela</li>
              <li>✓ Records médicos</li>
              <li>✓ Recibos de renta</li>
              <li>✓ Estados de cuenta</li>
              <li>✓ Taxes/W-2s</li>
              <li>✓ Cualquier documento oficial</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Beneficios de DACA</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Trabajo Legal</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Permiso de trabajo (EAD)</li>
                <li>• Número de seguro social</li>
                <li>• Mejores empleos</li>
                <li>• Protecciones laborales</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Educación</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Matrícula estatal en algunos estados</li>
                <li>• Acceso a becas privadas</li>
                <li>• Licencias profesionales</li>
                <li>• Prácticas y pasantías</li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 font-bold mb-2">Vida Diaria</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Licencia de conducir</li>
                <li>• Cuentas bancarias</li>
                <li>• Construir crédito</li>
                <li>• Apartamento a su nombre</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Plan de Emergencia para DACA</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Prepárese para Cualquier Escenario</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Documentos Importantes</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Copias de todos los DACA anteriores</li>
                <li>• Pasaporte de su país</li>
                <li>• Acta de nacimiento</li>
                <li>• Records de entrada a USA</li>
                <li>• Poder notarial para hijos</li>
                <li>• Información de cuentas bancarias</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Acciones Preventivas</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Tenga ahorros de emergencia</li>
                <li>• Mantenga record criminal limpio</li>
                <li>• Documente presencia continua</li>
                <li>• Explore otras opciones legales</li>
                <li>• Informe a familia de planes</li>
                <li>• Tenga abogado identificado</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado DACA"
      subtitle="Protegiendo el Futuro de los Dreamers"
      description="Renovaciones expertas de DACA y exploración de opciones permanentes para jóvenes inmigrantes."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
