export interface PracticeAreaData {
  key: string;
  name: {
    en: string;
    es: string;
  };
  slug: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  benefits: {
    en: string[];
    es: string[];
  };
  process: {
    en: string[];
    es: string[];
  };
  faqs: {
    en: Array<{
      question: string;
      answer: string;
    }>;
    es: Array<{
      question: string;
      answer: string;
    }>;
  };
  relatedServices: {
    en: string[];
    es: string[];
  };
  icon: string;
}

export const practiceAreas: PracticeAreaData[] = [
  {
    key: 'immigration',
    name: {
      en: 'Immigration Law',
      es: 'Ley de Inmigración',
    },
    slug: {
      en: 'immigration',
      es: 'inmigracion',
    },
    description: {
      en: 'Comprehensive immigration legal services to help you navigate the complex U.S. immigration system with experienced bilingual attorneys.',
      es: 'Servicios legales integrales de inmigración para ayudarte a navegar el complejo sistema de inmigración de EE.UU. con abogados bilingües experimentados.',
    },
    benefits: {
      en: [
        'Bilingual legal representation for Spanish-speaking clients',
        'Experienced attorneys with proven success in immigration cases',
        'Comprehensive services from family petitions to deportation defense',
        'Personalized attention and clear communication throughout the process',
        'Free initial consultations to evaluate your case',
        'Affordable payment plans and transparent pricing',
      ],
      es: [
        'Representación legal bilingüe para clientes de habla hispana',
        'Abogados experimentados con éxito comprobado en casos de inmigración',
        'Servicios integrales desde peticiones familiares hasta defensa de deportación',
        'Atención personalizada y comunicación clara durante todo el proceso',
        'Consultas iniciales gratuitas para evaluar tu caso',
        'Planes de pago asequibles y precios transparentes',
      ],
    },
    process: {
      en: [
        'Free consultation to evaluate your immigration case and options',
        'Document review and preparation with detailed guidance',
        'Application filing and government correspondence management',
        'Court representation and advocacy when needed',
      ],
      es: [
        'Consulta gratuita para evaluar tu caso de inmigración y opciones',
        'Revisión y preparación de documentos con orientación detallada',
        'Presentación de solicitudes y manejo de correspondencia gubernamental',
        'Representación en corte y defensa cuando sea necesario',
      ],
    },
    faqs: {
      en: [
        {
          question: 'How long does the immigration process typically take?',
          answer:
            'Immigration processing times vary greatly depending on the type of case and current government backlogs. Family-based petitions can take anywhere from 8 months to several years, while asylum cases may take 1-3 years or more. We provide realistic timelines during your consultation.',
        },
        {
          question: 'Can I work while my immigration case is pending?',
          answer:
            'Work authorization depends on your specific immigration status and case type. Some applications allow you to apply for work permits while the case is pending, while others do not. We will advise you on work authorization options during your consultation.',
        },
        {
          question: 'What happens if I am in removal proceedings?',
          answer:
            'Being in removal proceedings is serious but not hopeless. We can evaluate your case for potential relief options such as asylum, cancellation of removal, adjustment of status, or voluntary departure. Early legal representation is crucial for the best outcomes.',
        },
      ],
      es: [
        {
          question: '¿Cuánto tiempo toma típicamente el proceso de inmigración?',
          answer:
            'Los tiempos de procesamiento de inmigración varían mucho dependiendo del tipo de caso y los retrasos gubernamentales actuales. Las peticiones basadas en familia pueden tomar desde 8 meses hasta varios años, mientras que los casos de asilo pueden tomar 1-3 años o más. Proporcionamos cronogramas realistas durante tu consulta.',
        },
        {
          question: '¿Puedo trabajar mientras mi caso de inmigración está pendiente?',
          answer:
            'La autorización de trabajo depende de tu estatus migratorio específico y el tipo de caso. Algunas solicitudes te permiten aplicar para permisos de trabajo mientras el caso está pendiente, mientras que otras no. Te asesoraremos sobre las opciones de autorización de trabajo durante tu consulta.',
        },
        {
          question: '¿Qué pasa si estoy en procesos de deportación?',
          answer:
            'Estar en procesos de deportación es serio pero no sin esperanza. Podemos evaluar tu caso para opciones potenciales de alivio como asilo, cancelación de deportación, ajuste de estatus, o salida voluntaria. La representación legal temprana es crucial para los mejores resultados.',
        },
      ],
    },
    relatedServices: {
      en: [
        'Family-Based Immigration',
        'Deportation Defense',
        'Asylum Cases',
        'Work Visas',
        'Citizenship Applications',
        'DACA Renewals',
      ],
      es: [
        'Inmigración Basada en Familia',
        'Defensa de Deportación',
        'Casos de Asilo',
        'Visas de Trabajo',
        'Solicitudes de Ciudadanía',
        'Renovaciones de DACA',
      ],
    },
    icon: 'Scale',
  },
  {
    key: 'criminal-defense',
    name: {
      en: 'Criminal Defense',
      es: 'Defensa Criminal',
    },
    slug: {
      en: 'criminal-defense',
      es: 'defensa-criminal',
    },
    description: {
      en: 'Aggressive criminal defense representation protecting your rights and freedom with experienced trial attorneys who speak Spanish.',
      es: 'Representación agresiva en defensa criminal protegiendo tus derechos y libertad con abogados de juicio experimentados que hablan español.',
    },
    benefits: {
      en: [
        'Experienced criminal defense attorneys with proven trial success',
        'Bilingual representation for Spanish-speaking clients',
        '24/7 availability for urgent criminal matters',
        'Aggressive defense strategies tailored to your specific case',
        'Protection of your constitutional rights throughout the process',
        'Clear communication about your options and potential outcomes',
      ],
      es: [
        'Abogados de defensa criminal experimentados con éxito probado en juicios',
        'Representación bilingüe para clientes de habla hispana',
        'Disponibilidad 24/7 para asuntos criminales urgentes',
        'Estrategias de defensa agresivas adaptadas a tu caso específico',
        'Protección de tus derechos constitucionales durante todo el proceso',
        'Comunicación clara sobre tus opciones y posibles resultados',
      ],
    },
    process: {
      en: [
        'Immediate consultation and case evaluation within 24 hours',
        'Investigation and evidence gathering to build strong defense',
        'Negotiation with prosecutors for reduced charges or dismissal',
        'Aggressive trial representation if settlement is not favorable',
      ],
      es: [
        'Consulta inmediata y evaluación del caso dentro de 24 horas',
        'Investigación y recopilación de evidencia para construir una defensa sólida',
        'Negociación con fiscales para cargos reducidos o desestimación',
        'Representación agresiva en juicio si el acuerdo no es favorable',
      ],
    },
    faqs: {
      en: [
        {
          question: 'Should I talk to police without a lawyer?',
          answer:
            'No, you should never speak to police without an attorney present. You have the right to remain silent and request a lawyer. Anything you say can be used against you in court. Contact us immediately if you are arrested or under investigation.',
        },
        {
          question: 'What are the potential consequences of a criminal conviction?',
          answer:
            'Criminal convictions can result in jail time, fines, probation, loss of driving privileges, and long-term consequences affecting employment, housing, and immigration status. For non-citizens, criminal convictions can lead to deportation.',
        },
        {
          question: 'How much does criminal defense representation cost?',
          answer:
            'Criminal defense fees vary based on the complexity of the case and charges involved. We offer free consultations to discuss your case and provide transparent pricing. Payment plans are available for qualified clients.',
        },
      ],
      es: [
        {
          question: '¿Debo hablar con la policía sin un abogado?',
          answer:
            'No, nunca debes hablar con la policía sin un abogado presente. Tienes el derecho de permanecer en silencio y solicitar un abogado. Cualquier cosa que digas puede ser usada en tu contra en la corte. Contáctanos inmediatamente si eres arrestado o bajo investigación.',
        },
        {
          question: '¿Cuáles son las posibles consecuencias de una condena criminal?',
          answer:
            'Las condenas criminales pueden resultar en tiempo en prisión, multas, libertad condicional, pérdida de privilegios de conducir, y consecuencias a largo plazo que afectan el empleo, vivienda, y estatus migratorio. Para no ciudadanos, las condenas criminales pueden llevar a la deportación.',
        },
        {
          question: '¿Cuánto cuesta la representación en defensa criminal?',
          answer:
            'Los honorarios de defensa criminal varían según la complejidad del caso y los cargos involucrados. Ofrecemos consultas gratuitas para discutir tu caso y proporcionar precios transparentes. Planes de pago están disponibles para clientes calificados.',
        },
      ],
    },
    relatedServices: {
      en: [
        'DUI/DWI Defense',
        'Drug Crime Defense',
        'Domestic Violence Defense',
        'Assault and Battery Defense',
        'White Collar Crime Defense',
        'Traffic Violations',
      ],
      es: [
        'Defensa DUI/DWI',
        'Defensa de Crímenes de Drogas',
        'Defensa de Violencia Doméstica',
        'Defensa de Asalto y Agresión',
        'Defensa de Crímenes de Cuello Blanco',
        'Violaciones de Tráfico',
      ],
    },
    icon: 'Shield',
  },
  {
    key: 'family-law',
    name: {
      en: 'Family Law',
      es: 'Derecho Familiar',
    },
    slug: {
      en: 'family-law',
      es: 'derecho-familia',
    },
    description: {
      en: 'Compassionate family law representation for divorce, child custody, and other family matters with bilingual attorneys who understand your needs.',
      es: 'Representación compasiva en derecho familiar para divorcio, custodia de menores, y otros asuntos familiares con abogados bilingües que entienden tus necesidades.',
    },
    benefits: {
      en: [
        'Compassionate representation during difficult family transitions',
        'Bilingual attorneys who understand cultural family dynamics',
        'Experienced in North Carolina family law and procedures',
        "Focus on protecting children's best interests in custody cases",
        'Mediation services to resolve disputes without court battles',
        'Transparent pricing and payment plan options available',
      ],
      es: [
        'Representación compasiva durante transiciones familiares difíciles',
        'Abogados bilingües que entienden las dinámicas familiares culturales',
        'Experimentados en derecho familiar y procedimientos de Carolina del Norte',
        'Enfoque en proteger los mejores intereses de los niños en casos de custodia',
        'Servicios de mediación para resolver disputas sin batallas en corte',
        'Precios transparentes y opciones de planes de pago disponibles',
      ],
    },
    process: {
      en: [
        'Confidential consultation to understand your family situation',
        'Strategic planning and document preparation for your case',
        'Negotiation and mediation to reach fair agreements',
        'Court representation when litigation becomes necessary',
      ],
      es: [
        'Consulta confidencial para entender tu situación familiar',
        'Planificación estratégica y preparación de documentos para tu caso',
        'Negociación y mediación para alcanzar acuerdos justos',
        'Representación en corte cuando el litigio se vuelve necesario',
      ],
    },
    faqs: {
      en: [
        {
          question: 'How long does a divorce take in North Carolina?',
          answer:
            'In North Carolina, you must be separated for one year before filing for divorce. Once filed, an uncontested divorce can be finalized in 30-90 days. Contested divorces involving property division or custody disputes take longer, typically 6-18 months.',
        },
        {
          question: 'How is child custody determined in North Carolina?',
          answer:
            "North Carolina courts determine custody based on the best interests of the child, considering factors like each parent's relationship with the child, stability of home environment, and ability to provide for the child's needs. We help parents present strong cases for custody.",
        },
        {
          question: 'Can I modify a custody or support order?',
          answer:
            "Yes, custody and support orders can be modified when there is a substantial change in circumstances. Examples include job loss, relocation, changes in the child's needs, or significant changes in either parent's situation.",
        },
      ],
      es: [
        {
          question: '¿Cuánto tiempo toma un divorcio en Carolina del Norte?',
          answer:
            'En Carolina del Norte, debes estar separado por un año antes de solicitar el divorcio. Una vez presentado, un divorcio no disputado puede finalizarse en 30-90 días. Los divorcios disputados que involucran división de propiedades o disputas de custodia toman más tiempo, típicamente 6-18 meses.',
        },
        {
          question: '¿Cómo se determina la custodia de menores en Carolina del Norte?',
          answer:
            'Las cortes de Carolina del Norte determinan la custodia basándose en los mejores intereses del menor, considerando factores como la relación de cada padre con el niño, estabilidad del ambiente del hogar, y capacidad para proveer las necesidades del niño. Ayudamos a los padres a presentar casos sólidos para la custodia.',
        },
        {
          question: '¿Puedo modificar una orden de custodia o manutención?',
          answer:
            'Sí, las órdenes de custodia y manutención pueden modificarse cuando hay un cambio sustancial en las circunstancias. Ejemplos incluyen pérdida de trabajo, reubicación, cambios en las necesidades del niño, o cambios significativos en la situación de cualquier padre.',
        },
      ],
    },
    relatedServices: {
      en: [
        'Divorce Proceedings',
        'Child Custody and Support',
        'Alimony and Spousal Support',
        'Property Division',
        'Domestic Violence Protection',
        'Adoption Services',
      ],
      es: [
        'Procedimientos de Divorcio',
        'Custodia y Manutención de Menores',
        'Pensión Alimenticia y Manutención Conyugal',
        'División de Propiedades',
        'Protección contra Violencia Doméstica',
        'Servicios de Adopción',
      ],
    },
    icon: 'Heart',
  },
  {
    key: 'personal-injury',
    name: {
      en: 'Personal Injury',
      es: 'Lesiones Personales',
    },
    slug: {
      en: 'personal-injury',
      es: 'lesiones-personales',
    },
    description: {
      en: 'Aggressive personal injury representation to get you maximum compensation for accidents, medical malpractice, and wrongful injuries.',
      es: 'Representación agresiva en lesiones personales para obtener la máxima compensación por accidentes, mala práctica médica, e lesiones injustas.',
    },
    benefits: {
      en: [
        'No fees unless we win your case - free consultations',
        'Bilingual attorneys serving Spanish-speaking accident victims',
        'Maximum compensation for medical bills, lost wages, and pain',
        'Investigation team to gather evidence and build strong cases',
        'Network of medical experts and accident reconstruction specialists',
        'Direct dealing with insurance companies to protect your interests',
      ],
      es: [
        'Sin honorarios a menos que ganemos tu caso - consultas gratuitas',
        'Abogados bilingües sirviendo a víctimas de accidentes de habla hispana',
        'Máxima compensación por gastos médicos, salarios perdidos, y dolor',
        'Equipo de investigación para recopilar evidencia y construir casos sólidos',
        'Red de expertos médicos y especialistas en reconstrucción de accidentes',
        'Trato directo con compañías de seguros para proteger tus intereses',
      ],
    },
    process: {
      en: [
        'Free consultation to evaluate your injury claim and rights',
        'Investigation and evidence collection from the accident scene',
        'Medical documentation and expert witness preparation',
        'Aggressive negotiation with insurance companies for fair settlement',
      ],
      es: [
        'Consulta gratuita para evaluar tu reclamo de lesiones y derechos',
        'Investigación y recopilación de evidencia de la escena del accidente',
        'Documentación médica y preparación de testigos expertos',
        'Negociación agresiva con compañías de seguros para un acuerdo justo',
      ],
    },
    faqs: {
      en: [
        {
          question: 'How much does it cost to hire a personal injury lawyer?',
          answer:
            'We work on a contingency fee basis, meaning you pay nothing unless we win your case. Our fees come from the settlement or verdict we obtain for you. Initial consultations are always free.',
        },
        {
          question: 'How long do I have to file a personal injury claim?',
          answer:
            "In North Carolina, the statute of limitations for personal injury claims is generally 3 years from the date of the accident. However, certain circumstances can affect this deadline, so it's important to consult with an attorney as soon as possible.",
        },
        {
          question: 'What types of compensation can I recover?',
          answer:
            'You may be entitled to compensation for medical expenses, lost wages, pain and suffering, property damage, and in some cases, punitive damages. The amount depends on the severity of your injuries and the circumstances of the accident.',
        },
      ],
      es: [
        {
          question: '¿Cuánto cuesta contratar un abogado de lesiones personales?',
          answer:
            'Trabajamos con honorarios de contingencia, lo que significa que no pagas nada a menos que ganemos tu caso. Nuestros honorarios vienen del acuerdo o veredicto que obtenemos para ti. Las consultas iniciales siempre son gratuitas.',
        },
        {
          question: '¿Cuánto tiempo tengo para presentar un reclamo de lesiones personales?',
          answer:
            'En Carolina del Norte, el estatuto de limitaciones para reclamos de lesiones personales es generalmente 3 años desde la fecha del accidente. Sin embargo, ciertas circunstancias pueden afectar este plazo, por lo que es importante consultar con un abogado lo antes posible.',
        },
        {
          question: '¿Qué tipos de compensación puedo recuperar?',
          answer:
            'Puedes tener derecho a compensación por gastos médicos, salarios perdidos, dolor y sufrimiento, daños a la propiedad, y en algunos casos, daños punitivos. La cantidad depende de la severidad de tus lesiones y las circunstancias del accidente.',
        },
      ],
    },
    relatedServices: {
      en: [
        'Car Accident Claims',
        'Truck Accident Claims',
        'Medical Malpractice',
        'Slip and Fall Accidents',
        'Wrongful Death Claims',
        "Workers' Compensation",
      ],
      es: [
        'Reclamos de Accidentes de Auto',
        'Reclamos de Accidentes de Camión',
        'Mala Práctica Médica',
        'Accidentes de Resbalón y Caída',
        'Reclamos de Muerte Injusta',
        'Compensación de Trabajadores',
      ],
    },
    icon: 'Shield',
  },
  {
    key: 'traffic-tickets',
    name: {
      en: 'Traffic Tickets NC',
      es: 'Multas de Tráfico NC',
    },
    slug: {
      en: 'traffic-tickets-nc',
      es: 'multas-de-transito-nc',
    },
    description: {
      en: 'Expert traffic ticket defense in North Carolina to protect your driving record, insurance rates, and avoid license suspension.',
      es: 'Defensa experta de multas de tráfico en Carolina del Norte para proteger tu récord de conducir, tarifas de seguro, y evitar la suspensión de licencia.',
    },
    benefits: {
      en: [
        'Experienced traffic attorneys familiar with NC traffic laws',
        'Bilingual representation for Spanish-speaking drivers',
        'Protect your driving record and insurance rates',
        "Court representation so you don't have to miss work",
        'Negotiation for reduced charges or dismissal when possible',
        'Free consultations to evaluate your traffic citation',
      ],
      es: [
        'Abogados de tráfico experimentados familiarizados con las leyes de tráfico de NC',
        'Representación bilingüe para conductores de habla hispana',
        'Protege tu récord de conducir y tarifas de seguro',
        'Representación en corte para que no tengas que faltar al trabajo',
        'Negociación para cargos reducidos o desestimación cuando sea posible',
        'Consultas gratuitas para evaluar tu citación de tráfico',
      ],
    },
    process: {
      en: [
        'Free consultation to review your traffic citation and options',
        'Court appearance on your behalf to save you time',
        'Negotiation with prosecutors for reduced penalties',
        'Follow-up to ensure proper resolution of your case',
      ],
      es: [
        'Consulta gratuita para revisar tu citación de tráfico y opciones',
        'Comparecencia en corte en tu nombre para ahorrarte tiempo',
        'Negociación con fiscales para penalidades reducidas',
        'Seguimiento para asegurar la resolución adecuada de tu caso',
      ],
    },
    faqs: {
      en: [
        {
          question: 'Should I just pay my traffic ticket?',
          answer:
            'Paying a traffic ticket is an admission of guilt that will add points to your driving record and may increase your insurance rates. Before paying, consult with us to see if we can get the ticket reduced or dismissed.',
        },
        {
          question: 'How many points will be added to my license?',
          answer:
            'Point values vary by violation in North Carolina. Speeding tickets typically add 2-4 points, while more serious violations like reckless driving add 4 points. Accumulating 12 points within 3 years can result in license suspension.',
        },
        {
          question: 'Can I keep a traffic ticket off my record?',
          answer:
            'In many cases, yes. We can often negotiate with prosecutors to reduce charges to non-moving violations or dismiss tickets entirely, especially for first-time offenders or minor violations.',
        },
      ],
      es: [
        {
          question: '¿Debo simplemente pagar mi multa de tráfico?',
          answer:
            'Pagar una multa de tráfico es una admisión de culpabilidad que agregará puntos a tu récord de conducir y puede aumentar tus tarifas de seguro. Antes de pagar, consulta con nosotros para ver si podemos reducir o desestimar la multa.',
        },
        {
          question: '¿Cuántos puntos se agregarán a mi licencia?',
          answer:
            'Los valores de puntos varían por violación en Carolina del Norte. Las multas por velocidad típicamente agregan 2-4 puntos, mientras que violaciones más serias como conducción imprudente agregan 4 puntos. Acumular 12 puntos en 3 años puede resultar en suspensión de licencia.',
        },
        {
          question: '¿Puedo mantener una multa de tráfico fuera de mi récord?',
          answer:
            'En muchos casos, sí. A menudo podemos negociar con fiscales para reducir cargos a violaciones que no involucran movimiento o desestimar multas completamente, especialmente para infractores por primera vez o violaciones menores.',
        },
      ],
    },
    relatedServices: {
      en: [
        'Speeding Ticket Defense',
        'DUI/DWI Defense',
        'Reckless Driving Defense',
        'License Restoration',
        'CDL Violations',
        'Hit and Run Defense',
      ],
      es: [
        'Defensa de Multas por Velocidad',
        'Defensa DUI/DWI',
        'Defensa de Conducción Imprudente',
        'Restauración de Licencia',
        'Violaciones de CDL',
        'Defensa de Atropello y Fuga',
      ],
    },
    icon: 'Car',
  },
  {
    key: 'workers-compensation',
    name: {
      en: "Workers' Compensation",
      es: 'Compensación Laboral',
    },
    slug: {
      en: 'workers-compensation',
      es: 'compensacion-laboral',
    },
    description: {
      en: "Expert workers' compensation representation to get you the benefits you deserve after a workplace injury or occupational illness.",
      es: 'Representación experta en compensación laboral para obtener los beneficios que mereces después de una lesión en el trabajo o enfermedad ocupacional.',
    },
    benefits: {
      en: [
        "Experienced workers' compensation attorneys in North Carolina",
        'Bilingual representation for Spanish-speaking workers',
        'Maximum benefits for medical treatment and lost wages',
        'Protection against employer retaliation for filing claims',
        'Appeals representation if your claim is denied',
        'Free consultations to evaluate your workplace injury case',
      ],
      es: [
        'Abogados experimentados en compensación laboral en Carolina del Norte',
        'Representación bilingüe para trabajadores de habla hispana',
        'Máximos beneficios para tratamiento médico y salarios perdidos',
        'Protección contra represalias del empleador por presentar reclamos',
        'Representación en apelaciones si tu reclamo es negado',
        'Consultas gratuitas para evaluar tu caso de lesión laboral',
      ],
    },
    process: {
      en: [
        'Free consultation to evaluate your workplace injury claim',
        "Assistance with filing workers' compensation paperwork",
        'Medical treatment coordination and bill management',
        'Appeals representation if benefits are denied or terminated',
      ],
      es: [
        'Consulta gratuita para evaluar tu reclamo de lesión laboral',
        'Asistencia con la presentación de documentos de compensación laboral',
        'Coordinación de tratamiento médico y manejo de facturas',
        'Representación en apelaciones si los beneficios son negados o terminados',
      ],
    },
    faqs: {
      en: [
        {
          question: 'What should I do immediately after a workplace injury?',
          answer:
            'Report the injury to your supervisor immediately, seek medical attention, and request that a Form 18 (First Report of Injury) be filed. Document everything and avoid giving detailed statements to insurance representatives without legal counsel.',
        },
        {
          question: 'Can I choose my own doctor for treatment?',
          answer:
            "In North Carolina, your employer or their insurance company initially chooses your treating physician. However, you have the right to request a change of physician if you're unsatisfied with your treatment.",
        },
        {
          question: "What if my workers' compensation claim is denied?",
          answer:
            'You have the right to appeal a denied claim. We can help you file an appeal with the North Carolina Industrial Commission and represent you throughout the appeals process to fight for the benefits you deserve.',
        },
      ],
      es: [
        {
          question: '¿Qué debo hacer inmediatamente después de una lesión laboral?',
          answer:
            'Reporta la lesión a tu supervisor inmediatamente, busca atención médica, y solicita que se presente un Formulario 18 (Primer Reporte de Lesión). Documenta todo y evita dar declaraciones detalladas a representantes de seguros sin consejo legal.',
        },
        {
          question: '¿Puedo elegir mi propio médico para el tratamiento?',
          answer:
            'En Carolina del Norte, tu empleador o su compañía de seguros inicialmente elige tu médico tratante. Sin embargo, tienes el derecho de solicitar un cambio de médico si no estás satisfecho con tu tratamiento.',
        },
        {
          question: '¿Qué pasa si mi reclamo de compensación laboral es negado?',
          answer:
            'Tienes el derecho de apelar un reclamo negado. Podemos ayudarte a presentar una apelación con la Comisión Industrial de Carolina del Norte y representarte durante todo el proceso de apelaciones para luchar por los beneficios que mereces.',
        },
      ],
    },
    relatedServices: {
      en: [
        'Workplace Injury Claims',
        'Occupational Disease Claims',
        'Disability Benefits',
        'Medical Treatment Authorization',
        'Return to Work Issues',
        "Workers' Comp Appeals",
      ],
      es: [
        'Reclamos de Lesiones Laborales',
        'Reclamos de Enfermedades Ocupacionales',
        'Beneficios por Discapacidad',
        'Autorización de Tratamiento Médico',
        'Problemas de Regreso al Trabajo',
        'Apelaciones de Compensación Laboral',
      ],
    },
    icon: 'HardHat',
  },
];

export function getPracticeAreaByKey(key: string): PracticeAreaData | undefined {
  return practiceAreas.find(area => area.key === key);
}

export function getPracticeAreaBySlug(
  slug: string,
  language: 'en' | 'es'
): PracticeAreaData | undefined {
  return practiceAreas.find(area => area.slug[language] === slug);
}
