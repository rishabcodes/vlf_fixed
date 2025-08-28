import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Reclamos Negados | Workers Comp NC FL | Vasquez Law Firm',
  description: 'Apelamos reclamos negados de compensación laboral. Luchamos contra aseguradoras. No se rinda. 919-569-5882',
  keywords: 'reclamo negado, workers comp negado, apelacion compensacion laboral, abogado reclamo negado, compensacion denegada, apelacion workers comp Raleigh, reclamo negado Charlotte, compensacion negada Orlando',
  openGraph: {
    title: 'Abogado Reclamos Negados | Apelaciones Workers Comp | Vasquez Law',
    description: 'Su reclamo fue negado pero tiene derechos. Apelamos y ganamos beneficios merecidos.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function ReclamosNegadosPage() {
  const services = [
    {
      title: 'Razones de Negación',
      description: 'Por qué niegan',
      icon: '❌',
      features: [
        'No es lesión de trabajo',
        'Reportado tarde',
        'Sin testigos',
        'Condición preexistente',
        'Prueba drogas positiva',
        'Documentación insuficiente',
      ],
    },
    {
      title: 'Proceso de Apelación',
      description: 'Pasos legales',
      icon: '⚖️',
      features: [
        'Revisar carta negación',
        'Reunir nueva evidencia',
        'Solicitar mediación',
        'Audiencia formal',
        'Testimonio médico',
        'Decisión del juez',
      ],
    },
    {
      title: 'Evidencia Crítica',
      description: 'Para ganar apelación',
      icon: '📋',
      features: [
        'Opinión médica independiente',
        'Declaraciones de testigos',
        'Videos de seguridad',
        'Records de seguridad',
        'Historial médico completo',
        'Documentación del trabajo',
      ],
    },
    {
      title: 'Tácticas de Seguro',
      description: 'Trucos comunes',
      icon: '🎭',
      features: [
        'Vigilancia privada',
        'Doctores de compañía',
        'Minimizar lesiones',
        'Demoras intencionales',
        'Ofertas bajas',
        'Presión para regresar',
      ],
    },
    {
      title: 'Sus Derechos',
      description: 'Protecciones legales',
      icon: '🛡️',
      features: [
        'Segunda opinión médica',
        'Cambiar de doctor',
        'Representación legal',
        'Evidencia adicional',
        'Audiencia justa',
        'No represalias',
      ],
    },
    {
      title: 'Plazos Críticos',
      description: 'No pierda tiempo',
      icon: '⏰',
      features: [
        'NC: 2 años file reclamo',
        'FL: 2 años desde lesión',
        'Apelación: 30-60 días',
        'Mediación: disponible rápido',
        'Audiencia: meses espera',
        'Cada día cuenta',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Por qué negaron mi reclamo de compensación laboral?',
      answer: 'Razones más comunes: (1) Reportó tarde - NC/FL requieren notificación en 30 días, (2) Sin testigos del accidente, (3) Inconsistencias en su historia, (4) Doctor dice no relacionado al trabajo, (5) Condición preexistente alegada, (6) Prueba de drogas/alcohol positiva, (7) Violación de política de seguridad. IMPORTANTE: negación inicial NO es final. Mayoría de negaciones pueden ser revertidas con evidencia apropiada y representación legal. Actúe rápido - plazos para apelar son estrictos.',
    },
    {
      question: '¿Puedo apelar si soy indocumentado?',
      answer: 'SÍ ABSOLUTAMENTE. Su estatus migratorio NO afecta su derecho a compensación laboral. Es ILEGAL que empleador o seguro niegue beneficios por estatus. Protecciones: no pueden reportarlo a ICE, no pueden despedirlo por reclamar, tiene mismos derechos que cualquier trabajador. PERO sea cuidadoso: use abogado que entienda ambas leyes (laboral e inmigración), no firme nada sin entender, documente todo. Hemos ganado casos para trabajadores indocumentados regularmente.',
    },
    {
      question: '¿Qué evidencia necesito para ganar apelación?',
      answer: 'Evidencia más fuerte: (1) Opinión médica independiente conectando lesión al trabajo, (2) Declaraciones juradas de testigos del accidente, (3) Videos/fotos del área de trabajo peligrosa, (4) Records mostrando reportó a tiempo, (5) Historial de tratamiento consistente, (6) Records de seguridad mostrando peligros conocidos, (7) Evidencia de lesiones similares de otros trabajadores. También importante: su testimonio creíble, seguir todo tratamiento médico, no exagerar pero tampoco minimizar, documentar pérdida de ingresos.',
    },
    {
      question: '¿Cuánto tiempo toma proceso de apelación?',
      answer: 'Varía por estado y complejidad: Mediación: 30-60 días después de solicitar, puede resolver rápido. Audiencia administrativa: 3-6 meses para fecha, decisión en 30-60 días. Apelación a corte superior: 6-12 meses adicionales. MIENTRAS TANTO: puede obtener tratamiento de emergencia, algunos doctores esperan pago, puede calificar para beneficios temporales. No se rinda por tiempo - beneficios pueden ser retroactivos. Abogado puede acelerar proceso y obtener beneficios de emergencia.',
    },
    {
      question: '¿Qué pasa si pierdo la apelación?',
      answer: 'Aún hay opciones: (1) Apelación a siguiente nivel - Commission Review, luego Court of Appeals, (2) Reabrir con nueva evidencia - nuevo diagnóstico, testigo encontrado, error procesal, (3) Demanda civil si tercero responsable, (4) Negociar acuerdo parcial, (5) Otros beneficios - disability, unemployment, Medicaid. IMPORTANTE: cada nivel tiene plazos estrictos (típicamente 30 días). Evalúe costo-beneficio con abogado. A veces mejor negociar que continuar peleando.',
    },
    {
      question: '¿Vale la pena contratar abogado para apelación?',
      answer: 'Estadísticas dicen SÍ rotundamente: trabajadores con abogado reciben 3-4 veces más beneficios. Razones: conocemos la ley y trucos de seguros, obtenemos evidencia médica correcta, preparamos testimonio efectivo, identificamos violaciones procesales, negociamos desde posición fuerte. Costo: típicamente 25% de beneficios obtenidos, NADA si no ganamos, consulta inicial gratis. Considere: sin abogado, 70%+ de apelaciones fallan. Con abogado experimentado, 60%+ ganan.',
    },
  ];

  const content = {
    introduction: `Una negación de compensación laboral no es el final - es el comienzo de la pelea. Las aseguradoras niegan reclamos válidos rutinariamente esperando que trabajadores se rindan. NO lo haga. Vasquez Law Firm ha revertido cientos de negaciones injustas, obteniendo millones en beneficios para trabajadores lesionados. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando conocen cada táctica de las aseguradoras y cómo derrotarlas. No importa su estatus migratorio - tiene derechos. No deje que una carta de negación le robe los beneficios médicos y salariales que merece. Peleamos hasta ganar.`,

    processTitle: 'Proceso de Apelación',
    process: [
      {
        step: '1',
        title: 'Evaluación',
        description: 'Revisar negación y opciones',
      },
      {
        step: '2',
        title: 'Evidencia',
        description: 'Reunir pruebas adicionales',
      },
      {
        step: '3',
        title: 'Apelación',
        description: 'Presentar documentos formales',
      },
      {
        step: '4',
        title: 'Audiencia',
        description: 'Presentar caso ante juez',
      },
      {
        step: '5',
        title: 'Victoria',
        description: 'Obtener beneficios merecidos',
      },
    ],

    urgencyTitle: '⚠️ Plazos de Apelación Son Cortos - Actúe YA',
    urgencyMessage: 'Típicamente 30-60 días para apelar. Evidencia desaparece. Testigos olvidan. Mientras espera, pierde beneficios.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Su Apelación',
    whyChoosePoints: [
      'Cientos de negaciones revertidas exitosamente',
      'Conocemos todos los trucos de aseguradoras',
      'Red de doctores independientes',
      'No cobramos si no ganamos',
      'Máxima compensación obtenida',
      'Protegemos trabajadores indocumentados',
      'Totalmente bilingüe español-inglés',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Razones Comunes de Negación y Cómo Combatirlas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">Negación: "No Relacionado al Trabajo"</h3>
            <p className="text-gray-300 text-sm mb-3">Aseguradora dice lesión no ocurrió en trabajo.</p>
            <h4 className="text-white font-bold mb-2">Cómo Combatir:</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Obtener declaraciones de testigos</li>
              <li>• Videos de seguridad</li>
              <li>• Opinión médica conectando al trabajo</li>
              <li>• Records de incidentes similares</li>
              <li>• Evidencia de condiciones peligrosas</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Negación: "Reportado Tarde"</h3>
            <p className="text-gray-300 text-sm mb-3">No notificó dentro de 30 días requeridos.</p>
            <h4 className="text-white font-bold mb-2">Cómo Combatir:</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Probar notificación verbal</li>
              <li>• Mostrar supervisor sabía</li>
              <li>• Evidencia de lesión gradual</li>
              <li>• Razón válida para retraso</li>
              <li>• Tratamiento médico temprano</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Sus Derechos Durante Apelación</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Derechos Médicos</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Segunda opinión</li>
                <li>• Elegir especialista</li>
                <li>• Tratamiento de emergencia</li>
                <li>• Copias de records</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Derechos Laborales</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• No pueden despedirlo</li>
                <li>• No represalias</li>
                <li>• Mantener posición</li>
                <li>• Acomodaciones razonables</li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 font-bold mb-2">Derechos Legales</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Representación legal</li>
                <li>• Audiencia justa</li>
                <li>• Presentar evidencia</li>
                <li>• Interrogar testigos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado Reclamos Negados"
      subtitle="No Acepte No Por Respuesta - Apelamos y Ganamos"
      description="Revertimos negaciones injustas de compensación laboral y obtenemos beneficios merecidos."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
