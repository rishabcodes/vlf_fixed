import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Compensación Laboral | Accidentes Trabajo NC FL | Vasquez Law',
  description: 'Abogados de compensación laboral en Raleigh Charlotte Orlando. Lesiones trabajo, beneficios negados, incapacidad. Consulta gratis. 919-569-5882',
  keywords: 'abogado compensacion laboral, abogado accidente trabajo, workers compensation español, lesiones trabajo, beneficios incapacidad, compensacion trabajadores, abogado trabajo Raleigh, compensacion laboral Charlotte, workers comp Orlando',
  openGraph: {
    title: 'Abogado de Compensación Laboral | Lesiones en el Trabajo | Vasquez Law',
    description: 'Obtenga los beneficios que merece después de lesión laboral. Médicos, salarios perdidos, incapacidad.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function CompensacionLaboralPage() {
  const services = [
    {
      title: 'Lesiones de Espalda',
      description: 'Lesiones comunes de trabajo',
      icon: '🦴',
      features: [
        'Hernias de disco',
        'Lesiones lumbares',
        'Ciática',
        'Fracturas vertebrales',
        'Esguinces y torceduras',
        'Cirugías de espalda',
      ],
    },
    {
      title: 'Accidentes de Construcción',
      description: 'Sitios de trabajo peligrosos',
      icon: '🏗️',
      features: [
        'Caídas de altura',
        'Golpes por objetos',
        'Accidentes de maquinaria',
        'Electrocución',
        'Colapsos de zanjas',
        'Exposición a químicos',
      ],
    },
    {
      title: 'Estrés Repetitivo',
      description: 'Lesiones por movimientos repetidos',
      icon: '💪',
      features: [
        'Síndrome del túnel carpiano',
        'Tendinitis',
        'Bursitis',
        'Epicondilitis',
        'Lesiones de hombro',
        'Problemas de rodilla',
      ],
    },
    {
      title: 'Beneficios Negados',
      description: 'Apelaciones y disputas',
      icon: '🚫',
      features: [
        'Negación inicial',
        'Disputas médicas',
        'Audiencias',
        'Apelaciones',
        'Beneficios cortados',
        'Mala fe del seguro',
      ],
    },
    {
      title: 'Incapacidad Permanente',
      description: 'Compensación a largo plazo',
      icon: '♿',
      features: [
        'Incapacidad total',
        'Incapacidad parcial',
        'Pérdida de miembro',
        'Desfiguración',
        'Beneficios de por vida',
        'Acuerdos globales',
      ],
    },
    {
      title: 'Muerte en el Trabajo',
      description: 'Beneficios para familias',
      icon: '🕊️',
      features: [
        'Beneficios de dependientes',
        'Gastos funerarios',
        'Compensación para cónyuge',
        'Beneficios para hijos',
        'Investigación de accidente',
        'Demandas terceros',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué hago inmediatamente después de lesionarme en el trabajo?',
      answer: 'Pasos críticos: (1) Busque atención médica inmediata - su salud es prioridad, (2) Reporte a supervisor INMEDIATAMENTE - por escrito si posible, (3) Documente todo - fotos, testigos, condiciones, (4) Vea doctor autorizado por workers comp si lo requieren, (5) NO firme nada sin entender, (6) Guarde copias de TODO, (7) Siga todas las restricciones médicas, (8) Contacte abogado si hay problemas. En NC debe reportar en 30 días. En FL debe reportar en 30 días. Retraso puede resultar en negación.',
    },
    {
      question: '¿Qué beneficios puedo recibir por compensación laboral?',
      answer: 'Beneficios disponibles: (1) Médicos - 100% de tratamiento necesario, medicinas, terapia, cirugías, equipo médico, (2) Salarios perdidos - 66.67% de salario promedio semanal (con límites máximos), (3) Incapacidad permanente - compensación por pérdida permanente de función, (4) Rehabilitación vocacional - entrenamiento para nuevo trabajo, (5) Millaje - para citas médicas, (6) Muerte - beneficios para dependientes. NO cubre dolor y sufrimiento como demanda personal.',
    },
    {
      question: '¿Puedo elegir mi propio doctor?',
      answer: 'Depende del estado. Carolina del Norte: Empleador controla tratamiento médico inicialmente. Puede proveer panel de doctores. Después de cierto tiempo puede solicitar cambio. Florida: Empleador/seguro provee doctor autorizado. Puede ver su doctor una vez para emergencia. Puede solicitar cambio de doctor una vez. IMPORTANTE: Ver doctor no autorizado puede resultar en no pago de facturas y pérdida de beneficios. Siempre confirme autorización.',
    },
    {
      question: '¿Puedo ser despedido por presentar reclamo de compensación?',
      answer: 'Es ILEGAL despedir por presentar reclamo de workers comp - es represalia prohibida. PERO empleador puede despedir por razones legítimas: violación de políticas, ausencia excesiva (más allá de lo médicamente necesario), no poder hacer trabajo con acomodaciones, reducción de fuerza laboral. Si lo despiden: documente todo, guarde comunicaciones, note timing sospechoso, busque abogado inmediatamente. Puede tener reclamo por despido injusto además de workers comp.',
    },
    {
      question: '¿Qué pasa si mi reclamo es negado?',
      answer: 'NO se rinda - muchas negaciones son revertidas. Razones comunes de negación: reporte tardío, no es lesión de trabajo, condición preexistente, falta de testigos, prueba de drogas positiva. Pasos si niegan: (1) Obtenga negación por escrito, (2) Reúna evidencia adicional, (3) Obtenga opiniones médicas, (4) Presente apelación a tiempo (plazos estrictos), (5) Solicite audiencia, (6) CONTRATE ABOGADO - estadísticas muestran 3x más éxito con representación.',
    },
    {
      question: '¿Cuánto vale mi caso de compensación laboral?',
      answer: 'Depende de muchos factores: gravedad de lesión, salario semanal, porcentaje de incapacidad, necesidad de cirugía, capacidad de regresar a trabajar, edad y educación. Cálculos típicos: Incapacidad temporal: porcentaje establecido del salario hasta recuperación. Incapacidad permanente parcial: rating basado en parte del cuerpo afectada. Incapacidad total: beneficios extendidos o de por vida. Acuerdos globales: varían desde modestos hasta muy sustanciales según la gravedad del caso. Un abogado puede maximizar el valor identificando todos los beneficios aplicables.',
    },
  ];

  const content = {
    introduction: `Cuando se lesiona en el trabajo, tiene derecho a beneficios de compensación laboral sin importar quién tuvo la culpa. Sin embargo, las compañías de seguros frecuentemente niegan reclamos válidos o pagan menos de lo debido. Con más de 25 años defendiendo trabajadores lesionados, Vasquez Law Firm conoce las tácticas de las aseguradoras y cómo combatirlas. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando luchan para que reciba tratamiento médico completo, compensación por salarios perdidos, y beneficios de incapacidad que merece. No deje que el sistema de compensación laboral lo intimide - tiene derechos y estamos aquí para protegerlos.`,

    processTitle: 'Proceso de Compensación Laboral',
    process: [
      {
        step: '1',
        title: 'Reporte Inmediato',
        description: 'Notificar lesión a empleador',
      },
      {
        step: '2',
        title: 'Tratamiento Médico',
        description: 'Ver doctor autorizado',
      },
      {
        step: '3',
        title: 'Documentación',
        description: 'Formularios y evidencia',
      },
      {
        step: '4',
        title: 'Evaluación',
        description: 'Determinar beneficios',
      },
      {
        step: '5',
        title: 'Resolución',
        description: 'Beneficios o acuerdo',
      },
    ],

    urgencyTitle: '⚠️ Plazos Estrictos - No Pierda Sus Derechos',
    urgencyMessage: 'Debe reportar en 30 días. Tratamiento retrasado afecta reclamo. Evidencia desaparece. Aseguradoras aprovechan retrasos.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Su Caso Laboral',
    whyChoosePoints: [
      'Más de 25 años en compensación laboral',
      'Conocemos médicos y especialistas',
      'Experiencia con todas las aseguradoras',
      'Máxima compensación para clientes',
      'No cobramos si no ganamos',
      'Totalmente bilingüe - español e inglés',
      'Manejamos apelaciones y audiencias',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Beneficios de Compensación Laboral Disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Beneficios Médicos</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Todas las visitas al doctor</li>
              <li>✓ Hospitalización y cirugías</li>
              <li>✓ Medicamentos recetados</li>
              <li>✓ Terapia física/ocupacional</li>
              <li>✓ Equipos médicos (muletas, sillas)</li>
              <li>✓ Prótesis si necesario</li>
              <li>✓ Cuidado de por vida si permanente</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Beneficios de Ingresos</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ 66.67% del salario semanal promedio</li>
              <li>✓ Incapacidad temporal total (TTD)</li>
              <li>✓ Incapacidad temporal parcial (TPD)</li>
              <li>✓ Incapacidad permanente parcial (PPD)</li>
              <li>✓ Incapacidad permanente total (PTD)</li>
              <li>✓ Beneficios suplementarios</li>
              <li>✓ Ajustes por costo de vida</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Lesiones Laborales Más Comunes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Tipo de Lesión</th>
                <th className="py-3 px-4">Industrias Afectadas</th>
                <th className="py-3 px-4">Tiempo Recuperación</th>
                <th className="py-3 px-4">Severidad Típica</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Lesiones de Espalda</td>
                <td className="py-3 px-4">Construcción, Almacén</td>
                <td className="py-3 px-4">2-12 meses</td>
                <td className="py-3 px-4">Moderada a Grave</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Túnel Carpiano</td>
                <td className="py-3 px-4">Oficina, Manufactura</td>
                <td className="py-3 px-4">3-6 meses</td>
                <td className="py-3 px-4">Leve a Moderada</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Fracturas</td>
                <td className="py-3 px-4">Todas las industrias</td>
                <td className="py-3 px-4">6-12 semanas</td>
                <td className="py-3 px-4">Moderada</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Lesiones de Hombro</td>
                <td className="py-3 px-4">Construcción, Delivery</td>
                <td className="py-3 px-4">4-8 meses</td>
                <td className="py-3 px-4">Moderada a Grave</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Lesiones de Rodilla</td>
                <td className="py-3 px-4">Retail, Construcción</td>
                <td className="py-3 px-4">3-9 meses</td>
                <td className="py-3 px-4">Moderada</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Montos varían según gravedad y circunstancias individuales</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Calculadora de Beneficios Semanales</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Cómo Se Calculan Sus Beneficios</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-400 font-bold">Paso 1: Salario Semanal Promedio (AWW)</h4>
              <p className="text-gray-300 text-sm">Promedio de últimas 52 semanas incluyendo overtime, bonos, tips</p>
            </div>
            <div>
              <h4 className="text-green-400 font-bold">Paso 2: Tasa de Compensación</h4>
              <p className="text-gray-300 text-sm">66.67% del AWW (2/3 del salario)</p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold">Paso 3: Límites Estatales</h4>
              <p className="text-gray-300 text-sm">Sujeto a límites máximos estatales establecidos anualmente</p>
            </div>
            <div>
              <h4 className="text-purple-400 font-bold">Ejemplo:</h4>
              <p className="text-gray-300 text-sm">Ejemplo: Si gana salario promedio → Recibe dos tercios en beneficios</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Errores Comunes que Evitar</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">NO Cometa Estos Errores</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Errores de Reporte</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✗ No reportar inmediatamente</li>
                <li>✗ No reportar por escrito</li>
                <li>✗ Minimizar lesiones</li>
                <li>✗ No mencionar todas las partes lesionadas</li>
                <li>✗ Decir "estoy bien"</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Errores Médicos</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✗ No seguir tratamiento</li>
                <li>✗ Faltar a citas</li>
                <li>✗ No seguir restricciones</li>
                <li>✗ Ver doctor no autorizado</li>
                <li>✗ No documentar síntomas</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 font-bold">⚠️ Estos errores pueden destruir su caso</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Compensación Laboral"
      subtitle="Luchamos Por Sus Beneficios Después de Lesiones en el Trabajo"
      description="Representación experta para trabajadores lesionados buscando beneficios médicos y salariales completos."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
