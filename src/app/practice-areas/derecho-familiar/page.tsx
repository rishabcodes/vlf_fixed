import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Derecho Familiar | Divorcio NC FL | Vasquez Law Firm',
  description: 'Abogados de familia en Raleigh Charlotte Orlando. Divorcio, custodia, manutención, violencia doméstica. Consulta gratis. 919-569-5882',
  keywords: 'abogado de familia, abogado divorcio, abogado custodia, manutención de hijos, violencia doméstica, abogado familia cerca de mi, derecho familiar Raleigh, abogado divorcio Charlotte, abogado custodia Orlando',
  openGraph: {
    title: 'Abogado de Derecho Familiar | Divorcio y Custodia | Vasquez Law',
    description: 'Protegemos su familia durante tiempos difíciles. Divorcio, custodia, manutención con compasión.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function DerechoFamiliarPage() {
  const services = [
    {
      title: 'Divorcio',
      description: 'Separación legal y divorcio',
      icon: '💔',
      features: [
        'Divorcio sin culpa',
        'Divorcio contencioso',
        'División de propiedad',
        'Acuerdos de separación',
        'Divorcio colaborativo',
        'Mediación de divorcio',
      ],
    },
    {
      title: 'Custodia de Hijos',
      description: 'Derechos parentales',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Custodia física y legal',
        'Planes de crianza',
        'Modificación de custodia',
        'Relocación con hijos',
        'Derechos de abuelos',
        'Custodia de emergencia',
      ],
    },
    {
      title: 'Manutención',
      description: 'Soporte financiero',
      icon: '💰',
      features: [
        'Manutención de hijos',
        'Pensión alimenticia',
        'Modificación de pagos',
        'Cobro de pagos atrasados',
        'Cálculo de ingresos',
        'Cumplimiento de órdenes',
      ],
    },
    {
      title: 'Violencia Doméstica',
      description: 'Protección y seguridad',
      icon: '🛡️',
      features: [
        'Órdenes de protección',
        'Refugio de emergencia',
        'Custodia de emergencia',
        'Plan de seguridad',
        'Apoyo a víctimas',
        'Defensa en corte',
      ],
    },
    {
      title: 'División de Propiedad',
      description: 'Distribución equitativa',
      icon: '🏠',
      features: [
        'Casa matrimonial',
        'Cuentas bancarias',
        'Retiro y pensiones',
        'Deudas y obligaciones',
        'Negocios familiares',
        'Herencias y regalos',
      ],
    },
    {
      title: 'Otros Asuntos',
      description: 'Casos especiales',
      icon: '📋',
      features: [
        'Acuerdos prenupciales',
        'Adopciones',
        'Tutela legal',
        'Paternidad',
        'Cambio de nombre',
        'Anulación',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo toma un divorcio en NC o FL?',
      answer: 'Carolina del Norte: Mínimo 1 año de separación requerido antes de poder divorciarse. Proceso total 12-18 meses típicamente. Florida: No requiere separación previa. Divorcio sin disputas puede completarse en 3-4 meses. Con disputas 6-12 meses o más. Factores que afectan tiempo: acuerdo mutuo vs disputa, custodia de hijos, división de propiedad compleja, disponibilidad de corte. Divorcio colaborativo o mediación puede acelerar proceso.',
    },
    {
      question: '¿Cómo se determina la custodia de los hijos?',
      answer: 'Cortes deciden basado en "mejores intereses del niño". Factores considerados: relación actual con cada padre, estabilidad del hogar, salud física y mental de padres, historial de violencia o abuso, deseos del niño (si tiene edad), capacidad de proveer necesidades, cooperación entre padres, horarios de trabajo. Tipos de custodia: Física (donde vive) y Legal (decisiones). Puede ser conjunta o exclusiva. Preferencia moderna es custodia compartida si es posible y seguro.',
    },
    {
      question: '¿Cuánto es la manutención de hijos?',
      answer: 'Se calcula usando guías estatales basadas en: ingresos de ambos padres, número de hijos, tiempo con cada padre, gastos médicos y guardería, otras obligaciones de manutención. NC usa guías que resultan aproximadamente 15-25% del ingreso neto para 1 hijo, 25-35% para 2 hijos. FL similar pero considera más el tiempo compartido. Calculadoras en línea dan estimados. Puede modificarse si hay cambio sustancial en circunstancias.',
    },
    {
      question: '¿Qué es división equitativa de propiedad?',
      answer: 'División justa (no necesariamente 50/50) de bienes y deudas matrimoniales. Propiedad matrimonial: todo adquirido durante matrimonio, independiente de quién lo compró. Propiedad separada: antes del matrimonio, herencias, regalos personales - generalmente no se divide. Factores: duración del matrimonio, contribuciones económicas y domésticas, edad y salud, necesidades futuras, culpa (en algunos casos). Incluye: casa, autos, cuentas bancarias, retiro, deudas, negocios.',
    },
    {
      question: '¿Necesito un abogado para el divorcio?',
      answer: 'Legalmente no, pero altamente recomendado porque: leyes son complejas y varían por estado, errores pueden ser permanentes y costosos, emociones afectan decisiones, necesita proteger sus derechos, especialmente importante si hay: hijos menores, propiedad significativa, deudas considerables, violencia doméstica, desbalance de poder/dinero, desacuerdo en términos. Incluso en divorcios "amigables" cada parte debe tener su abogado para revisar acuerdos.',
    },
    {
      question: '¿Qué hago si sufro violencia doméstica?',
      answer: 'Su seguridad es prioridad #1. Pasos inmediatos: Llame 911 si en peligro inmediato. Vaya a lugar seguro (familia, amigos, refugio). Documente lesiones con fotos y médico. Guarde evidencia (mensajes, emails). Obtenga orden de protección de emergencia (24-48 horas). Podemos ayudar con: órdenes de protección permanentes, custodia de emergencia de hijos, divorcio acelerado, acceso a recursos y refugios, representación en corte criminal y familiar. Línea Nacional: 1-800-799-7233.',
    },
  ];

  const content = {
    introduction: `Los asuntos familiares son los más personales y emocionales que enfrentará. Ya sea un divorcio difícil, una batalla por custodia, o protección contra violencia doméstica, necesita un abogado que combine experiencia legal con compasión genuina. Vasquez Law Firm ha ayudado a miles de familias en Carolina del Norte y Florida a navegar estos momentos difíciles por más de 25 años. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden que cada familia es única y merece soluciones personalizadas. Luchamos por sus derechos mientras protegemos el bienestar de sus hijos. No enfrente estos desafíos solo.`,

    processTitle: 'Proceso de Casos Familiares',
    process: [
      {
        step: '1',
        title: 'Consulta Inicial',
        description: 'Evaluación confidencial de su situación',
      },
      {
        step: '2',
        title: 'Estrategia',
        description: 'Plan personalizado para su caso',
      },
      {
        step: '3',
        title: 'Documentación',
        description: 'Preparar peticiones y evidencia',
      },
      {
        step: '4',
        title: 'Negociación',
        description: 'Buscar acuerdos favorables',
      },
      {
        step: '5',
        title: 'Resolución',
        description: 'Finalizar en corte o por acuerdo',
      },
    ],

    urgencyTitle: '⚠️ Proteja Sus Derechos Familiares Ahora',
    urgencyMessage: 'Decisiones tomadas hoy afectan su familia por años. Evidencia se pierde. Otros pueden tomar ventaja. Actúe para proteger su futuro.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Familia',
    whyChoosePoints: [
      'Más de 25 años en derecho familiar',
      'Enfoque compasivo y personalizado',
      'Protegemos intereses de los niños',
      'Experiencia en casos complejos',
      'Mediadores certificados disponibles',
      'Totalmente bilingüe - español e inglés',
      'Acceso a recursos de apoyo',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Calculadora de Manutención de Hijos</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Factores en el Cálculo</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Ingresos Considerados</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Salarios y sueldos</li>
                <li>• Bonos y comisiones</li>
                <li>• Ingresos de negocio</li>
                <li>• Beneficios de desempleo</li>
                <li>• Pensiones y retiro</li>
                <li>• Ingresos de inversiones</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Gastos Deducibles</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Seguro médico de hijos</li>
                <li>• Guardería/cuidado infantil</li>
                <li>• Otras órdenes de manutención</li>
                <li>• Gastos médicos extraordinarios</li>
                <li>• Educación especial</li>
                <li>• Actividades extracurriculares</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">División de Propiedad: Qué Esperar</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Tipo de Propiedad</th>
                <th className="py-3 px-4">Generalmente Dividido</th>
                <th className="py-3 px-4">Generalmente Separado</th>
                <th className="py-3 px-4">Factores Especiales</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Casa Familiar</td>
                <td className="py-3 px-4">Si comprada durante matrimonio</td>
                <td className="py-3 px-4">Si propiedad prematrimonial</td>
                <td className="py-3 px-4">Considerar hijos</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Cuentas Bancarias</td>
                <td className="py-3 px-4">Fondos matrimoniales</td>
                <td className="py-3 px-4">Herencias separadas</td>
                <td className="py-3 px-4">Rastreo necesario</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Retiro/401k</td>
                <td className="py-3 px-4">Porción ganada en matrimonio</td>
                <td className="py-3 px-4">Pre-matrimonial</td>
                <td className="py-3 px-4">QDRO requerido</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Deudas</td>
                <td className="py-3 px-4">Deudas matrimoniales</td>
                <td className="py-3 px-4">Deudas personales previas</td>
                <td className="py-3 px-4">Quien se benefició</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Negocio</td>
                <td className="py-3 px-4">Iniciado en matrimonio</td>
                <td className="py-3 px-4">Pre-existente</td>
                <td className="py-3 px-4">Valuación necesaria</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Protección Contra Violencia Doméstica</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Recursos de Emergencia</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Señales de Abuso</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Control excesivo</li>
                <li>• Aislamiento de familia/amigos</li>
                <li>• Amenazas verbales</li>
                <li>• Violencia física</li>
                <li>• Abuso financiero</li>
                <li>• Manipulación emocional</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Plan de Seguridad</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Documentos importantes listos</li>
                <li>• Dinero de emergencia</li>
                <li>• Lugar seguro identificado</li>
                <li>• Código con amigos/familia</li>
                <li>• Teléfono de emergencia</li>
                <li>• Ropa para 3 días</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">🚨 Emergencia: 911 | Línea Nacional: 1-800-799-7233</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Derecho Familiar"
      subtitle="Protegiendo Su Familia Durante Tiempos Difíciles"
      description="Representación compasiva y experimentada en todos los asuntos de familia."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
