import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Enfermedades Ocupacionales | Workers Comp NC FL | Vasquez Law Firm',
  description: 'Compensación por enfermedades causadas por el trabajo. Asbestos, químicos, COVID-19. 919-569-5882',
  keywords: 'enfermedad ocupacional, ocupacional illness español, asbestosis, mesotelioma, silicosis, enfermedad pulmonar trabajo, compensacion enfermedad laboral Raleigh, ocupacional Charlotte, enfermedad trabajo Orlando',
  openGraph: {
    title: 'Abogado Enfermedades Ocupacionales | Workers Comp | Vasquez Law',
    description: 'Obtenga compensación por enfermedades causadas por exposición en el trabajo.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function EnfermedadesOcupacionalesPage() {
  const services = [
    {
      title: 'Enfermedades Respiratorias',
      description: 'Pulmones y respiración',
      icon: '🫁',
      features: [
        'Asbestosis/Mesotelioma',
        'Silicosis construcción',
        'COVID-19 laboral',
        'Asma ocupacional',
        'COPD/Enfisema',
        'Pulmón negro mineros',
      ],
    },
    {
      title: 'Exposición Química',
      description: 'Tóxicos y venenos',
      icon: '☣️',
      features: [
        'Plomo/Mercurio',
        'Pesticidas agricultura',
        'Solventes industriales',
        'Benzeno/Formaldehído',
        'Químicos limpieza',
        'Humos de soldadura',
      ],
    },
    {
      title: 'Cáncer Ocupacional',
      description: 'Relacionado al trabajo',
      icon: '🎗️',
      features: [
        'Mesotelioma asbesto',
        'Leucemia química',
        'Cáncer de pulmón',
        'Cáncer de piel sol',
        'Linfoma pesticidas',
        'Cáncer vejiga',
      ],
    },
    {
      title: 'Enfermedades Piel',
      description: 'Dermatitis laboral',
      icon: '🩹',
      features: [
        'Dermatitis contacto',
        'Eczema ocupacional',
        'Quemaduras químicas',
        'Urticaria alérgica',
        'Cáncer piel UV',
        'Infecciones trabajo',
      ],
    },
    {
      title: 'Pérdida Auditiva',
      description: 'Daño por ruido',
      icon: '👂',
      features: [
        'Sordera industrial',
        'Tinnitus permanente',
        'Trauma acústico',
        'Pérdida gradual',
        'Construcción/Fábricas',
        'Aeropuertos/Música',
      ],
    },
    {
      title: 'Infecciosas',
      description: 'Contagio laboral',
      icon: '🦠',
      features: [
        'COVID-19',
        'Tuberculosis',
        'Hepatitis B/C',
        'VIH ocupacional',
        'MRSA hospitales',
        'Enfermedades zoonóticas',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Qué enfermedades ocupacionales son más comunes en trabajadores latinos?',
      answer: 'Estadísticas muestran exposiciones altas en: (1) CONSTRUCCIÓN: silicosis por polvo concreto, asbestosis demolición, pérdida auditiva, lesiones espalda crónicas. (2) AGRICULTURA: pesticidas causando cáncer/neurológicos, golpe de calor, enfermedades renales por deshidratación, Valley Fever. (3) LIMPIEZA: asma por químicos, dermatitis, infecciones. (4) MANUFACTURA: pérdida auditiva, problemas respiratorios, síndrome túnel carpal. (5) COCINAS: quemaduras, asma por humos, dermatitis. PROBLEMA: muchos no reportan por miedo a perder trabajo o deportación. Sus derechos no dependen de estatus migratorio.',
    },
    {
      question: '¿Cómo pruebo que mi enfermedad es del trabajo?',
      answer: 'Evidencia clave: (1) MÉDICA: diagnóstico conectando enfermedad a exposición laboral, opinión de especialista ocupacional, pruebas mostrando sustancia en cuerpo. (2) LABORAL: records de exposición a químicos/condiciones, MSDS hojas de seguridad, reportes OSHA, compañeros con misma enfermedad. (3) TEMPORAL: síntomas comenzaron después de exposición, empeoran en trabajo/mejoran en descanso. (4) CIENTÍFICA: estudios médicos conectando su exposición con enfermedad. IMPORTANTE: empleador debe probar que NO es del trabajo. Presunción favorable si enfermedad conocida en su industria.',
    },
    {
      question: '¿Cuánto tiempo tengo para reportar enfermedad ocupacional?',
      answer: 'CRÍTICO entender plazos: NC - 30 días desde que SUPO o debió saber que enfermedad es del trabajo, 2 años para file reclamo formal. FL - 30 días notificar, 2 años desde que supo de conexión laboral. PERO enfermedades latentes (cáncer, asbestosis): tiempo corre desde DIAGNÓSTICO no exposición. Puede ser 20-40 años después. Doctrina descubrimiento protege cuando enfermedad aparece años después. NUNCA asuma que es muy tarde - consulte abogado. Excepción: muerte por enfermedad ocupacional - familia tiene 2 años desde muerte.',
    },
    {
      question: '¿Qué pasa si ya no trabajo donde me enfermé?',
      answer: 'PUEDE reclamar aunque: dejó trabajo hace años, empresa cerró/quebró, era trabajo temporal, fue despedido, se jubiló. Responsable es: último empleador donde expuesto que contribuyó a enfermedad, O todos los empleadores proporcionalmente si exposición múltiple. Seguro de cuando trabajó debe cubrir. Si empresa cerró: fondo estatal puede pagar, buscar empresa sucesora, demandar executives personalmente si fraude. Importante: guarde TODOS records viejos - pay stubs, W2s, badges, fotos, cualquier evidencia de empleo.',
    },
    {
      question: '¿Cubren COVID-19 como enfermedad ocupacional?',
      answer: 'SÍ pero debe probar conexión laboral. Más fácil si: trabajador esencial (salud, first responders), brote en lugar de trabajo, trabajo requiere contacto público, empleador no dio PPE adecuado. Evidencia necesaria: prueba positiva COVID, records de exposición en trabajo, compañeros infectados, falta de protecciones. Beneficios incluyen: tratamiento médico completo, incapacidad temporal si no puede trabajar, incapacidad permanente si daño pulmonar/órganos, muerte - beneficios a familia. Long COVID también cubierto si prueba origen laboral. NC/FL tienen diferentes presunciones para essential workers.',
    },
    {
      question: '¿Qué compensación puedo recibir por enfermedad ocupacional?',
      answer: 'Beneficios iguales a lesión: (1) MÉDICOS: tratamiento de por vida, medicamentos, especialistas, cirugías, equipo médico. (2) SALARIOS: 66.67% salario mientras incapacitado (TTD), compensación permanente si daño irreversible (PPD/PTD). (3) MUERTE: gastos funeral $10,000, 66.67% salario a dependientes, beneficios hasta que cónyuge se case/hijos 18. (4) VOCACIONAL: reentrenamiento si no puede volver a trabajo anterior. Enfermedades graves (cáncer, pulmonar) típicamente resultan en acuerdos grandes $100,000-$1,000,000+ dependiendo de edad, salario, severidad.',
    },
  ];

  const content = {
    introduction: `Las enfermedades ocupacionales matan más trabajadores que los accidentes - pero son las más negadas por aseguradoras. Trabajadores latinos sufren exposiciones desproporcionadas a químicos tóxicos, asbesto, sílice, pesticidas y condiciones peligrosas. Muchos desarrollan cáncer, enfermedades pulmonares, pérdida auditiva, o problemas neurológicos años después. Vasquez Law Firm lucha por trabajadores enfermos por su trabajo, sin importar cuándo comenzó la exposición o su estatus migratorio. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden las industrias peligrosas donde trabaja nuestra comunidad. No muera en silencio - sus años de trabajo duro no deben costarle su salud y vida.`,

    processTitle: 'Proceso de Reclamo por Enfermedad',
    process: [
      {
        step: '1',
        title: 'Diagnóstico',
        description: 'Médico confirma enfermedad',
      },
      {
        step: '2',
        title: 'Conexión',
        description: 'Vincular al trabajo',
      },
      {
        step: '3',
        title: 'Notificación',
        description: 'Informar empleador/seguro',
      },
      {
        step: '4',
        title: 'Evidencia',
        description: 'Documentar exposición',
      },
      {
        step: '5',
        title: 'Compensación',
        description: 'Beneficios médicos y salariales',
      },
    ],

    urgencyTitle: '⚠️ Enfermedades Ocupacionales Son Asesinos Silenciosos',
    urgencyMessage: 'Síntomas empeoran gradualmente. Tratamiento temprano salva vidas. Plazos cortos para reclamar. No espere.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Enfermedad Ocupacional',
    whyChoosePoints: [
      'Experiencia específica en enfermedades laborales latinas',
      'Red de médicos ocupacionales y especialistas',
      'Conocemos industrias peligrosas de nuestra comunidad',
      'Peleamos contra negaciones por "pre-existente"',
      'Máxima compensación por daños permanentes',
      'No cobramos si no ganamos',
      'Totalmente bilingüe español-inglés',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Enfermedades por Industria</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">Construcción</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Silicosis (polvo de sílice/concreto)</li>
              <li>• Asbestosis/Mesotelioma</li>
              <li>• Pérdida auditiva por ruido</li>
              <li>• COPD por humos/polvo</li>
              <li>• Cáncer piel por sol</li>
              <li>• Vibración manos/brazos</li>
              <li>• Plomo en renovaciones viejas</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Agricultura</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Pesticidas - cáncer, neurológico</li>
              <li>• Enfermedad renal por calor</li>
              <li>• Valley Fever (hongos)</li>
              <li>• Problemas respiratorios polvo</li>
              <li>• Dermatitis plantas/químicos</li>
              <li>• Zoonosis (animales)</li>
              <li>• Lesiones repetitivas crónicas</li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Manufactura/Fábricas</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Químicos industriales - cáncer</li>
              <li>• Pérdida auditiva maquinaria</li>
              <li>• Asma ocupacional</li>
              <li>• Síndrome túnel carpal</li>
              <li>• Dermatitis solventes</li>
              <li>• Problemas espalda crónicos</li>
              <li>• Exposición a metales pesados</li>
            </ul>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Limpieza/Hospitality</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Asma por productos limpieza</li>
              <li>• Dermatitis química</li>
              <li>• Infecciones (COVID, TB, MRSA)</li>
              <li>• Lesiones espalda repetitivas</li>
              <li>• Latex alergias</li>
              <li>• Hepatitis exposición sangre</li>
              <li>• Burnout/Estrés crónico</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Síntomas de Alarma - No Ignore</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-red-400 font-bold mb-2">Respiratorios</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Falta de aire progresiva</li>
                <li>• Tos crónica con/sin sangre</li>
                <li>• Silbidos al respirar</li>
                <li>• Dolor pecho al respirar</li>
                <li>• Fatiga extrema</li>
              </ul>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">Neurológicos</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Dolores cabeza frecuentes</li>
                <li>• Mareos/Pérdida equilibrio</li>
                <li>• Temblores/Hormigueo</li>
                <li>• Pérdida memoria</li>
                <li>• Cambios personalidad</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Otros Signos</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Pérdida peso sin razón</li>
                <li>• Erupciones piel persistentes</li>
                <li>• Pérdida audición gradual</li>
                <li>• Problemas riñón/orina</li>
                <li>• Bultos o masas nuevas</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 text-sm mt-6 font-bold">
            ⚠️ Si tiene estos síntomas y trabaja con químicos, polvo, ruido o condiciones peligrosas - vea doctor ocupacional INMEDIATAMENTE
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Exposiciones Peligrosas Comunes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Sustancia</th>
                <th className="py-3 px-4">Dónde se Encuentra</th>
                <th className="py-3 px-4">Enfermedades</th>
                <th className="py-3 px-4">Latencia</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Asbesto</td>
                <td className="py-3 px-4">Construcción vieja, frenos</td>
                <td className="py-3 px-4">Mesotelioma, asbestosis</td>
                <td className="py-3 px-4">20-40 años</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Sílice</td>
                <td className="py-3 px-4">Concreto, sandblasting</td>
                <td className="py-3 px-4">Silicosis, cáncer pulmón</td>
                <td className="py-3 px-4">10-30 años</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Plomo</td>
                <td className="py-3 px-4">Pintura vieja, soldadura</td>
                <td className="py-3 px-4">Daño cerebral, riñón</td>
                <td className="py-3 px-4">Meses-años</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Pesticidas</td>
                <td className="py-3 px-4">Agricultura, jardinería</td>
                <td className="py-3 px-4">Cáncer, Parkinson</td>
                <td className="py-3 px-4">5-20 años</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Benzeno</td>
                <td className="py-3 px-4">Refinerías, químicos</td>
                <td className="py-3 px-4">Leucemia</td>
                <td className="py-3 px-4">2-15 años</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado Enfermedades Ocupacionales"
      subtitle="Justicia para Trabajadores Envenenados por Su Trabajo"
      description="Compensación por cáncer, enfermedades pulmonares y otras condiciones causadas por exposición laboral."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
