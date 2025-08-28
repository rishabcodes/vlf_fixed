import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Deportación | Defensa Remoción NC FL | Vasquez Law Firm',
  description: 'Defensa agresiva contra deportación. ICE, corte de inmigración, apelaciones. Proteja su familia. 919-569-5882',
  keywords: 'abogado deportacion, defensa deportacion, corte inmigracion, detencion ICE, cancelacion deportacion, asilo defensivo, deportacion Raleigh, deportacion Charlotte, deportacion Orlando',
  openGraph: {
    title: 'Abogado de Deportación | Defensa en Corte | Vasquez Law',
    description: 'Luchamos contra deportación. Representación agresiva en corte de inmigración.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function DeportacionPage() {
  const services = [
    {
      title: 'Detención por ICE',
      description: 'Respuesta inmediata',
      icon: '🚨',
      features: [
        'Localización de detenido',
        'Audiencias de fianza',
        'Reducción de fianza',
        'Libertad bajo palabra',
        'Supervisión electrónica',
        'Reunificación familiar',
      ],
    },
    {
      title: 'Corte de Inmigración',
      description: 'Defensa completa',
      icon: '⚖️',
      features: [
        'Master Calendar Hearing',
        'Individual Hearing',
        'Cancelación de remoción',
        'Asilo defensivo',
        'Ajuste de estatus',
        'Salida voluntaria',
      ],
    },
    {
      title: 'Formas de Alivio',
      description: 'Opciones legales',
      icon: '🛡️',
      features: [
        'Cancelación 42A/42B',
        'Asilo/Withholding/CAT',
        'Ajuste 245(i)',
        'VAWA/U Visa/T Visa',
        'Discreción prosecutorial',
        'Terminación administrativa',
      ],
    },
    {
      title: 'Apelaciones',
      description: 'Siguientes pasos',
      icon: '📜',
      features: [
        'Apelación al BIA',
        'Moción de reapertura',
        'Moción de reconsideración',
        'Corte de Apelaciones',
        'Petición de certiorari',
        'Habeas corpus',
      ],
    },
    {
      title: 'Casos Criminales',
      description: 'Complicaciones graves',
      icon: '⚠️',
      features: [
        'Crímenes agravados',
        'Drogas y armas',
        'Violencia doméstica',
        'DUI múltiples',
        'Fraude y robo',
        'Post-conviction relief',
      ],
    },
    {
      title: 'Emergencias',
      description: 'Acción inmediata',
      icon: '🆘',
      features: [
        'Órdenes de deportación',
        'Check-ins con ICE',
        'Moción de emergencia',
        'Stay of removal',
        'Supervisión de ICE',
        'Sanctuary cases',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué hago si ICE detiene a mi familiar?',
      answer: 'ACTÚE INMEDIATAMENTE: (1) Localice dónde está detenido - llame a ICE Locator 1-888-351-4024 o use locator.ice.gov con A# o información personal, (2) NO firme nada sin abogado, (3) Contrate abogado YA - primeras 48-72 horas son críticas, (4) Reúna documentos: prueba de tiempo en USA, familia ciudadana/residente, empleo, taxes, propiedad, (5) Prepare fianza si elegible, (6) Asista a todas las audiencias. Detenido tiene derecho a llamadas, abogado (pagado), no hablar sin abogado presente.',
    },
    {
      question: '¿Puedo pelear deportación si tengo orden de deportación final?',
      answer: 'SÍ hay opciones incluso con orden final: Moción de reapertura (cambio en ley o circunstancias, evidencia nueva, mal representado por abogado anterior). Stay of removal de emergencia para evitar deportación inmediata. Apelación si dentro del plazo. Discreción prosecutorial si no es prioridad. Habeas corpus si detención ilegal. Nueva aplicación si califica (VAWA, U visa, T visa pueden presentarse con orden). CRÍTICO: actuar rápido, algunas opciones tienen plazos de días. Nunca ignore orden de deportación.',
    },
    {
      question: '¿Qué es cancelación de deportación y califico?',
      answer: 'Dos tipos: NO-RESIDENTES (42A): 10 años presencia continua, buen carácter moral, no condenas descalificantes, sufrimiento excepcional y extremadamente inusual a familiar USC/LPR. Solo 4,000 por año. RESIDENTES (42B): 7 años como residente, 5 años con green card, no delito agravado, merece discreción favorable. IMPORTANTE: tiempo para en NTA. Debe probar TODO con evidencia extensa. Sufrimiento debe ser más que separación normal. Juez tiene discreción incluso si califica.',
    },
    {
      question: '¿Qué crímenes causan deportación automática?',
      answer: 'Delitos agravados = deportación casi automática: asesinato, violación, abuso sexual de menor, tráfico de drogas, tráfico de armas, lavado de dinero >$10,000, crimen violento con 1+ año cárcel, robo con 1+ año, fraude >$10,000, falsificación de documentos con 1+ año. También problemáticos: 2+ crimes moral turpitude, cualquier droga controlada (excepto 1 marihuana <30g), arma de fuego, violencia doméstica, violación de orden protección, DUI con lesiones. Consulte abogado criminal E inmigración antes de plea deal.',
    },
    {
      question: '¿Puedo viajar con caso de deportación pendiente?',
      answer: 'GENERALMENTE NO. Salir de USA = abandono de caso y orden de deportación in absentia automática. Excepciones muy limitadas: advance parole (raramente dado en deportación), órdenes específicas del juez. Si sale: no puede regresar legalmente, pierde mayoría de defensas, orden de deportación automática, barra de reentrada 5-10-20 años o permanente. Si DEBE viajar por emergencia extrema: consulte abogado ANTES, solicite advance parole, documente emergencia, entienda que probablemente no podrá regresar.',
    },
    {
      question: '¿Cuánto tiempo toma el proceso de deportación?',
      answer: 'Varía enormemente: Detenidos: 2-6 meses generalmente (prioridad del sistema). No detenidos: 2-5 AÑOS actualmente por backlog masivo. Charlotte Immigration Court: 800+ días promedio. Orlando: 900+ días. Factores: si está detenido (más rápido), complejidad del caso, cambios de venue, continuances pedidos, apelaciones. Puede verificar fechas en EOIR hotline 1-800-898-7180 con A#. Backlog actual: 3+ millones de casos pendientes nacionalmente.',
    },
  ];

  const content = {
    introduction: `Enfrentar deportación es uno de los momentos más aterradores para cualquier familia inmigrante. La separación familiar, pérdida de todo lo construido, y regreso a peligro son amenazas reales. Pero deportación NO es inevitable. Vasquez Law Firm ha defendido exitosamente a miles de clientes contra deportación por más de 25 años. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando conocen cada forma de alivio, cada defensa disponible, y luchamos agresivamente en corte. Desde detención por ICE hasta apelaciones finales, estamos con usted. No enfrente solo al gobierno - necesita guerreros legales experimentados de su lado.`,

    processTitle: 'Proceso de Defensa',
    process: [
      {
        step: '1',
        title: 'Evaluación Urgente',
        description: 'Analizar opciones inmediatas',
      },
      {
        step: '2',
        title: 'Fianza/Libertad',
        description: 'Sacar de detención',
      },
      {
        step: '3',
        title: 'Preparación',
        description: 'Evidencia y estrategia',
      },
      {
        step: '4',
        title: 'Corte',
        description: 'Defensa agresiva',
      },
      {
        step: '5',
        title: 'Resolución',
        description: 'Alivio o apelación',
      },
    ],

    urgencyTitle: '🚨 EMERGENCIA - Cada Hora Cuenta',
    urgencyMessage: 'Deportación puede ocurrir en días. Derechos se pierden si no actúa. Evidencia desaparece. Opciones expiran rápidamente.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Deportación',
    whyChoosePoints: [
      'Miles de deportaciones detenidas exitosamente',
      'Ex-fiscales conocen tácticas del gobierno',
      'Disponible 24/7 para emergencias',
      'Experiencia en casos criminales complejos',
      'Red de expertos y recursos',
      'Luchamos hasta el final - apelaciones federales',
      'Totalmente bilingüe - entendemos su miedo',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Conozca Sus Derechos con ICE</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Derechos Constitucionales - Úselos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Tiene Derecho A:</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Permanecer en silencio</li>
                <li>✓ NO abrir la puerta sin orden judicial</li>
                <li>✓ NO firmar nada</li>
                <li>✓ Hablar con abogado</li>
                <li>✓ Hacer llamadas telefónicas</li>
                <li>✓ Rechazar registro voluntario</li>
                <li>✓ Audiencia ante juez</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">NUNCA Haga Esto:</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✗ Mentir o dar documentos falsos</li>
                <li>✗ Firmar salida voluntaria sin abogado</li>
                <li>✗ Hablar de estatus migratorio</li>
                <li>✗ Correr o resistir arresto</li>
                <li>✗ Llevar documentos de otro país</li>
                <li>✗ Ignorar citas de corte</li>
                <li>✗ Confiar en notarios o consultores</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Prioridades de ICE 2025</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Prioridad</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Riesgo</th>
                <th className="py-3 px-4">Defensa Posible</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Alta</td>
                <td className="py-3 px-4">Seguridad nacional/terrorismo</td>
                <td className="py-3 px-4">Crítico</td>
                <td className="py-3 px-4">Muy limitada</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Alta</td>
                <td className="py-3 px-4">Delitos graves/agravados</td>
                <td className="py-3 px-4">Muy alto</td>
                <td className="py-3 px-4">CAT, withholding</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Media</td>
                <td className="py-3 px-4">Cruces recientes frontera</td>
                <td className="py-3 px-4">Alto</td>
                <td className="py-3 px-4">Asilo, familia USC</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Media</td>
                <td className="py-3 px-4">Órdenes finales deportación</td>
                <td className="py-3 px-4">Alto</td>
                <td className="py-3 px-4">Reapertura, stay</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Baja</td>
                <td className="py-3 px-4">Sin crímenes, familia USC</td>
                <td className="py-3 px-4">Menor</td>
                <td className="py-3 px-4">Múltiples opciones</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Plan de Emergencia Familiar</h2>
        <div className="bg-blue-900/20 p-8 rounded-lg border border-blue-500/30">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Prepárese Antes de que ICE Llegue</h3>
          <ul className="text-gray-300 space-y-2">
            <li>📁 Guarde documentos importantes en lugar seguro</li>
            <li>👨‍⚖️ Tenga número de abogado visible en casa</li>
            <li>📝 Poder notarial para cuidado de hijos</li>
            <li>💰 Acceso a cuentas bancarias para familia</li>
            <li>📱 Memorice números importantes (no dependa del celular)</li>
            <li>🏠 Plan para casa, auto, mascotas si es detenido</li>
            <li>👶 Instrucciones claras para escuela de hijos</li>
            <li>📄 Copias de todos los documentos de inmigración</li>
          </ul>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Deportación"
      subtitle="Defensa Agresiva Contra Remoción"
      description="Luchamos incansablemente para mantener familias unidas y detener deportaciones."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
