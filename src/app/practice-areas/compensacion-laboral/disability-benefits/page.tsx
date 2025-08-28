import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Beneficios Incapacidad | Workers Comp NC FL | Vasquez Law Firm',
  description: 'Beneficios de incapacidad por lesiones laborales. Temporal, permanente, parcial o total. 919-569-5882',
  keywords: 'beneficios incapacidad, disability benefits español, incapacidad permanente, incapacidad temporal, workers comp disability, beneficios incapacidad Raleigh, disability Charlotte, incapacidad Orlando',
  openGraph: {
    title: 'Abogado Beneficios de Incapacidad | Workers Comp | Vasquez Law',
    description: 'Obtenga máximos beneficios de incapacidad por su lesión laboral. Temporal o permanente.',
    type: 'website',
    locale: 'es_US',
  },
};

export default function BeneficiosIncapacidadPage() {
  const services = [
    {
      title: 'Incapacidad Temporal',
      description: 'Mientras se recupera',
      icon: '⏳',
      features: [
        'TTD - Total temporal',
        'TPD - Parcial temporal',
        '66.67% del salario',
        'Hasta recuperación máxima',
        'Pagos semanales',
        'Extensiones posibles',
      ],
    },
    {
      title: 'Incapacidad Permanente',
      description: 'Daño permanente',
      icon: '♿',
      features: [
        'PPD - Parcial permanente',
        'PTD - Total permanente',
        'Rating de incapacidad',
        'Compensación por órgano',
        'Beneficios de por vida',
        'Ajustes por inflación',
      ],
    },
    {
      title: 'Cálculo de Beneficios',
      description: 'Cómo se determina',
      icon: '💵',
      features: [
        'Salario semanal promedio',
        'Tasa de compensación',
        'Máximos estatales',
        'Períodos de beneficio',
        'Pagos retroactivos',
        'Intereses por retraso',
      ],
    },
    {
      title: 'Evaluación Médica',
      description: 'Determinación rating',
      icon: '🏥',
      features: [
        'MMI - Mejoría máxima',
        'IME - Examen independiente',
        'Guías AMA',
        'Restricciones permanentes',
        'Capacidad funcional',
        'Segunda opinión',
      ],
    },
    {
      title: 'Vocacional',
      description: 'Regreso al trabajo',
      icon: '🎓',
      features: [
        'Rehabilitación vocacional',
        'Reentrenamiento',
        'Modificación de trabajo',
        'Búsqueda de empleo',
        'Educación pagada',
        'Colocación laboral',
      ],
    },
    {
      title: 'Acuerdos',
      description: 'Resolución final',
      icon: '📝',
      features: [
        'Lump sum (pago único)',
        'Structured settlement',
        'Médicos futuros',
        'Medicare set-aside',
        'Negociación máxima',
        'Clincher agreements',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto recibo por incapacidad temporal?',
      answer: 'NC y FL pagan un porcentaje establecido de su salario semanal promedio. Cálculo: últimas 52 semanas incluyendo overtime, bonos, tips. Sujeto a límites máximos y mínimos estatales que se ajustan anualmente. TTD (total temporal): no puede trabajar nada. TPD (parcial temporal): trabaja con restricciones, recibe diferencia. Duración: hasta que doctor dice MMI (mejoría médica máxima) o regresa a trabajo completo. Duración varía significativamente dependiendo del estado y tipo de lesión.',
    },
    {
      question: '¿Qué es incapacidad permanente parcial (PPD)?',
      answer: 'PPD = pérdida permanente de función después de MMI. Se calcula por "rating" de incapacidad: doctor asigna porcentaje usando guías AMA. Cada parte del cuerpo tiene valor en semanas. Ejemplo: 10% espalda = 30 semanas de beneficios. 5% hombro = 12 semanas. Pérdida de miembro vale más. Puede trabajar y recibir PPD. Pagado como lump sum o pagos semanales. IMPORTANTE: rating inicial casi siempre es muy bajo. Segunda opinión médica puede duplicar o triplicar compensación.',
    },
    {
      question: '¿Puedo obtener incapacidad total permanente (PTD)?',
      answer: 'PTD = nunca puede trabajar en NINGÚN empleo. Muy difícil de obtener pero vale mucho: beneficios de por vida. Califica si: pérdida de ambas manos/brazos/pies/piernas, pérdida total de visión, parálisis, lesión cerebral severa, algunas lesiones de espalda severas con cirugías múltiples fallidas. También considera: edad, educación, experiencia, restricciones, capacidad de reentrenamiento. Beneficios: 66.67% salario de por vida, ajustes por costo de vida, médicos de por vida, muerte pasa a dependientes.',
    },
    {
      question: '¿Debo aceptar el acuerdo que ofrece el seguro?',
      answer: 'NUNCA acepte primera oferta sin abogado. Aseguradoras ofrecen 30-50% del valor real esperando que acepte por necesidad. Considere: ¿cubre médicos futuros?, ¿incluye medicamentos?, ¿qué si empeora?, ¿Medicare set-aside necesario?, ¿puede trabajar después? Tipos de acuerdo: Clincher (cierra todo incluyendo médicos), Medical open (paga incapacidad pero médicos abiertos), Structured (pagos en tiempo). Abogado puede duplicar o triplicar oferta inicial. Una vez firma, NO puede reabrir.',
    },
    {
      question: '¿Puedo trabajar mientras recibo beneficios de incapacidad?',
      answer: 'Depende del tipo: TTD (total temporal): NO puede trabajar nada o pierde beneficios. TPD (parcial temporal): SÍ trabajo liviano, recibe diferencia de salario. PPD (parcial permanente): SÍ puede trabajar tiempo completo Y recibir beneficios. PTD (total permanente): NO ningún trabajo o pierde todo. CUIDADO: aseguradora hace vigilancia. Videos trabajando pueden terminar beneficios. Sea honesto con restricciones. Informe cualquier trabajo o intento. Trial work period posible en algunos casos.',
    },
    {
      question: '¿Mis beneficios de incapacidad afectan Social Security Disability?',
      answer: 'Puede recibir AMBOS pero con límites. Total combinado no puede exceder 80% de salario promedio. Workers comp se reduce primero. SSDI toma 5-6 meses para comenzar, WC inmediato. Estrategia: maximizar workers comp primero, luego aplicar SSDI, estructurar acuerdo para minimizar offset, considerar Medicare después de 24 meses SSDI. Algunos acuerdos pueden afectar SSDI/Medicare - requiere lenguaje especial. Consulte abogado que entienda ambos sistemas.',
    },
  ];

  const content = {
    introduction: `Una lesión laboral que causa incapacidad puede destruir su capacidad de mantener a su familia. Los beneficios de incapacidad bajo compensación laboral son su salvavidas financiero - pero las aseguradoras pelean cada dólar. Vasquez Law Firm ha obtenido millones en beneficios de incapacidad para trabajadores lesionados en Carolina del Norte y Florida. Nuestros abogados bilingües en Raleigh, Charlotte, Smithfield y Orlando entienden que su incapacidad no es solo un número - es su vida, su dignidad, su futuro. Luchamos por beneficios máximos temporales y permanentes. No acepte menos de lo que merece.`,

    processTitle: 'Proceso de Incapacidad',
    process: [
      {
        step: '1',
        title: 'Tratamiento',
        description: 'Hasta mejoría máxima (MMI)',
      },
      {
        step: '2',
        title: 'Evaluación',
        description: 'Rating de incapacidad',
      },
      {
        step: '3',
        title: 'Cálculo',
        description: 'Determinar beneficios',
      },
      {
        step: '4',
        title: 'Negociación',
        description: 'Maximizar compensación',
      },
      {
        step: '5',
        title: 'Resolución',
        description: 'Acuerdo o juicio',
      },
    ],

    urgencyTitle: '💰 Su Incapacidad Vale Más de lo que Ofrecen',
    urgencyMessage: 'Primeras ofertas son siempre bajas. Rating inicial subestima daño. Una firma puede cerrar opciones para siempre.',

    whyChooseTitle: 'Por Qué Elegir Vasquez Law para Incapacidad',
    whyChoosePoints: [
      'Millones recuperados en beneficios de incapacidad',
      'Red de médicos para ratings justos',
      'Expertos en cálculos complejos',
      'Negociadores agresivos con aseguradoras',
      'Protegemos beneficios futuros',
      'No cobramos si no ganamos',
      'Totalmente bilingüe español-inglés',
      'Oficinas en Raleigh, Charlotte, Smithfield y Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tabla de Beneficios por Parte del Cuerpo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Parte del Cuerpo</th>
                <th className="py-3 px-4">NC (Semanas)</th>
                <th className="py-3 px-4">FL (Semanas)</th>
                <th className="py-3 px-4">Impacto Típico</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Espalda</td>
                <td className="py-3 px-4">300</td>
                <td className="py-3 px-4">Variable</td>
                <td className="py-3 px-4">Muy Alto</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Brazo/Hombro</td>
                <td className="py-3 px-4">240</td>
                <td className="py-3 px-4">200</td>
                <td className="py-3 px-4">Alto</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Mano</td>
                <td className="py-3 px-4">200</td>
                <td className="py-3 px-4">160</td>
                <td className="py-3 px-4">Alto</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Pierna</td>
                <td className="py-3 px-4">200</td>
                <td className="py-3 px-4">175</td>
                <td className="py-3 px-4">Alto</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Pie</td>
                <td className="py-3 px-4">144</td>
                <td className="py-3 px-4">125</td>
                <td className="py-3 px-4">Moderado</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Ojo</td>
                <td className="py-3 px-4">120</td>
                <td className="py-3 px-4">150</td>
                <td className="py-3 px-4">Alto</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Los valores finales dependen del rating de incapacidad y salario semanal individual</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tipos de Beneficios de Incapacidad</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Temporal</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ TTD - No puede trabajar nada</li>
              <li>✓ TPD - Trabajo con restricciones</li>
              <li>✓ 66.67% del salario promedio</li>
              <li>✓ Hasta recuperación o MMI</li>
              <li>✓ Pagos semanales</li>
              <li>✓ Médicos incluidos</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Permanente</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ PPD - Pérdida parcial función</li>
              <li>✓ PTD - Incapacidad total</li>
              <li>✓ Basado en rating médico</li>
              <li>✓ Lump sum o pagos</li>
              <li>✓ Puede incluir futuros médicos</li>
              <li>✓ Posible por vida (PTD)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Abogado Beneficios de Incapacidad"
      subtitle="Máxima Compensación por Su Incapacidad Laboral"
      description="Obtenga todos los beneficios de incapacidad temporal y permanente que merece."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
