import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Ciudadanía | Naturalización NC FL | Vasquez Law Firm',
  description: 'Abogados de ciudadanía y naturalización. Conviértase en ciudadano americano. N-400 y examen. 919-569-5882',
  keywords: 'ciudadania americana, naturalizacion, N-400, examen ciudadania, abogado ciudadania, hacerse ciudadano, ciudadania Raleigh, naturalizacion Charlotte, ciudadania Orlando',
  openGraph: {
    title: 'Abogado de Ciudadanía y Naturalización | Vasquez Law',
    description: 'Conviértase en ciudadano americano. Preparación completa para N-400 y examen.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function CiudadaniaPage() {
  const services = [
    {
      title: 'Elegibilidad N-400',
      description: 'Requisitos para ciudadanía',
      icon: '🇺🇸',
      features: [
        '5 años como residente (3 con cónyuge USC)',
        'Presencia física 30 meses',
        'Residencia continua',
        'Buen carácter moral',
        'Inglés y cívica básicos',
        'Apoyo a la Constitución',
      ],
    },
    {
      title: 'Preparación Examen',
      description: 'Listo para su entrevista',
      icon: '📚',
      features: [
        'Clases de inglés',
        '100 preguntas de cívica',
        'Práctica de entrevista',
        'Excepciones médicas',
        'Acomodaciones especiales',
        'Materiales de estudio',
      ],
    },
    {
      title: 'Documentación',
      description: 'Evidencia completa',
      icon: '📋',
      features: [
        'Historial de viajes',
        'Registros de taxes',
        'Antecedentes criminales',
        'Certificados matrimonio/divorcio',
        'Selective Service',
        'Prueba de residencia',
      ],
    },
    {
      title: 'Casos Especiales',
      description: 'Situaciones únicas',
      icon: '⭐',
      features: [
        'Militares y veteranos',
        'Hijos de ciudadanos',
        'Viudos de ciudadanos',
        'Empleados del gobierno',
        'Nacidos en el extranjero',
        'Doble nacionalidad',
      ],
    },
    {
      title: 'Complicaciones',
      description: 'Problemas comunes',
      icon: '⚠️',
      features: [
        'Antecedentes criminales',
        'Deudas de taxes',
        'Viajes prolongados',
        'Selective Service',
        'Matrimonios múltiples',
        'Órdenes de deportación previas',
      ],
    },
    {
      title: 'Ceremonia',
      description: 'Juramento final',
      icon: '🎉',
      features: [
        'Programación de ceremonia',
        'Juramento de lealtad',
        'Certificado de naturalización',
        'Pasaporte americano',
        'Registro para votar',
        'Beneficios de ciudadano',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo debo esperar para aplicar para ciudadanía?',
      answer: 'Residentes permanentes generales: 5 años desde fecha en green card (realmente 4 años 9 meses puede aplicar). Casados con ciudadano: 3 años si aún casado y viviendo con cónyuge USC. Militares: puede ser inmediato en servicio activo. IMPORTANTE: Contar desde "Resident Since" en green card, no desde entrada a USA. Viajes largos pueden romper residencia continua.',
    },
    {
      question: '¿Qué pasa si no hablo bien inglés?',
      answer: 'Excepciones disponibles: 50/20 - Si tiene 50+ años y residente 20+ años: examen en español. 55/15 - Si tiene 55+ años y residente 15+ años: examen en español. 65/20 - Si tiene 65+ años y residente 20+ años: cívica simplificada en español. Discapacidad médica - Con certificación médica N-648 puede tomar todo en español. Práctica ayuda - Ofrecemos clases y materiales. Muchos pasan con inglés básico.',
    },
    {
      question: '¿Puedo perder mi residencia si me niegan la ciudadanía?',
      answer: 'Generalmente NO pierdes green card si niegan N-400, PERO hay excepciones peligrosas: Si descubren que mintió para obtener green card. Si cometió delito deportable. Si abandonó residencia por viajes largos. Si votó ilegalmente. Por eso es CRÍTICO revisar su caso con abogado antes de aplicar. Algunas negaciones son temporales (puede re-aplicar), otras permanentes.',
    },
    {
      question: '¿Cuánto tiempo toma el proceso de ciudadanía en 2025?',
      answer: 'Tiempos actuales: Charlotte NC: 6-9 meses. Raleigh NC: 7-10 meses. Orlando FL: 8-11 meses. Incluye: procesamiento inicial 4-6 meses, programación biométricos 1-2 meses, espera para entrevista 2-4 meses, ceremonia 1-3 meses después de aprobación. Casos con problemas toman más. Verificar tiempos actuales en USCIS.gov con su código postal.',
    },
    {
      question: '¿Qué delitos afectan mi ciudadanía?',
      answer: 'Barras permanentes: asesinato, delito agravado con 5+ años cárcel. Barras temporales (esperar 5 años): DUI, violencia doméstica, drogas, prostitución, 2+ delitos con 5+ años total. Problemas serios: no pagar taxes, no registrarse Selective Service (hombres 18-26), mentir a inmigración. Delitos menores: pueden afectar "buen carácter moral". SIEMPRE consulte abogado si tiene ANY arresto, incluso desestimado.',
    },
    {
      question: '¿Necesito abogado para la ciudadanía?',
      answer: 'No es obligatorio pero altamente recomendado si: tiene antecedentes criminales (ANY arresto), debe taxes atrasados, viajó mucho fuera de USA, se divorció después de green card por matrimonio, tiene problemas de Selective Service, recibió beneficios públicos, trabajó sin autorización. Abogado previene problemas costosos y maximiza posibilidades de aprobación. Costo de abogado es inversión en su futuro americano.',
    },
  ];

  const content = {
    introduction: `Convertirse en ciudadano americano es el sueño final del proceso migratorio - votar, viajar con pasaporte estadounidense, y nunca preocuparse por deportación. El proceso de naturalización requiere más que solo llenar formularios; necesita preparación cuidadosa para cumplir todos los requisitos y pasar el examen. Vasquez Law Firm ha ayudado a miles de residentes permanentes en Raleigh, Charlotte, Smithfield y Orlando a obtener su ciudadanía americana. Nuestros abogados bilingües entienden los nervios del examen y las preocupaciones sobre el proceso. Le preparamos completamente para que llegue a su entrevista con confianza y celebre en su ceremonia de juramento.`,

    processTitle: 'Proceso de Naturalización',
    process: [
      {
        step: '1',
        title: 'Evaluación',
        description: 'Confirmar elegibilidad completa',
      },
      {
        step: '2',
        title: 'N-400',
        description: 'Preparar y enviar aplicación',
      },
      {
        step: '3',
        title: 'Biométricos',
        description: 'Huellas y verificación',
      },
      {
        step: '4',
        title: 'Entrevista',
        description: 'Examen y preguntas',
      },
      {
        step: '5',
        title: 'Juramento',
        description: 'Ceremonia de ciudadanía',
      },
    ],

    urgencyTitle: '🇺🇸 Su Momento de Ser Ciudadano es Ahora',
    urgencyMessage: 'Leyes pueden cambiar. Proteja su futuro permanentemente. Vote en próximas elecciones. Traiga familia más fácil.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Ciudadanía',
    whyChoosePoints: [
      'Miles de ciudadanías aprobadas exitosamente',
      'Preparación completa para examen',
      'Manejo de casos complicados',
      'Clases de inglés y cívica disponibles',
      'Acompañamiento a entrevista',
      'Totalmente bilingüe - español e inglés',
      'Celebramos su éxito con usted',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">100 Preguntas de Cívica - Temas Principales</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Gobierno Americano</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Ramas del gobierno</li>
              <li>✓ Separación de poderes</li>
              <li>✓ Presidente y gabinete</li>
              <li>✓ Congreso y senadores</li>
              <li>✓ Sistema judicial</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Historia Americana</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Periodo colonial</li>
              <li>✓ Independencia</li>
              <li>✓ Constitución</li>
              <li>✓ Guerra Civil</li>
              <li>✓ Historia moderna</li>
            </ul>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Geografía y Símbolos</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Estados y capitales</li>
              <li>✓ Océanos y fronteras</li>
              <li>✓ Bandera americana</li>
              <li>✓ Himno nacional</li>
              <li>✓ Días festivos</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Beneficios de Ser Ciudadano Americano</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Derechos Exclusivos</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Votar en elecciones</li>
                <li>• Pasaporte americano</li>
                <li>• Nunca ser deportado</li>
                <li>• Trabajar en gobierno federal</li>
                <li>• Servir en jurado</li>
                <li>• Postularse para cargos</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Beneficios Familiares</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Peticiones más rápidas</li>
                <li>• Traer padres inmediatamente</li>
                <li>• Hijos ciudadanos automáticos</li>
                <li>• Protección consular</li>
                <li>• Beneficios federales completos</li>
                <li>• Herencia sin restricciones</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Ciudadanía"
      subtitle="Conviértase en Ciudadano Americano con Confianza"
      description="Preparación experta para naturalización, desde N-400 hasta ceremonia de juramento."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
