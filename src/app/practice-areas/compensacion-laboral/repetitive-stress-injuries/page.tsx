import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Lesiones Estrés Repetitivo | Workers Comp NC FL | Vasquez Law Firm',
  description: 'Compensación por túnel carpal, tendinitis, lesiones por movimiento repetitivo. 919-569-5882',
  keywords: 'estres repetitivo, tunel carpal español, carpal tunnel, tendinitis, lesiones repetitivas, RSI workers comp, sindrome tunel carpal Raleigh, repetitive stress Charlotte, lesiones repetitivas Orlando',
  openGraph: {
    title: 'Abogado Lesiones Estrés Repetitivo | Túnel Carpal | Vasquez Law',
    description: 'Ayuda legal para trabajadores con lesiones por movimientos repetitivos y túnel carpal.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function LesionesEstresRepetitivoPage() {
  const services = [
    {
      title: 'Túnel Carpal',
      description: 'Síndrome más común',
      icon: '🤚',
      features: [
        'Dolor/entumecimiento manos',
        'Hormigueo dedos',
        'Debilidad agarre',
        'Trabajo línea ensamblaje',
        'Teclear/Data entry',
        'Cirugía liberación',
      ],
    },
    {
      title: 'Tendinitis',
      description: 'Inflamación tendones',
      icon: '💪',
      features: [
        'Codo de tenista',
        'Hombro congelado',
        'Tendinitis Aquiles',
        'De Quervain muñeca',
        'Trigger finger',
        'Bursitis cadera/rodilla',
      ],
    },
    {
      title: 'Espalda/Cuello',
      description: 'Columna vertebral',
      icon: '🦴',
      features: [
        'Hernias disco gradual',
        'Degeneración disco',
        'Estenosis espinal',
        'Ciática crónica',
        'Dolor cuello crónico',
        'Radiculopatía',
      ],
    },
    {
      title: 'Industrias Riesgo',
      description: 'Trabajos afectados',
      icon: '🏭',
      features: [
        'Empaque/Procesamiento',
        'Líneas ensamblaje',
        'Construcción',
        'Limpieza repetitiva',
        'Cocinas/Restaurantes',
        'Agricultura cosecha',
      ],
    },
    {
      title: 'Diagnóstico',
      description: 'Pruebas médicas',
      icon: '🏥',
      features: [
        'EMG/Conducción nerviosa',
        'MRI para tejidos',
        'Rayos X estructuras',
        'Ultrasonido tendones',
        'Evaluación ergonómica',
        'Test provocativos',
      ],
    },
    {
      title: 'Tratamiento',
      description: 'Opciones médicas',
      icon: '💊',
      features: [
        'Terapia física',
        'Inyecciones cortisona',
        'Férulas/Soportes',
        'Medicamentos dolor',
        'Cirugía si severo',
        'Modificación trabajo',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cómo sé si mi dolor es lesión por estrés repetitivo del trabajo?',
      answer: 'Señales clave: dolor que empeora durante jornada laboral y mejora en descanso, hormigueo/entumecimiento en manos/brazos después de trabajar, dolor que comenzó gradualmente no por accidente específico, mismo movimiento repetido cientos/miles veces al día, compañeros con síntomas similares. Ejemplos comunes: empacadores con túnel carpal, cocineros con tendinitis codo, limpiadores con problemas hombro, trabajadores línea con problemas muñeca. IMPORTANTE: no necesita accidente específico - el trabajo repetitivo ES la causa. Documente cuántas veces hace movimiento, peso que maneja, posiciones incómodas.',
    },
    {
      question: '¿Por qué las aseguradoras niegan reclamos de estrés repetitivo?',
      answer: 'Tácticas comunes de negación: (1) "No es del trabajo" - dicen es artritis o edad, (2) "No hay accidente específico" - ignoran que ley cubre lesiones graduales, (3) "Condición preexistente" - aunque trabajo empeoró condición, (4) "No reportado a tiempo" - aprovechan que síntomas son graduales, (5) "No hay evidencia objetiva" - aunque EMG/MRI muestren daño. REALIDAD: lesiones repetitivas SON compensables. Ley reconoce desgaste gradual. Empleador creó condiciones. Nosotros sabemos cómo ganar estos casos difíciles.',
    },
    {
      question: '¿Cuándo debo reportar lesión por movimiento repetitivo?',
      answer: 'INMEDIATAMENTE cuando: dolor interfiere con trabajo, necesita medicamento para continuar, síntomas persisten fuera trabajo, doctor menciona posible conexión laboral. Plazos legales: NC/FL requieren notificación en 30 días desde que "razonablemente supo" que condición es del trabajo. PROBLEMA: síntomas graduales confunden. SOLUCIÓN: reporte cuando sospeche conexión. Diga: "Creo que mi dolor puede ser del trabajo repetitivo". Esto protege sus derechos. Peor error: esperar hasta que dolor sea insoportable - evidencia se pierde, plazos vencen.',
    },
    {
      question: '¿Puedo obtener cirugía de túnel carpal por workers comp?',
      answer: 'SÍ si prueba conexión laboral. Proceso típico: (1) Tratamiento conservador primero - férulas, terapia, inyecciones 6-12 semanas, (2) Si falla, EMG confirma daño nervioso moderado/severo, (3) Cirujano recomienda liberación túnel carpal, (4) Aseguradora puede requerir segunda opinión. Después cirugía: 4-6 semanas recuperación, terapia física, restricciones permanentes posibles, rating incapacidad 5-15% mano. CUIDADO: aseguradora intentará negar diciendo "degenerativo". Necesita doctor que conecte específicamente a trabajo repetitivo.',
    },
    {
      question: '¿Qué pasa si no puedo hacer mi trabajo por lesión repetitiva?',
      answer: 'Opciones disponibles: (1) RESTRICCIONES TEMPORALES - trabajo liviano mientras recupera, empleador debe acomodar o pagar TTD completo. (2) RESTRICCIONES PERMANENTES - si no puede volver a trabajo anterior: vocacional rehabilitation, reentrenamiento nueva carrera, búsqueda trabajo asistida, compensación por pérdida capacidad ganancia. (3) INCAPACIDAD - si múltiples partes afectadas severamente. Empleador NO puede despedirlo por lesión compensable. Si no hay trabajo liviano disponible, recibe 66.67% salario. Acuerdos consideran futura pérdida de ingresos.',
    },
    {
      question: '¿Las lesiones de ambas manos/brazos están cubiertas?',
      answer: 'SÍ ABSOLUTAMENTE. Bilateral (ambos lados) común en estrés repetitivo porque: usa ambas manos en trabajo, compensación causa problemas lado opuesto, mismo movimiento afecta ambos lados. Beneficios se calculan SEPARADAMENTE para cada extremidad. Ejemplo: 10% pérdida mano derecha + 10% izquierda = 40 semanas beneficios total. Cirugías ambas manos cubiertas (usualmente una primero, recuperar, luego otra). Mayor compensación por afectación bilateral. No deje que aseguradora minimice - reclame TODAS las partes afectadas.',
    },
  ];

  const content = {
    introduction: `Las lesiones por estrés repetitivo destruyen silenciosamente las manos, brazos y espaldas de miles de trabajadores latinos cada día. Empacadores, cocineros, limpiadores, trabajadores de línea - todos sacrifican sus cuerpos haciendo los mismos movimientos miles de veces. El túnel carpal, tendinitis y otras lesiones repetitivas NO son "parte del trabajo" - son lesiones compensables que merecen tratamiento médico completo y compensación salarial. Vasquez Law Firm lucha por trabajadores cuyas manos son su herramienta de supervivencia. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden que sin sus manos, no puede mantener a su familia. No acepte el dolor como normal - la ley lo protege.`,

    processTitle: 'Proceso para Lesiones Repetitivas',
    process: [
      {
        step: '1',
        title: 'Documentar',
        description: 'Movimientos y síntomas',
      },
      {
        step: '2',
        title: 'Reportar',
        description: 'Notificar empleador',
      },
      {
        step: '3',
        title: 'Diagnóstico',
        description: 'Evaluación médica completa',
      },
      {
        step: '4',
        title: 'Tratamiento',
        description: 'Conservador o cirugía',
      },
      {
        step: '5',
        title: 'Compensación',
        description: 'Beneficios y restricciones',
      },
    ],

    urgencyTitle: '⚠️ Cada Día de Retraso Empeora el Daño',
    urgencyMessage: 'Nervios y tendones sufren daño permanente. Tratamiento temprano previene cirugía. No normalice el dolor.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Lesiones Repetitivas',
    whyChoosePoints: [
      'Expertos en probar causalidad laboral gradual',
      'Vencemos negaciones por "degenerativo" o "edad"',
      'Red de especialistas en medicina ocupacional',
      'Documentamos correctamente trabajo repetitivo',
      'Máxima compensación por pérdida funcional',
      'Protegemos su trabajo durante tratamiento',
      'Totalmente bilingüe español-inglés',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Movimientos de Alto Riesgo por Industria</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Empaque/Procesamiento</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Cortar pollo/carne - 10,000+ cortes/día</li>
              <li>• Empacar productos - flexión muñeca constante</li>
              <li>• Línea ensamblaje - mismo movimiento 8 horas</li>
              <li>• Scanner/etiquetado - extensión brazo repetida</li>
              <li>• Levantar cajas - hombros/espalda</li>
              <li>• Clasificar productos - movimientos rápidos mano</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Restaurantes/Cocinas</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Picar vegetales - muñeca/codo</li>
              <li>• Amasar pan - manos/brazos</li>
              <li>• Servir platos - hombro elevado</li>
              <li>• Lavar platos - flexión constante</li>
              <li>• Preparación alimentos - de pie + brazos</li>
              <li>• Cargar bandejas - cuello/hombros</li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Limpieza/Mantenimiento</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Trapear/barrer - hombros/espalda</li>
              <li>• Limpiar ventanas - brazos elevados</li>
              <li>• Aspirar - empujar/jalar repetitivo</li>
              <li>• Fregar - presión en muñecas</li>
              <li>• Cambiar basuras - levantar repetitivo</li>
              <li>• Pulir pisos - vibración brazos</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Construcción</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Martillar - codo/hombro</li>
              <li>• Atornillar - muñeca rotación</li>
              <li>• Pintar - hombro/cuello</li>
              <li>• Instalar drywall - brazos elevados</li>
              <li>• Cavar - espalda/hombros</li>
              <li>• Vibración herramientas - manos/brazos</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Síntomas por Parte del Cuerpo</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Manos/Muñecas</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Hormigueo nocturno</li>
                <li>• Pérdida de agarre</li>
                <li>• Dolor al flexionar</li>
                <li>• Hinchazón muñeca</li>
                <li>• Dedos entumecidos</li>
                <li>• Calambres mano</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Codo/Hombro</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Dolor al levantar</li>
                <li>• Sensación ardor</li>
                <li>• Debilidad brazo</li>
                <li>• Chasquidos articulación</li>
                <li>• Rango movimiento limitado</li>
                <li>• Dolor nocturno</li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 font-bold mb-2">Espalda/Cuello</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Rigidez matutina</li>
                <li>• Espasmos musculares</li>
                <li>• Dolor ciático piernas</li>
                <li>• Dolores cabeza tensión</li>
                <li>• Fatiga muscular</li>
                <li>• Postura alterada</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 text-sm mt-6 font-bold text-center">
            ⚠️ NO ignore síntomas tempranos - El tratamiento preventivo evita daño permanente
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Factores de Riesgo en el Trabajo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Factor</th>
                <th className="py-3 px-4">Descripción</th>
                <th className="py-3 px-4">Lesiones Comunes</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Repetición</td>
                <td className="py-3 px-4">Mismo movimiento &gt;30 veces/minuto</td>
                <td className="py-3 px-4">Túnel carpal, tendinitis</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Fuerza</td>
                <td className="py-3 px-4">Agarrar fuerte, empujar, jalar</td>
                <td className="py-3 px-4">Trigger finger, epicondilitis</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Postura</td>
                <td className="py-3 px-4">Brazos elevados, flexión extrema</td>
                <td className="py-3 px-4">Hombro congelado, bursitis</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Vibración</td>
                <td className="py-3 px-4">Herramientas vibratorias</td>
                <td className="py-3 px-4">Síndrome Raynaud, neuropatía</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Duración</td>
                <td className="py-3 px-4">&gt;2 horas continuas sin descanso</td>
                <td className="py-3 px-4">Fatiga muscular, lesiones</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Temperatura</td>
                <td className="py-3 px-4">Frío extremo reduce flexibilidad</td>
                <td className="py-3 px-4">Mayor riesgo todas las lesiones</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Prevención y Derechos</h2>
        <div className="bg-green-900/20 p-8 rounded-lg border border-green-500/30">
          <h3 className="text-xl font-bold text-green-400 mb-4">Sus Derechos Incluyen:</h3>
          <ul className="text-gray-300 space-y-2">
            <li>✓ Solicitar evaluación ergonómica del puesto</li>
            <li>✓ Descansos regulares para recuperación muscular</li>
            <li>✓ Rotación de tareas para variar movimientos</li>
            <li>✓ Herramientas ergonómicas apropiadas</li>
            <li>✓ Tratamiento médico inmediato sin costo</li>
            <li>✓ Modificación de trabajo durante recuperación</li>
            <li>✓ Compensación si no hay trabajo liviano</li>
            <li>✓ Segunda opinión médica si no mejora</li>
          </ul>
          <p className="text-yellow-400 text-sm mt-4">
            💡 Empleador DEBE prevenir lesiones repetitivas - no es "costo de hacer negocio"
          </p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado Lesiones Estrés Repetitivo"
      subtitle="Protección Legal para Túnel Carpal y Lesiones por Movimiento Repetitivo"
      description="Compensación completa para trabajadores con lesiones por estrés repetitivo y síndrome de túnel carpal."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
