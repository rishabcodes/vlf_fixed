import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado de Lesiones Personales | Accidentes NC FL | Vasquez Law Firm',
  description: 'Abogados de lesiones personales en Raleigh Charlotte Orlando. Accidentes de auto, resbalones, compensación. No paga si no gana. 919-569-5882',
  keywords: 'abogado de lesiones personales, abogado accidentes auto, abogado accidente trabajo, resbalon y caida abogado, accidente motocicleta, lesiones personales cerca de mi, abogado accidentes Raleigh, abogado lesiones Charlotte, abogado accidentes Orlando',
  openGraph: {
    title: 'Abogado de Lesiones Personales | Accidentes y Compensación | Vasquez Law',
    description: 'Recupere la compensación que merece. No paga honorarios si no ganamos su caso. Consulta gratis.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function LesionesPersonalesPage() {
  const services = [
    {
      title: 'Accidentes de Auto',
      description: 'Choques y colisiones vehiculares',
      icon: '🚗',
      features: [
        'Choques por detrás',
        'Accidentes en intersecciones',
        'Conductores distraídos',
        'Accidentes por exceso de velocidad',
        'Choques múltiples vehículos',
        'Accidentes con Uber/Lyft',
      ],
    },
    {
      title: 'Accidentes de Trabajo',
      description: 'Lesiones en el lugar de empleo',
      icon: '⚠️',
      features: [
        'Caídas desde altura',
        'Accidentes con maquinaria',
        'Lesiones de espalda',
        'Exposición a químicos',
        'Accidentes de construcción',
        'Lesiones por esfuerzo repetitivo',
      ],
    },
    {
      title: 'Resbalones y Caídas',
      description: 'Responsabilidad de locales',
      icon: '🏢',
      features: [
        'Pisos mojados sin señalización',
        'Escaleras defectuosas',
        'Iluminación inadecuada',
        'Aceras rotas o desniveladas',
        'Condiciones peligrosas en tiendas',
        'Caídas en propiedades privadas',
      ],
    },
    {
      title: 'Accidentes de Motocicleta',
      description: 'Lesiones graves en moto',
      icon: '🏍️',
      features: [
        'Choques con autos',
        'Accidentes por punto ciego',
        'Puertas abiertas (dooring)',
        'Defectos en el camino',
        'Conductores que no ceden paso',
        'Accidentes fatales',
      ],
    },
    {
      title: 'Muerte Injusta',
      description: 'Pérdida de seres queridos',
      icon: '🕊️',
      features: [
        'Accidentes fatales de tráfico',
        'Negligencia médica fatal',
        'Accidentes laborales mortales',
        'Productos defectuosos',
        'Ahogamientos prevenibles',
        'Compensación para familias',
      ],
    },
    {
      title: 'Negligencia Médica',
      description: 'Errores médicos y hospitalarios',
      icon: '🏥',
      features: [
        'Diagnóstico erróneo',
        'Errores quirúrgicos',
        'Medicación incorrecta',
        'Lesiones durante parto',
        'Falta de tratamiento adecuado',
        'Infecciones hospitalarias',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto vale mi caso de lesiones personales?',
      answer: 'El valor depende de varios factores: gastos médicos actuales y futuros, salarios perdidos y capacidad de ganar reducida, dolor y sufrimiento experimentado, impacto en su calidad de vida, permanencia de las lesiones, responsabilidad clara del culpable. Los casos pueden variar desde compensaciones modestas hasta millones en casos graves. Evaluamos cada caso individualmente. No acepte la primera oferta del seguro sin consultar un abogado.',
    },
    {
      question: '¿Cuánto tiempo tengo para presentar una demanda?',
      answer: 'En Carolina del Norte y Florida generalmente tiene: 3 años para lesiones personales por accidentes, 2 años para muerte injusta, 2 años para negligencia médica. PERO hay excepciones importantes: casos contra el gobierno tienen plazos más cortos (6 meses-1 año), menores de edad tienen tiempo adicional, lesiones que se descubren tarde pueden extender el plazo. No espere - evidencia se pierde y testigos olvidan. Consulte inmediatamente.',
    },
    {
      question: '¿Qué pasa si tuve culpa parcial en el accidente?',
      answer: 'Las leyes varían por estado. Carolina del Norte: Negligencia contributiva - si tuvo ANY culpa (incluso 1%), no puede recuperar nada. MUY estricto. Florida: Negligencia comparativa modificada - puede recuperar si tuvo menos del 51% de culpa, pero su compensación se reduce por su porcentaje de culpa. Por esto es CRÍTICO tener un abogado que pueda probar que usted no tuvo culpa o minimizar su responsabilidad.',
    },
    {
      question: '¿Cuánto cobran por sus servicios legales?',
      answer: 'Trabajamos con una estructura basada en resultados - NO PAGA si no ganamos. Nuestros honorarios se basan en el éxito del caso, con tarifas diferentes si resolvemos sin juicio versus si vamos a juicio. Usted no paga nada por adelantado. Nosotros cubrimos todos los gastos del caso (médicos expertos, investigadores, documentos). Solo cobramos si recuperamos compensación para usted. La consulta inicial es GRATIS. Este sistema permite que todos tengan acceso a justicia sin importar su situación económica.',
    },
    {
      question: '¿Debo hablar con la compañía de seguros?',
      answer: 'NO hable con el seguro del culpable sin un abogado. Ellos graban todo y buscan razones para negar o reducir su reclamo. Pueden parecer amables pero trabajan CONTRA usted. Frases comunes que usan: "¿Cómo se siente hoy?" (para minimizar lesiones), "¿Puede describir el accidente?" (buscando admisiones de culpa). Solo diga: "Hablaré después de consultar con mi abogado". Con su propio seguro, reporte el accidente pero sea cuidadoso con detalles.',
    },
    {
      question: '¿Qué debo hacer inmediatamente después de un accidente?',
      answer: 'Pasos críticos: (1) Busque atención médica inmediata - su salud es prioridad y crea registro médico, (2) Llame a la policía - obtenga reporte oficial, (3) Tome fotos de todo - vehículos, lesiones, escena, condiciones, (4) Obtenga información de testigos - nombres y teléfonos, (5) NO admita culpa ni diga "estoy bien", (6) Guarde toda evidencia - ropa dañada, recibos, (7) Contacte un abogado antes de hablar con seguros, (8) Mantenga diario de dolor y limitaciones diarias.',
    },
  ];

  const content = {
    introduction: `Cuando sufre lesiones por la negligencia de otros, merece compensación justa por sus gastos médicos, salarios perdidos, dolor y sufrimiento. Con más de 25 años luchando por víctimas de accidentes, Vasquez Law Firm ha recuperado millones de dólares para clientes en Carolina del Norte y Florida. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden el impacto devastador que un accidente puede tener en su vida y familia. Trabajamos con honorarios de contingencia - usted no paga nada a menos que ganemos su caso. No deje que las compañías de seguros se aprovechen de usted - obtenga la representación agresiva que merece.`,

    processTitle: 'Proceso de Reclamo por Lesiones',
    process: [
      {
        step: '1',
        title: 'Consulta Gratuita',
        description: 'Evaluamos su caso sin costo',
      },
      {
        step: '2',
        title: 'Investigación',
        description: 'Recopilamos evidencia y testigos',
      },
      {
        step: '3',
        title: 'Tratamiento Médico',
        description: 'Coordinamos atención necesaria',
      },
      {
        step: '4',
        title: 'Negociación',
        description: 'Luchamos por compensación máxima',
      },
      {
        step: '5',
        title: 'Resolución',
        description: 'Acuerdo o juicio para su beneficio',
      },
    ],

    urgencyTitle: '⚠️ El Tiempo es Crítico - Evidencia Se Pierde',
    urgencyMessage: 'Videos de seguridad se borran en días. Testigos olvidan detalles. Marcas de frenos desaparecen. Plazos legales expiran. Llame HOY para proteger sus derechos.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Su Caso',
    whyChoosePoints: [
      'NO paga si NO ganamos - Honorarios de contingencia',
      'Más de 25 años de experiencia en lesiones',
      'Millones recuperados para clientes',
      'Atención personalizada en español',
      'Disponible 24/7 para emergencias',
      'Red de médicos y especialistas',
      'Lucha agresiva contra aseguradoras',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tipos de Compensación Disponible</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Daños Económicos</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Gastos médicos pasados y futuros</li>
              <li>✓ Salarios perdidos y capacidad reducida</li>
              <li>✓ Rehabilitación y terapia física</li>
              <li>✓ Medicamentos y equipo médico</li>
              <li>✓ Modificaciones al hogar/vehículo</li>
              <li>✓ Cuidado en casa o asistencia</li>
              <li>✓ Gastos de transporte médico</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Daños No Económicos</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Dolor y sufrimiento</li>
              <li>✓ Angustia emocional</li>
              <li>✓ Pérdida de disfrute de vida</li>
              <li>✓ Desfiguración o cicatrices</li>
              <li>✓ Pérdida de consorcio</li>
              <li>✓ Humillación y vergüenza</li>
              <li>✓ Daños punitivos (casos graves)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Estadísticas de Accidentes 2025</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Tipo de Accidente</th>
                <th className="py-3 px-4">NC Anual</th>
                <th className="py-3 px-4">FL Anual</th>
                <th className="py-3 px-4">Severidad Típica</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Accidentes de Auto</td>
                <td className="py-3 px-4">130,000+</td>
                <td className="py-3 px-4">400,000+</td>
                <td className="py-3 px-4">Leve a Moderada</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Accidentes de Trabajo</td>
                <td className="py-3 px-4">35,000+</td>
                <td className="py-3 px-4">85,000+</td>
                <td className="py-3 px-4">Moderada a Grave</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Resbalones y Caídas</td>
                <td className="py-3 px-4">25,000+</td>
                <td className="py-3 px-4">65,000+</td>
                <td className="py-3 px-4">Leve a Moderada</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Motocicletas</td>
                <td className="py-3 px-4">3,500+</td>
                <td className="py-3 px-4">9,000+</td>
                <td className="py-3 px-4">Grave a Catastrófica</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Muerte Injusta</td>
                <td className="py-3 px-4">1,500+</td>
                <td className="py-3 px-4">3,500+</td>
                <td className="py-3 px-4">Catastrófica</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Datos aproximados basados en estadísticas estatales 2024-2025</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Qué Hacer y Qué NO Hacer Después del Accidente</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-green-400 font-bold mb-4">✓ SÍ HACER</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Buscar atención médica inmediata</li>
                <li>• Llamar a la policía</li>
                <li>• Tomar fotos de todo</li>
                <li>• Obtener información de testigos</li>
                <li>• Guardar toda evidencia</li>
                <li>• Reportar a SU seguro</li>
                <li>• Mantener registro de gastos</li>
                <li>• Contactar un abogado rápido</li>
                <li>• Seguir tratamiento médico</li>
              </ul>
            </div>
            <div>
              <h3 className="text-red-400 font-bold mb-4">✗ NO HACER</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• NO admitir culpa</li>
                <li>• NO decir "estoy bien"</li>
                <li>• NO firmar nada del seguro</li>
                <li>• NO dar declaración grabada</li>
                <li>• NO aceptar primera oferta</li>
                <li>• NO publicar en redes sociales</li>
                <li>• NO retrasar tratamiento</li>
                <li>• NO exagerar lesiones</li>
                <li>• NO hablar del caso públicamente</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Proceso con las Compañías de Seguros</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Tácticas Comunes de las Aseguradoras</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">Oferta Rápida y Baja</h4>
              <p className="text-gray-300 text-sm">Ofrecen poco dinero rápido antes de que conozca el alcance de sus lesiones</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="text-orange-400 font-bold">Minimizar Lesiones</h4>
              <p className="text-gray-300 text-sm">Argumentan que sus lesiones son menores o preexistentes</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-red-400 font-bold">Culparlo a Usted</h4>
              <p className="text-gray-300 text-sm">Buscan cualquier excusa para decir que usted tuvo culpa</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-purple-400 font-bold">Retrasar el Proceso</h4>
              <p className="text-gray-300 text-sm">Esperan que se desespere y acepte menos dinero</p>
            </div>
          </div>
          <p className="text-white mt-4 font-bold">Con un abogado, las ofertas aumentan significativamente en promedio</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Casos Recientes Exitosos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Caso Exitoso</h3>
            <p className="text-gray-300 text-sm">Accidente de motocicleta en Raleigh. Cliente sufrió fractura de pierna y lesiones de espalda.</p>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-2">Caso Exitoso</h3>
            <p className="text-gray-300 text-sm">Resbalón en supermercado Charlotte. Cirugía de rodilla requerida.</p>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-2">Caso Exitoso</h3>
            <p className="text-gray-300 text-sm">Accidente de camión en Orlando. Lesiones múltiples y pérdida de trabajo.</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Resultados anteriores no garantizan resultados similares</p>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado de Lesiones Personales"
      subtitle="No Paga Si No Gana - Luchamos Por Su Compensación"
      description="Representación agresiva para víctimas de accidentes con abogados experimentados y compasivos."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
