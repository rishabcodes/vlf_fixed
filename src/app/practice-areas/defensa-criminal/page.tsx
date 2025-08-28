import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Defensa Criminal | NC FL | Vasquez Law Firm',
  description: 'Abogados defensores criminales en Raleigh Charlotte Orlando. DUI/DWI, drogas, violencia doméstica, robo. Defensa agresiva. 919-569-5882',
  keywords: 'abogado criminal, abogado defensa criminal, abogado DUI DWI, abogado drogas, abogado violencia domestica, abogado criminal cerca de mi, defensa criminal Raleigh, abogado penal Charlotte, defensor criminal Orlando',
  openGraph: {
    title: 'Abogado de Defensa Criminal | Protegemos Sus Derechos | Vasquez Law',
    description: 'Defensa agresiva contra cargos criminales. Protegemos su libertad y futuro. Consulta confidencial.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function DefensaCriminalPage() {
  const services = [
    {
      title: 'DUI/DWI',
      description: 'Conducir bajo influencia',
      icon: '🚗',
      features: [
        'Primera ofensa DUI',
        'DUI múltiples',
        'DUI con lesiones',
        'Negarse a soplar',
        'Licencia suspendida',
        'DUI drogas',
      ],
    },
    {
      title: 'Cargos de Drogas',
      description: 'Posesión y distribución',
      icon: '💊',
      features: [
        'Posesión simple',
        'Posesión con intención',
        'Tráfico de drogas',
        'Manufactura',
        'Conspiración',
        'Parafernalia',
      ],
    },
    {
      title: 'Violencia Doméstica',
      description: 'Cargos familiares',
      icon: '🏠',
      features: [
        'Asalto doméstico',
        'Órdenes de protección',
        'Violación de órdenes',
        'Acoso/Stalking',
        'Amenazas',
        'Abuso infantil',
      ],
    },
    {
      title: 'Robo y Hurto',
      description: 'Delitos de propiedad',
      icon: '💰',
      features: [
        'Hurto menor (shoplifting)',
        'Hurto mayor',
        'Robo con allanamiento',
        'Robo de identidad',
        'Fraude',
        'Cheques sin fondos',
      ],
    },
    {
      title: 'Asalto y Agresión',
      description: 'Delitos violentos',
      icon: '⚡',
      features: [
        'Asalto simple',
        'Asalto agravado',
        'Asalto con arma',
        'Peleas',
        'Amenazas terroristas',
        'Lesiones graves',
      ],
    },
    {
      title: 'Delitos Federales',
      description: 'Casos en corte federal',
      icon: '⚖️',
      features: [
        'Conspiración federal',
        'Fraude federal',
        'Crímenes de armas',
        'Inmigración criminal',
        'Lavado de dinero',
        'RICO',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué hago si me arrestan?',
      answer: 'Sus acciones inmediatas son críticas: (1) Permanezca en SILENCIO - no hable sobre su caso, (2) NO consienta búsquedas de su persona, auto o casa, (3) Pida un ABOGADO inmediatamente y repítalo, (4) NO firme nada excepto promesa de aparecer, (5) Memorice: "Invoco mi derecho a permanecer callado y quiero un abogado", (6) Sea respetuoso pero firme en sus derechos, (7) Llame a un abogado apenas salga - tenemos línea 24/7: 919-569-5882. La policía está entrenada para hacerlo hablar - TODO lo que diga será usado en su contra.',
    },
    {
      question: '¿Necesito un abogado si soy inocente?',
      answer: 'SÍ, especialmente si es inocente. Personas inocentes son condenadas regularmente por: no entender el sistema legal, hacer declaraciones malinterpretadas, confiar en que "la verdad saldrá a luz", no preservar evidencia de inocencia, aceptar acuerdos por miedo. Un abogado protege sus derechos, investiga su defensa, negocia con fiscales, conoce las leyes complejas, evita errores costosos. NUNCA hable con policía o fiscales sin abogado - incluso declaraciones inocentes pueden ser torcidas.',
    },
    {
      question: '¿Cuáles son las consecuencias de una condena criminal?',
      answer: 'Van mucho más allá de cárcel o multas. Consecuencias inmediatas: cárcel/prisión, multas, probatoria, servicio comunitario, clases obligatorias. Consecuencias a largo plazo: antecedentes criminales permanentes, pérdida de empleo actual y dificultad para encontrar trabajo, pérdida de licencias profesionales, inelegible para vivienda pública, pérdida de derechos (votar, armas), deportación si no es ciudadano, pérdida de custodia de hijos, inelegible para préstamos estudiantiles. Una condena lo persigue DE POR VIDA.',
    },
    {
      question: '¿Qué es un plea bargain y debo aceptarlo?',
      answer: 'Un plea bargain es acuerdo con fiscal para declararse culpable a cambio de cargos reducidos o sentencia menor. Ventajas: evita riesgo de juicio, sentencia predecible, resolución más rápida, puede evitar cárcel. Desventajas: queda con antecedentes, renuncia a derechos de juicio, puede afectar inmigración, admite culpabilidad. NUNCA acepte sin abogado - fiscales ofrecen peores tratos a personas sin representación. Evaluamos si el trato es justo basado en evidencia, leyes y experiencia con jueces locales.',
    },
    {
      question: '¿Puedo limpiar mis antecedentes criminales?',
      answer: 'Depende del cargo y estado. Carolina del Norte: Expungement disponible para algunos delitos menores, primera ofensa, cargos desestimados. Debe esperar años después de completar sentencia. Florida: Más restrictivo - solo un expungement por vida, muchos delitos no califican. Proceso toma 6-12 meses. NO califican: delitos sexuales, violencia doméstica, DUI (en Florida), delitos graves violentos. El expungement elimina arresto y condena de récord público pero algunas agencias mantienen registros.',
    },
    {
      question: '¿Cuánto cuesta un abogado criminal?',
      answer: 'Los honorarios varían según complejidad del caso. Casos típicos: DUI primera ofensa: $2,500-$5,000. Delitos menores: $2,000-$5,000. Felonías: $5,000-$25,000+. Casos federales: $15,000-$100,000+. Ofrecemos planes de pago para hacer defensa accesible. Considere el costo de NO tener abogado: condenas más severas, antecedentes permanentes, pérdida de trabajo, deportación. Invertir en defensa adecuada protege su futuro. Consulta inicial para discutir opciones y costos.',
    },
  ];

  const content = {
    introduction: `Enfrentar cargos criminales es aterrador - su libertad, reputación y futuro están en riesgo. Necesita un defensor agresivo que conozca el sistema y luche incansablemente por usted. Vasquez Law Firm tiene más de 25 años defendiendo clientes contra todo tipo de cargos criminales en Carolina del Norte y Florida. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden que buenos personas cometen errores y que todos merecen una defensa fuerte. Desde DUI hasta delitos graves, protegemos sus derechos constitucionales y trabajamos para minimizar o eliminar las consecuencias. No enfrente el sistema solo - su futuro depende de la defensa que elija hoy.`,

    processTitle: 'Proceso de Defensa Criminal',
    process: [
      {
        step: '1',
        title: 'Consulta Urgente',
        description: 'Evaluación inmediata del caso',
      },
      {
        step: '2',
        title: 'Investigación',
        description: 'Examinar evidencia y testigos',
      },
      {
        step: '3',
        title: 'Estrategia',
        description: 'Desarrollar defensa más fuerte',
      },
      {
        step: '4',
        title: 'Negociación',
        description: 'Buscar reducción o desestimación',
      },
      {
        step: '5',
        title: 'Juicio/Resolución',
        description: 'Defender en corte si necesario',
      },
    ],

    urgencyTitle: '⚠️ Cada Minuto Cuenta - Sus Derechos Están en Riesgo',
    urgencyMessage: 'Evidencia desaparece. Testigos olvidan. Fiscales construyen su caso. Plazos legales cortos. Actúe AHORA para proteger su defensa.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Su Defensa',
    whyChoosePoints: [
      'Más de 25 años de experiencia criminal',
      'Ex-fiscales en nuestro equipo',
      'Conocemos jueces y fiscales locales',
      'Defensa agresiva sin temor a juicio',
      'Disponible 24/7 para emergencias',
      'Totalmente bilingüe - español e inglés',
      'Manejamos casos estatales y federales',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Penalidades por Cargos Comunes en NC y FL</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Cargo</th>
                <th className="py-3 px-4">Clasificación</th>
                <th className="py-3 px-4">Cárcel Máxima</th>
                <th className="py-3 px-4">Otras Consecuencias</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">DUI Primera</td>
                <td className="py-3 px-4">Misdemeanor</td>
                <td className="py-3 px-4">60 días-1 año</td>
                <td className="py-3 px-4">Licencia suspendida, clases, seguro SR-22</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Posesión Marihuana</td>
                <td className="py-3 px-4">Misdemeanor</td>
                <td className="py-3 px-4">30 días-1 año</td>
                <td className="py-3 px-4">Multas, pérdida ayuda estudiantil</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Violencia Doméstica</td>
                <td className="py-3 px-4">Mis/Felony</td>
                <td className="py-3 px-4">60 días-5 años</td>
                <td className="py-3 px-4">Orden protección, pérdida armas, custodia</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Hurto Mayor</td>
                <td className="py-3 px-4">Felony</td>
                <td className="py-3 px-4">1-10 años</td>
                <td className="py-3 px-4">Restitución, pérdida derechos civiles</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Tráfico Drogas</td>
                <td className="py-3 px-4">Felony</td>
                <td className="py-3 px-4">3-30 años</td>
                <td className="py-3 px-4">Mínimos mandatorios, confiscación bienes</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Asalto Agravado</td>
                <td className="py-3 px-4">Felony</td>
                <td className="py-3 px-4">2-20 años</td>
                <td className="py-3 px-4">Registro agresor, restricciones empleo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Penalidades varían según circunstancias y antecedentes</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Sus Derechos Constitucionales</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Durante el Arresto</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Derecho a permanecer callado (5ta Enmienda)</li>
              <li>✓ Derecho a un abogado (6ta Enmienda)</li>
              <li>✓ Protección contra búsquedas ilegales (4ta)</li>
              <li>✓ Derecho a saber los cargos</li>
              <li>✓ Derecho a llamada telefónica</li>
              <li>✓ Protección contra fuerza excesiva</li>
              <li>✓ Derecho a intérprete si necesario</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">En la Corte</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Presunción de inocencia</li>
              <li>✓ Derecho a juicio rápido</li>
              <li>✓ Derecho a juicio por jurado</li>
              <li>✓ Derecho a confrontar testigos</li>
              <li>✓ Derecho a presentar defensa</li>
              <li>✓ Protección contra doble juicio</li>
              <li>✓ Derecho a apelar condena</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Defensas Comunes en Casos Criminales</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Estrategias de Defensa</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Defensas Constitucionales</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Búsqueda y captura ilegal</li>
                <li>• Miranda no leído</li>
                <li>• Derecho a abogado violado</li>
                <li>• Identificación sugestiva</li>
                <li>• Proceso debido violado</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Defensas de Fondo</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Identidad equivocada</li>
                <li>• Defensa propia</li>
                <li>• Coartada</li>
                <li>• Consentimiento</li>
                <li>• Necesidad/Coacción</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Impacto Migratorio de Condenas Criminales</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Consecuencias para No-Ciudadanos</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-red-400 font-bold">Deportación Automática</h4>
              <p className="text-gray-300 text-sm">Delitos agravados, drogas, armas, violencia doméstica, crimes morales pueden resultar en deportación mandatoria</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">Inadmisibilidad</h4>
              <p className="text-gray-300 text-sm">Previene ajuste de estatus, ciudadanía, o reentrada legal a Estados Unidos</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="text-orange-400 font-bold">Detención Mandatoria</h4>
              <p className="text-gray-300 text-sm">ICE debe detener sin fianza para ciertos delitos durante proceso de deportación</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-purple-400 font-bold">Pérdida de Beneficios</h4>
              <p className="text-gray-300 text-sm">Inelegible para DACA, TPS, asilo, cancelación de deportación</p>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 font-bold">⚠️ SIEMPRE consulte impacto migratorio antes de aceptar cualquier acuerdo</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Qué Esperar en Cada Etapa</h2>
        <div className="space-y-4">
          <div className="bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-blue-400 font-bold">1. Arresto y Fianza</h3>
            <p className="text-gray-300 text-sm">Procesamiento, huellas, fotos. Audiencia de fianza en 24-48 horas. Podemos pelear por fianza baja o reconocimiento propio.</p>
          </div>
          <div className="bg-green-900/20 p-4 rounded-lg">
            <h3 className="text-green-400 font-bold">2. Primera Aparición</h3>
            <p className="text-gray-300 text-sm">Lectura de cargos. NO se declara culpable aquí. Establecer próxima fecha. Tiempo para contratar abogado privado.</p>
          </div>
          <div className="bg-purple-900/20 p-4 rounded-lg">
            <h3 className="text-purple-400 font-bold">3. Descubrimiento</h3>
            <p className="text-gray-300 text-sm">Recibir evidencia del fiscal. Investigar defensa. Entrevistar testigos. Buscar videos. Momento crítico del caso.</p>
          </div>
          <div className="bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="text-yellow-400 font-bold">4. Negociaciones</h3>
            <p className="text-gray-300 text-sm">Discutir posible acuerdo con fiscal. Mociones pre-juicio. Buscar desestimación o reducción de cargos.</p>
          </div>
          <div className="bg-red-900/20 p-4 rounded-lg">
            <h3 className="text-red-400 font-bold">5. Juicio o Acuerdo</h3>
            <p className="text-gray-300 text-sm">Si no hay acuerdo favorable, juicio. Selección de jurado, evidencia, testigos, veredicto. O aceptar mejor acuerdo posible.</p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Defensa Criminal"
      subtitle="Protegemos Su Libertad, Derechos y Futuro"
      description="Defensa agresiva y experimentada contra todo tipo de cargos criminales en Carolina del Norte y Florida."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
