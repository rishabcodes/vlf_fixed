interface PracticeAreaContent {
  title: string;
  subtitle?: string;
  description: string;
  overview: {
    title?: string;
    content: string;
    highlights?: string[];
  };
  services: Array<{
    title: string;
    description: string;
    icon?: string;
    features?: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

type ContentStructure = {
  [language: string]: {
    [practiceArea: string]: {
      [subArea: string]: PracticeAreaContent;
    };
  };
};

export const practiceAreaContent: ContentStructure = {
  en: {
    'traffic-violations': {
      'speeding-tickets': {
        title: 'Speeding Ticket Defense',
        subtitle: 'Protect Your Driving Record',
        description: 'Expert legal defense against speeding violations in North Carolina. We fight to reduce or dismiss charges, protecting your license and insurance rates.',
        overview: {
          title: 'Professional Speeding Ticket Defense',
          content: 'A speeding ticket can lead to increased insurance rates, points on your license, and even license suspension. Our experienced traffic attorneys understand North Carolina traffic laws and work to minimize the impact on your driving record.',
          highlights: [
            'Reduce or dismiss speeding charges',
            'Protect your driving record',
            'Prevent insurance rate increases',
            'Avoid license suspension',
            'Court representation included',
          ],
        },
        services: [
          {
            title: 'Ticket Analysis',
            description: 'Thorough review of your citation for technical errors and defenses',
            features: [
              'Radar/laser calibration issues',
              'Officer training verification',
              'Speed zone posting requirements',
              'Technical violations review',
            ],
          },
          {
            title: 'Court Representation',
            description: 'Professional representation in traffic court',
            features: [
              'Negotiate with prosecutors',
              'Present legal defenses',
              'Argue for reduced charges',
              'Handle all court appearances',
            ],
          },
          {
            title: 'License Protection',
            description: 'Strategies to protect your driving privileges',
            features: [
              'Point reduction strategies',
              'License restoration assistance',
              'DMV hearing representation',
              'Prayer for judgment continued',
            ],
          },
        ],
        faqs: [
          {
            question: 'Should I just pay my speeding ticket?',
            answer: 'Paying the ticket is an admission of guilt that adds points to your license and can increase insurance rates. Consulting an attorney first can often lead to better outcomes.',
          },
          {
            question: 'How many points will I get for speeding?',
            answer: 'In North Carolina, speeding tickets typically add 2-3 points depending on how much over the limit you were driving. Excessive speeding can result in license suspension.',
          },
          {
            question: 'Can you guarantee my ticket will be dismissed?',
            answer: 'While we cannot guarantee outcomes, our experienced attorneys have a strong track record of reducing or dismissing charges for our clients.',
          },
        ],
      },
      'reckless-driving': {
        title: 'Reckless Driving Defense',
        subtitle: 'Serious Charges Require Serious Defense',
        description: 'Aggressive legal defense against reckless driving charges. We fight to protect your freedom, license, and future.',
        overview: {
          title: 'Reckless Driving Defense Attorney',
          content: 'Reckless driving is a serious criminal charge in North Carolina that can result in jail time, heavy fines, and license suspension. Our attorneys provide aggressive defense strategies to protect your rights.',
          highlights: [
            'Criminal defense representation',
            'Avoid jail time',
            'Protect your license',
            'Minimize fines and penalties',
            'Preserve your criminal record',
          ],
        },
        services: [
          {
            title: 'Criminal Defense',
            description: 'Comprehensive defense against criminal charges',
            features: [
              'Evidence review and analysis',
              'Witness interviews',
              'Expert testimony coordination',
              'Plea negotiation',
            ],
          },
          {
            title: 'License Defense',
            description: 'Fight to keep your driving privileges',
            features: [
              'DMV hearing representation',
              'Limited driving privilege requests',
              'License restoration',
              'Point reduction strategies',
            ],
          },
        ],
        faqs: [
          {
            question: 'What constitutes reckless driving in NC?',
            answer: 'Reckless driving includes driving carelessly without regard for safety, excessive speeding, racing, passing a stopped school bus, and other dangerous behaviors.',
          },
          {
            question: 'Can I go to jail for reckless driving?',
            answer: 'Yes, reckless driving is a Class 2 misdemeanor in NC, punishable by up to 60 days in jail and fines up to $1,000.',
          },
        ],
      },
      'hit-and-run': {
        title: 'Hit and Run Defense',
        subtitle: 'Protect Your Rights and Freedom',
        description: 'Experienced defense against hit and run charges. We work to minimize consequences and protect your future.',
        overview: {
          title: 'Hit and Run Criminal Defense',
          content: 'Hit and run charges carry severe penalties including potential felony charges. Our attorneys provide immediate assistance to protect your rights and build a strong defense.',
          highlights: [
            'Immediate legal assistance',
            'Felony and misdemeanor defense',
            'Evidence preservation',
            'Victim negotiation',
            'Criminal record protection',
          ],
        },
        services: [
          {
            title: 'Criminal Defense Strategy',
            description: 'Comprehensive defense planning and execution',
            features: [
              'Case investigation',
              'Evidence analysis',
              'Witness interviews',
              'Defense preparation',
            ],
          },
          {
            title: 'Damage Mitigation',
            description: 'Minimize consequences and penalties',
            features: [
              'Restitution negotiation',
              'Victim communication',
              'Insurance coordination',
              'Plea bargaining',
            ],
          },
        ],
        faqs: [
          {
            question: 'What should I do if accused of hit and run?',
            answer: 'Contact an attorney immediately. Do not speak to police or insurance companies without legal representation. Time is critical in building your defense.',
          },
          {
            question: 'What are the penalties for hit and run?',
            answer: 'Penalties range from misdemeanor charges with fines to felony charges with prison time, depending on whether there was property damage, injury, or death.',
          },
        ],
      },
      'license-suspension': {
        title: 'License Suspension Defense',
        subtitle: 'Fight to Keep Your Driving Privileges',
        description: 'Legal help for license suspension issues. We work to restore your driving privileges and minimize the impact on your life.',
        overview: {
          title: 'License Restoration Attorney',
          content: 'License suspension can severely impact your ability to work and maintain your daily life. Our attorneys help navigate the complex process of protecting and restoring your driving privileges.',
          highlights: [
            'DMV hearing representation',
            'License restoration petitions',
            'Limited driving privileges',
            'Point reduction strategies',
            'Compliance assistance',
          ],
        },
        services: [
          {
            title: 'DMV Representation',
            description: 'Professional representation at DMV hearings',
            features: [
              'Hearing preparation',
              'Evidence presentation',
              'Legal arguments',
              'Appeals assistance',
            ],
          },
          {
            title: 'Restoration Services',
            description: 'Help getting your license back',
            features: [
              'Eligibility assessment',
              'Documentation preparation',
              'Court petitions',
              'Compliance verification',
            ],
          },
        ],
        faqs: [
          {
            question: 'Why was my license suspended?',
            answer: 'Common reasons include DWI, excessive points, failure to appear in court, unpaid fines, or failure to maintain insurance.',
          },
          {
            question: 'Can I get a limited driving privilege?',
            answer: 'Depending on the reason for suspension, you may be eligible for limited driving privileges for work, school, or medical appointments.',
          },
        ],
      },
      'cdl-violations': {
        title: 'CDL Violation Defense',
        subtitle: 'Protect Your Commercial License',
        description: 'Specialized defense for commercial drivers facing violations. We understand the unique challenges and higher stakes for CDL holders.',
        overview: {
          title: 'Commercial Driver Legal Defense',
          content: 'CDL violations can end your career. Our attorneys specialize in defending commercial drivers and understanding federal and state regulations that affect your livelihood.',
          highlights: [
            'FMCSA regulation expertise',
            'Career protection focus',
            'DOT violation defense',
            'Employer communication',
            'License preservation',
          ],
        },
        services: [
          {
            title: 'CDL Defense Strategy',
            description: 'Specialized defense for commercial drivers',
            features: [
              'Federal regulation analysis',
              'State law defense',
              'Employer advocacy',
              'Career preservation',
            ],
          },
          {
            title: 'Compliance Assistance',
            description: 'Help maintaining CDL compliance',
            features: [
              'Medical certification',
              'Log book issues',
              'Equipment violations',
              'Safety regulations',
            ],
          },
        ],
        faqs: [
          {
            question: 'How do CDL violations differ from regular tickets?',
            answer: 'CDL holders face stricter penalties, lower thresholds for violations, and career-ending consequences. Even minor violations can affect your employment.',
          },
          {
            question: 'Can I lose my CDL for violations in my personal vehicle?',
            answer: 'Yes, serious violations in any vehicle can affect your CDL. This includes DUI, leaving the scene, or using a vehicle to commit a felony.',
          },
        ],
      },
      'driving-without-license': {
        title: 'Driving Without License Defense',
        subtitle: 'Legal Help When You Need It Most',
        description: 'Defense against driving without a license charges. We help minimize penalties and work toward getting you legally on the road.',
        overview: {
          title: 'No License Violation Defense',
          content: 'Driving without a valid license is a serious offense that can lead to criminal charges. Our attorneys help navigate these charges and work toward legal solutions.',
          highlights: [
            'Criminal charge defense',
            'License obtainment assistance',
            'Penalty minimization',
            'Court representation',
            'Immigration consideration',
          ],
        },
        services: [
          {
            title: 'Criminal Defense',
            description: 'Defense against criminal charges',
            features: [
              'Charge reduction',
              'Dismissal pursuit',
              'Plea negotiation',
              'Trial representation',
            ],
          },
          {
            title: 'License Assistance',
            description: 'Help obtaining valid license',
            features: [
              'Eligibility assessment',
              'Application assistance',
              'Testing preparation',
              'Reinstatement help',
            ],
          },
        ],
        faqs: [
          {
            question: 'What are the penalties for driving without a license?',
            answer: 'Penalties include fines, possible jail time, and extended license suspension. Repeat offenses carry increasingly severe consequences.',
          },
          {
            question: 'Can this affect my immigration status?',
            answer: 'Yes, criminal convictions can impact immigration status. We work with immigration considerations in mind for our clients.',
          },
        ],
      },
      'traffic-court-representation': {
        title: 'Traffic Court Representation',
        subtitle: 'Professional Legal Advocacy',
        description: 'Experienced representation in traffic court for all types of violations. We handle your case so you can focus on your life.',
        overview: {
          title: 'Complete Traffic Court Services',
          content: 'Navigate the traffic court system with confidence. Our attorneys provide professional representation for all traffic matters, working to achieve the best possible outcome.',
          highlights: [
            'All traffic violations',
            'Court appearance handling',
            'Prosecutor negotiation',
            'Fine reduction',
            'Point minimization',
          ],
        },
        services: [
          {
            title: 'Court Representation',
            description: 'Full service traffic court advocacy',
            features: [
              'Case preparation',
              'Court appearances',
              'Negotiation services',
              'Trial representation',
            ],
          },
          {
            title: 'Violation Defense',
            description: 'Defense for all traffic violations',
            features: [
              'Moving violations',
              'Equipment violations',
              'Insurance issues',
              'Registration problems',
            ],
          },
        ],
        faqs: [
          {
            question: 'Do I need to appear in court?',
            answer: 'In most cases, we can appear on your behalf, saving you time and the stress of court appearances.',
          },
          {
            question: 'How much will this cost?',
            answer: 'Our fees are competitive and often less than the long-term cost of increased insurance rates from a conviction.',
          },
        ],
      },
    },
  },
  es: {
    'infracciones-transito': {
      'multas-exceso-velocidad': {
        title: 'Defensa de Multas por Exceso de Velocidad',
        subtitle: 'Proteja Su Récord de Conducir',
        description: 'Defensa legal experta contra violaciones de velocidad en Carolina del Norte. Luchamos para reducir o desestimar cargos, protegiendo su licencia y tarifas de seguro.',
        overview: {
          title: 'Defensa Profesional de Multas de Velocidad',
          content: 'Una multa por exceso de velocidad puede llevar a mayores tarifas de seguro, puntos en su licencia, e incluso suspensión de licencia. Nuestros abogados de tráfico experimentados entienden las leyes de tráfico de Carolina del Norte y trabajan para minimizar el impacto en su récord de conducir.',
          highlights: [
            'Reducir o desestimar cargos de velocidad',
            'Proteger su récord de conducir',
            'Prevenir aumentos en tarifas de seguro',
            'Evitar suspensión de licencia',
            'Representación en corte incluida',
          ],
        },
        services: [
          {
            title: 'Análisis de Multa',
            description: 'Revisión exhaustiva de su citación por errores técnicos y defensas',
            features: [
              'Problemas de calibración de radar/láser',
              'Verificación de entrenamiento del oficial',
              'Requisitos de señalización de zona de velocidad',
              'Revisión de violaciones técnicas',
            ],
          },
          {
            title: 'Representación en Corte',
            description: 'Representación profesional en corte de tráfico',
            features: [
              'Negociar con fiscales',
              'Presentar defensas legales',
              'Argumentar por cargos reducidos',
              'Manejar todas las apariciones en corte',
            ],
          },
          {
            title: 'Protección de Licencia',
            description: 'Estrategias para proteger sus privilegios de conducir',
            features: [
              'Estrategias de reducción de puntos',
              'Asistencia en restauración de licencia',
              'Representación en audiencias del DMV',
              'Oración por juicio continuado',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Debería simplemente pagar mi multa de velocidad?',
            answer: 'Pagar la multa es una admisión de culpabilidad que añade puntos a su licencia y puede aumentar las tarifas de seguro. Consultar con un abogado primero puede llevar a mejores resultados.',
          },
          {
            question: '¿Cuántos puntos recibiré por exceso de velocidad?',
            answer: 'En Carolina del Norte, las multas de velocidad típicamente añaden 2-3 puntos dependiendo de cuánto excedió el límite. El exceso de velocidad excesivo puede resultar en suspensión de licencia.',
          },
          {
            question: '¿Pueden garantizar que mi multa será desestimada?',
            answer: 'Aunque no podemos garantizar resultados, nuestros abogados experimentados tienen un fuerte historial de reducir o desestimar cargos para nuestros clientes.',
          },
        ],
      },
      'conduccion-imprudente': {
        title: 'Defensa de Conducción Imprudente',
        subtitle: 'Cargos Serios Requieren Defensa Seria',
        description: 'Defensa legal agresiva contra cargos de conducción imprudente. Luchamos para proteger su libertad, licencia y futuro.',
        overview: {
          title: 'Abogado de Defensa de Conducción Imprudente',
          content: 'La conducción imprudente es un cargo criminal serio en Carolina del Norte que puede resultar en tiempo en la cárcel, multas pesadas y suspensión de licencia. Nuestros abogados proveen estrategias de defensa agresivas para proteger sus derechos.',
          highlights: [
            'Representación de defensa criminal',
            'Evitar tiempo en la cárcel',
            'Proteger su licencia',
            'Minimizar multas y penalidades',
            'Preservar su récord criminal',
          ],
        },
        services: [
          {
            title: 'Defensa Criminal',
            description: 'Defensa comprehensiva contra cargos criminales',
            features: [
              'Revisión y análisis de evidencia',
              'Entrevistas a testigos',
              'Coordinación de testimonio experto',
              'Negociación de declaración',
            ],
          },
          {
            title: 'Defensa de Licencia',
            description: 'Luchar para mantener sus privilegios de conducir',
            features: [
              'Representación en audiencias del DMV',
              'Solicitudes de privilegio de conducir limitado',
              'Restauración de licencia',
              'Estrategias de reducción de puntos',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Qué constituye conducción imprudente en NC?',
            answer: 'La conducción imprudente incluye conducir descuidadamente sin consideración por la seguridad, exceso de velocidad excesivo, carreras, pasar un autobús escolar detenido y otros comportamientos peligrosos.',
          },
          {
            question: '¿Puedo ir a la cárcel por conducción imprudente?',
            answer: 'Sí, la conducción imprudente es un delito menor de Clase 2 en NC, punible con hasta 60 días en la cárcel y multas de hasta $1,000.',
          },
        ],
      },
      'atropello-fuga': {
        title: 'Defensa de Atropello y Fuga',
        subtitle: 'Proteja Sus Derechos y Libertad',
        description: 'Defensa experimentada contra cargos de atropello y fuga. Trabajamos para minimizar consecuencias y proteger su futuro.',
        overview: {
          title: 'Defensa Criminal de Atropello y Fuga',
          content: 'Los cargos de atropello y fuga conllevan penalidades severas incluyendo posibles cargos de felonía. Nuestros abogados proveen asistencia inmediata para proteger sus derechos y construir una defensa fuerte.',
          highlights: [
            'Asistencia legal inmediata',
            'Defensa de felonía y delito menor',
            'Preservación de evidencia',
            'Negociación con víctimas',
            'Protección de récord criminal',
          ],
        },
        services: [
          {
            title: 'Estrategia de Defensa Criminal',
            description: 'Planificación y ejecución de defensa comprehensiva',
            features: [
              'Investigación del caso',
              'Análisis de evidencia',
              'Entrevistas a testigos',
              'Preparación de defensa',
            ],
          },
          {
            title: 'Mitigación de Daños',
            description: 'Minimizar consecuencias y penalidades',
            features: [
              'Negociación de restitución',
              'Comunicación con víctimas',
              'Coordinación de seguros',
              'Negociación de declaración',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Qué debo hacer si soy acusado de atropello y fuga?',
            answer: 'Contacte a un abogado inmediatamente. No hable con la policía o compañías de seguros sin representación legal. El tiempo es crítico en construir su defensa.',
          },
          {
            question: '¿Cuáles son las penalidades por atropello y fuga?',
            answer: 'Las penalidades van desde cargos de delito menor con multas hasta cargos de felonía con tiempo en prisión, dependiendo si hubo daño a propiedad, lesiones o muerte.',
          },
        ],
      },
      'suspension-licencia': {
        title: 'Defensa de Suspensión de Licencia',
        subtitle: 'Luche por Mantener Sus Privilegios de Conducir',
        description: 'Ayuda legal para problemas de suspensión de licencia. Trabajamos para restaurar sus privilegios de conducir y minimizar el impacto en su vida.',
        overview: {
          title: 'Abogado de Restauración de Licencia',
          content: 'La suspensión de licencia puede impactar severamente su habilidad para trabajar y mantener su vida diaria. Nuestros abogados ayudan a navegar el proceso complejo de proteger y restaurar sus privilegios de conducir.',
          highlights: [
            'Representación en audiencias del DMV',
            'Peticiones de restauración de licencia',
            'Privilegios de conducir limitados',
            'Estrategias de reducción de puntos',
            'Asistencia de cumplimiento',
          ],
        },
        services: [
          {
            title: 'Representación en el DMV',
            description: 'Representación profesional en audiencias del DMV',
            features: [
              'Preparación de audiencia',
              'Presentación de evidencia',
              'Argumentos legales',
              'Asistencia en apelaciones',
            ],
          },
          {
            title: 'Servicios de Restauración',
            description: 'Ayuda para recuperar su licencia',
            features: [
              'Evaluación de elegibilidad',
              'Preparación de documentación',
              'Peticiones en corte',
              'Verificación de cumplimiento',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Por qué fue suspendida mi licencia?',
            answer: 'Razones comunes incluyen DWI, puntos excesivos, falta de aparecer en corte, multas sin pagar, o falta de mantener seguro.',
          },
          {
            question: '¿Puedo obtener un privilegio de conducir limitado?',
            answer: 'Dependiendo de la razón de suspensión, puede ser elegible para privilegios de conducir limitados para trabajo, escuela o citas médicas.',
          },
        ],
      },
      'violaciones-cdl': {
        title: 'Defensa de Violaciones de CDL',
        subtitle: 'Proteja Su Licencia Comercial',
        description: 'Defensa especializada para conductores comerciales enfrentando violaciones. Entendemos los desafíos únicos y mayores riesgos para titulares de CDL.',
        overview: {
          title: 'Defensa Legal de Conductor Comercial',
          content: 'Las violaciones de CDL pueden terminar su carrera. Nuestros abogados se especializan en defender conductores comerciales y entender regulaciones federales y estatales que afectan su sustento.',
          highlights: [
            'Experiencia en regulaciones FMCSA',
            'Enfoque en protección de carrera',
            'Defensa de violaciones DOT',
            'Comunicación con empleadores',
            'Preservación de licencia',
          ],
        },
        services: [
          {
            title: 'Estrategia de Defensa CDL',
            description: 'Defensa especializada para conductores comerciales',
            features: [
              'Análisis de regulación federal',
              'Defensa de ley estatal',
              'Abogacía con empleadores',
              'Preservación de carrera',
            ],
          },
          {
            title: 'Asistencia de Cumplimiento',
            description: 'Ayuda manteniendo cumplimiento de CDL',
            features: [
              'Certificación médica',
              'Problemas de libro de registro',
              'Violaciones de equipo',
              'Regulaciones de seguridad',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Cómo difieren las violaciones de CDL de multas regulares?',
            answer: 'Los titulares de CDL enfrentan penalidades más estrictas, umbrales más bajos para violaciones, y consecuencias que terminan carreras. Incluso violaciones menores pueden afectar su empleo.',
          },
          {
            question: '¿Puedo perder mi CDL por violaciones en mi vehículo personal?',
            answer: 'Sí, violaciones serias en cualquier vehículo pueden afectar su CDL. Esto incluye DUI, dejar la escena, o usar un vehículo para cometer una felonía.',
          },
        ],
      },
      'conducir-sin-licencia': {
        title: 'Defensa de Conducir Sin Licencia',
        subtitle: 'Ayuda Legal Cuando Más la Necesita',
        description: 'Defensa contra cargos de conducir sin licencia. Ayudamos a minimizar penalidades y trabajamos hacia ponerlo legalmente en la carretera.',
        overview: {
          title: 'Defensa de Violación Sin Licencia',
          content: 'Conducir sin una licencia válida es una ofensa seria que puede llevar a cargos criminales. Nuestros abogados ayudan a navegar estos cargos y trabajan hacia soluciones legales.',
          highlights: [
            'Defensa de cargo criminal',
            'Asistencia para obtener licencia',
            'Minimización de penalidades',
            'Representación en corte',
            'Consideración de inmigración',
          ],
        },
        services: [
          {
            title: 'Defensa Criminal',
            description: 'Defensa contra cargos criminales',
            features: [
              'Reducción de cargos',
              'Búsqueda de desestimación',
              'Negociación de declaración',
              'Representación en juicio',
            ],
          },
          {
            title: 'Asistencia de Licencia',
            description: 'Ayuda obteniendo licencia válida',
            features: [
              'Evaluación de elegibilidad',
              'Asistencia con aplicación',
              'Preparación para exámenes',
              'Ayuda de reinstalación',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Cuáles son las penalidades por conducir sin licencia?',
            answer: 'Las penalidades incluyen multas, posible tiempo en la cárcel, y suspensión extendida de licencia. Ofensas repetidas conllevan consecuencias cada vez más severas.',
          },
          {
            question: '¿Puede esto afectar mi estatus migratorio?',
            answer: 'Sí, convicciones criminales pueden impactar el estatus migratorio. Trabajamos con consideraciones de inmigración en mente para nuestros clientes.',
          },
        ],
      },
      'representacion-corte-trafico': {
        title: 'Representación en Corte de Tráfico',
        subtitle: 'Abogacía Legal Profesional',
        description: 'Representación experimentada en corte de tráfico para todos los tipos de violaciones. Manejamos su caso para que pueda enfocarse en su vida.',
        overview: {
          title: 'Servicios Completos de Corte de Tráfico',
          content: 'Navegue el sistema de corte de tráfico con confianza. Nuestros abogados proveen representación profesional para todos los asuntos de tráfico, trabajando para lograr el mejor resultado posible.',
          highlights: [
            'Todas las violaciones de tráfico',
            'Manejo de apariciones en corte',
            'Negociación con fiscales',
            'Reducción de multas',
            'Minimización de puntos',
          ],
        },
        services: [
          {
            title: 'Representación en Corte',
            description: 'Abogacía completa en corte de tráfico',
            features: [
              'Preparación del caso',
              'Apariciones en corte',
              'Servicios de negociación',
              'Representación en juicio',
            ],
          },
          {
            title: 'Defensa de Violaciones',
            description: 'Defensa para todas las violaciones de tráfico',
            features: [
              'Violaciones de movimiento',
              'Violaciones de equipo',
              'Problemas de seguro',
              'Problemas de registro',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Necesito aparecer en corte?',
            answer: 'En la mayoría de casos, podemos aparecer en su nombre, ahorrándole tiempo y el estrés de apariciones en corte.',
          },
          {
            question: '¿Cuánto costará esto?',
            answer: 'Nuestros honorarios son competitivos y a menudo menos que el costo a largo plazo de mayores tarifas de seguro por una convicción.',
          },
        ],
      },
    },
    'compensacion-laboral': {
      'beneficios-discapacidad': {
        title: 'Beneficios por Discapacidad',
        subtitle: 'Asegurando Su Futuro Después de una Lesión',
        description: 'Ayudamos a trabajadores lesionados a obtener beneficios por discapacidad completos. Luchamos por compensación máxima por lesiones laborales.',
        overview: {
          title: 'Abogado de Beneficios por Discapacidad',
          content: 'Las lesiones laborales pueden dejar a los trabajadores incapaces de volver a su empleo anterior. Nuestros abogados se aseguran de que reciba todos los beneficios por discapacidad a los que tiene derecho bajo la ley de Carolina del Norte.',
          highlights: [
            'Beneficios por discapacidad temporal',
            'Beneficios por discapacidad permanente',
            'Evaluaciones de capacidad de trabajo',
            'Cálculos de compensación máxima',
            'Protección de beneficios futuros',
          ],
        },
        services: [
          {
            title: 'Evaluación de Discapacidad',
            description: 'Evaluación completa de su discapacidad laboral',
            features: [
              'Revisión de registros médicos',
              'Coordinación con doctores',
              'Evaluaciones funcionales',
              'Determinación de restricciones',
            ],
          },
          {
            title: 'Cálculo de Beneficios',
            description: 'Asegurar compensación máxima por discapacidad',
            features: [
              'Cálculos de salario promedio',
              'Tasas de compensación',
              'Beneficios retroactivos',
              'Ajustes futuros',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Cuánto duran los beneficios por discapacidad?',
            answer: 'Los beneficios por discapacidad temporal duran hasta que pueda volver al trabajo o alcance mejora médica máxima. Los beneficios permanentes pueden durar años o toda la vida dependiendo de la severidad.',
          },
          {
            question: '¿Puedo trabajar mientras recibo beneficios?',
            answer: 'Depende de sus restricciones. El trabajo liviano o modificado puede ser posible, pero debe ser aprobado por su doctor y puede afectar sus beneficios.',
          },
        ],
      },
      'lesiones-estres-repetitivo': {
        title: 'Lesiones por Estrés Repetitivo',
        subtitle: 'Compensación por Lesiones por Uso Excesivo',
        description: 'Representación legal para trabajadores que sufren lesiones por estrés repetitivo. Entendemos estas condiciones complejas.',
        overview: {
          title: 'Abogado de RSI y Lesiones por Uso Excesivo',
          content: 'Las lesiones por estrés repetitivo se desarrollan con el tiempo y pueden ser tan debilitantes como lesiones traumáticas. Ayudamos a probar estas reclamaciones y asegurar tratamiento y compensación apropiados.',
          highlights: [
            'Síndrome del túnel carpiano',
            'Tendinitis y bursitis',
            'Lesiones de espalda y cuello',
            'Trastornos de hombro',
            'Condiciones relacionadas con computadora',
          ],
        },
        services: [
          {
            title: 'Documentación de RSI',
            description: 'Probar lesiones por estrés repetitivo relacionadas con el trabajo',
            features: [
              'Análisis de tareas laborales',
              'Evaluaciones ergonómicas',
              'Historial médico',
              'Opiniones de expertos',
            ],
          },
          {
            title: 'Planificación de Tratamiento',
            description: 'Asegurar cuidado médico apropiado',
            features: [
              'Referencias a especialistas',
              'Terapia física',
              'Modificaciones laborales',
              'Equipo ergonómico',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Son las RSI cubiertas por compensación laboral?',
            answer: 'Sí, las lesiones por estrés repetitivo están cubiertas si puede probar que fueron causadas por sus tareas laborales. La documentación es clave.',
          },
          {
            question: '¿Cuánto tiempo tengo para reportar una RSI?',
            answer: 'Debe reportar la lesión tan pronto como sea consciente de que está relacionada con el trabajo. Los retrasos pueden complicar su reclamación.',
          },
        ],
      },
      'reclamos-negados': {
        title: 'Apelaciones de Reclamos Negados',
        subtitle: 'Luchando por Sus Derechos',
        description: 'No acepte una negación. Nuestros abogados luchan agresivamente para revertir reclamos negados y obtener los beneficios que merece.',
        overview: {
          title: 'Revirtiendo Negaciones de Compensación Laboral',
          content: 'Las compañías de seguros niegan reclamos legítimos regularmente. Tenemos un historial probado de apelar exitosamente negaciones y asegurar beneficios para trabajadores lesionados.',
          highlights: [
            'Apelaciones de negación inmediatas',
            'Recopilación de nueva evidencia',
            'Testimonios de expertos médicos',
            'Representación en audiencias',
            'Litigio agresivo',
          ],
        },
        services: [
          {
            title: 'Análisis de Negación',
            description: 'Entender por qué su reclamo fue negado',
            features: [
              'Revisión de carta de negación',
              'Identificación de deficiencias',
              'Evaluación de evidencia',
              'Desarrollo de estrategia',
            ],
          },
          {
            title: 'Proceso de Apelación',
            description: 'Apelación agresiva de su negación',
            features: [
              'Presentación de apelación',
              'Recopilación de evidencia',
              'Preparación de audiencia',
              'Representación en juicio',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Por qué fue negado mi reclamo?',
            answer: 'Razones comunes incluyen falta de evidencia médica, reportes tardíos, disputas sobre si la lesión está relacionada con el trabajo, o condiciones preexistentes.',
          },
          {
            question: '¿Cuánto tiempo tengo para apelar?',
            answer: 'Los plazos de apelación son estrictos. En Carolina del Norte, típicamente tiene 2 años desde la negación, pero actuar rápidamente mejora sus posibilidades.',
          },
        ],
      },
      'regreso-trabajo': {
        title: 'Programas de Regreso al Trabajo',
        subtitle: 'Transición Segura de Vuelta al Empleo',
        description: 'Asistencia legal con programas de regreso al trabajo. Nos aseguramos de que esté médicamente listo y adecuadamente acomodado.',
        overview: {
          title: 'Navegando el Regreso al Trabajo Después de una Lesión',
          content: 'Regresar al trabajo después de una lesión requiere coordinación cuidadosa. Protegemos sus derechos mientras aseguramos una transición segura de vuelta al empleo.',
          highlights: [
            'Evaluaciones de preparación médica',
            'Negociaciones de trabajo liviano',
            'Requisitos de acomodación',
            'Protección contra represalias',
            'Continuación de beneficios',
          ],
        },
        services: [
          {
            title: 'Evaluación de Preparación',
            description: 'Asegurar que esté listo para regresar',
            features: [
              'Autorización médica',
              'Capacidades funcionales',
              'Restricciones de trabajo',
              'Evaluaciones de seguridad',
            ],
          },
          {
            title: 'Coordinación de Trabajo',
            description: 'Arreglar regreso apropiado al trabajo',
            features: [
              'Modificaciones de trabajo',
              'Cambios de horario',
              'Necesidades de equipo',
              'Monitoreo de progreso',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Puedo ser forzado a regresar al trabajo?',
            answer: 'No puede ser forzado a regresar antes de que su doctor lo autorice. Si lo presionan, contacte a un abogado inmediatamente.',
          },
          {
            question: '¿Qué pasa si no puedo hacer mi trabajo anterior?',
            answer: 'Puede tener derecho a reentrenamiento vocacional o beneficios por discapacidad si no puede volver a su trabajo anterior debido a restricciones permanentes.',
          },
        ],
      },
    },
    'defensa-criminal': {
      'delitos-cuello-blanco': {
        title: 'Defensa de Delitos de Cuello Blanco',
        subtitle: 'Protegiendo Su Reputación y Libertad',
        description: 'Defensa sofisticada contra cargos de delitos de cuello blanco. Protegemos profesionales y empresarios de acusaciones criminales complejas.',
        overview: {
          title: 'Abogado de Defensa de Delitos de Cuello Blanco',
          content: 'Los delitos de cuello blanco conllevan consecuencias severas incluyendo prisión, multas masivas y destrucción de carrera. Nuestros abogados proveen defensa estratégica contra estas acusaciones complejas.',
          highlights: [
            'Defensa de fraude y malversación',
            'Casos de evasión fiscal',
            'Violaciones de valores',
            'Lavado de dinero',
            'Crímenes cibernéticos',
          ],
        },
        services: [
          {
            title: 'Defensa de Investigación',
            description: 'Protección durante investigaciones federales y estatales',
            features: [
              'Representación de gran jurado',
              'Respuesta a citaciones',
              'Negociaciones con fiscales',
              'Preservación de evidencia',
            ],
          },
          {
            title: 'Estrategia de Juicio',
            description: 'Defensa agresiva en corte',
            features: [
              'Análisis forense financiero',
              'Testimonios de expertos',
              'Mociones previas al juicio',
              'Defensa en juicio con jurado',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Qué debo hacer si estoy bajo investigación?',
            answer: 'No hable con investigadores sin un abogado. Cualquier cosa que diga puede ser usada en su contra. Contacte a un abogado inmediatamente.',
          },
          {
            question: '¿Cuáles son las penalidades por delitos de cuello blanco?',
            answer: 'Las penalidades varían ampliamente pero pueden incluir años en prisión federal, multas de millones de dólares, restitución y pérdida de licencias profesionales.',
          },
        ],
      },
      'defensa-menores': {
        title: 'Defensa Criminal Juvenil',
        subtitle: 'Protegiendo el Futuro de Su Hijo',
        description: 'Representación compasiva pero agresiva para menores enfrentando cargos criminales. Protegemos los derechos y futuros de los jóvenes.',
        overview: {
          title: 'Abogado de Defensa Juvenil',
          content: 'El sistema de justicia juvenil es diferente, enfocándose en rehabilitación. Nuestros abogados entienden estas diferencias y luchan para proteger el futuro de su hijo.',
          highlights: [
            'Representación en corte juvenil',
            'Alternativas de desviación',
            'Sellado de registros',
            'Defensa en escuela',
            'Transferencias a corte de adultos',
          ],
        },
        services: [
          {
            title: 'Defensa Juvenil',
            description: 'Representación especializada para menores',
            features: [
              'Audiencias de detención',
              'Negociaciones de adjudicación',
              'Programas de desviación',
              'Opciones de rehabilitación',
            ],
          },
          {
            title: 'Protección de Futuro',
            description: 'Minimizar impacto a largo plazo',
            features: [
              'Sellado de registros',
              'Expurgación',
              'Protección educativa',
              'Preservación de oportunidades',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Puede mi hijo ser juzgado como adulto?',
            answer: 'En Carolina del Norte, menores de 16-17 años pueden ser transferidos a corte de adultos para ciertos delitos graves. Luchamos agresivamente contra estas transferencias.',
          },
          {
            question: '¿Afectará esto el futuro de mi hijo?',
            answer: 'Los registros juveniles pueden ser sellados en muchos casos. Trabajamos para minimizar el impacto a largo plazo en educación y oportunidades de empleo.',
          },
        ],
      },
    },
    'derecho-familia': {
      'custodia-hijos': {
        title: 'Abogado de Custodia de Hijos',
        subtitle: 'Protegiendo los Mejores Intereses de Su Hijo',
        description: 'Representación compasiva en casos de custodia. Luchamos por sus derechos parentales mientras priorizamos el bienestar de sus hijos.',
        overview: {
          title: 'Representación de Custodia de Hijos',
          content: 'Las disputas de custodia son emocionalmente desafiantes. Nuestros abogados proveen guía fuerte mientras navegan estos casos sensibles, siempre enfocándose en los mejores intereses de los niños.',
          highlights: [
            'Custodia física y legal',
            'Derechos de visitación',
            'Modificaciones de custodia',
            'Relocación parental',
            'Derechos de abuelos',
          ],
        },
        services: [
          {
            title: 'Negociación de Custodia',
            description: 'Trabajando hacia acuerdos en el mejor interés del niño',
            features: [
              'Planes de crianza',
              'Horarios de visitación',
              'Toma de decisiones conjunta',
              'Resolución de disputas',
            ],
          },
          {
            title: 'Litigio de Custodia',
            description: 'Representación agresiva en corte cuando es necesario',
            features: [
              'Preparación de evidencia',
              'Testimonios de testigos',
              'Evaluaciones de custodia',
              'Órdenes de emergencia',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Cómo determinan las cortes la custodia?',
            answer: 'Las cortes de Carolina del Norte consideran muchos factores enfocándose en los mejores intereses del niño, incluyendo estabilidad, relaciones parentales y capacidad de proveer cuidado.',
          },
          {
            question: '¿Puedo modificar una orden de custodia?',
            answer: 'Sí, las órdenes de custodia pueden ser modificadas si hay un cambio sustancial en circunstancias que afecta el bienestar del niño.',
          },
        ],
      },
      'manutencion-hijos': {
        title: 'Abogado de Manutención de Hijos',
        subtitle: 'Asegurando Apoyo Justo para Sus Hijos',
        description: 'Representación experta en asuntos de manutención de hijos. Aseguramos cálculos justos y cumplimiento para proteger el bienestar de sus hijos.',
        overview: {
          title: 'Servicios de Manutención de Hijos',
          content: 'La manutención de hijos asegura que los niños reciban apoyo financiero adecuado. Ayudamos a establecer, modificar y hacer cumplir órdenes de manutención justas.',
          highlights: [
            'Cálculos de manutención',
            'Modificaciones de órdenes',
            'Cumplimiento de pagos',
            'Casos interestatales',
            'Ajustes de ingresos',
          ],
        },
        services: [
          {
            title: 'Establecimiento de Manutención',
            description: 'Calcular y establecer manutención justa',
            features: [
              'Análisis de ingresos',
              'Pautas de Carolina del Norte',
              'Gastos especiales',
              'Necesidades médicas',
            ],
          },
          {
            title: 'Cumplimiento',
            description: 'Asegurar que se pague la manutención',
            features: [
              'Cobro de atrasos',
              'Embargo de salarios',
              'Acciones de desacato',
              'Interceptación de activos',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Cómo se calcula la manutención de hijos?',
            answer: 'Carolina del Norte usa pautas basadas en ingresos de ambos padres, número de niños, costos de cuidado de salud y otros factores.',
          },
          {
            question: '¿Cuándo termina la manutención?',
            answer: 'Generalmente a los 18 años, pero puede extenderse si el niño todavía está en la escuela secundaria o tiene necesidades especiales.',
          },
        ],
      },
      'adopcion': {
        title: 'Abogado de Adopción',
        subtitle: 'Construyendo Familias con Cuidado',
        description: 'Guía compasiva a través del proceso de adopción. Ayudamos a crear familias mientras aseguramos que todos los requisitos legales se cumplan.',
        overview: {
          title: 'Servicios Legales de Adopción',
          content: 'La adopción es un proceso hermoso pero complejo. Nuestros abogados proveen apoyo experto para asegurar que su adopción proceda sin problemas y legalmente.',
          highlights: [
            'Adopciones privadas',
            'Adopciones por padrastros',
            'Adopciones de agencias',
            'Adopciones de familiares',
            'Finalización de adopción',
          ],
        },
        services: [
          {
            title: 'Proceso de Adopción',
            description: 'Guía completa a través de la adopción',
            features: [
              'Estudios del hogar',
              'Consentimientos legales',
              'Terminación de derechos',
              'Procedimientos de corte',
            ],
          },
          {
            title: 'Apoyo Post-Adopción',
            description: 'Asistencia después de la finalización',
            features: [
              'Certificados de nacimiento',
              'Cambios de nombre',
              'Beneficios de seguro',
              'Registros de adopción',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Cuánto tiempo toma el proceso de adopción?',
            answer: 'El tiempo varía según el tipo de adopción. Las adopciones privadas pueden tomar 6-12 meses, mientras que las adopciones por padrastros pueden ser más rápidas.',
          },
          {
            question: '¿Quién puede adoptar en Carolina del Norte?',
            answer: 'Adultos solteros o parejas casadas pueden adoptar. El enfoque está en proveer un hogar estable y amoroso para el niño.',
          },
        ],
      },
      'acuerdos-prenupciales': {
        title: 'Acuerdos Prenupciales',
        subtitle: 'Protegiendo Su Futuro Juntos',
        description: 'Redacción profesional de acuerdos prenupciales. Protegemos sus intereses mientras construyen un matrimonio fuerte.',
        overview: {
          title: 'Abogado de Acuerdos Prenupciales',
          content: 'Los acuerdos prenupciales proveen claridad y protección para ambas partes. Creamos acuerdos justos que protegen activos mientras apoyan relaciones saludables.',
          highlights: [
            'Protección de activos',
            'Planificación de deudas',
            'Negocios familiares',
            'Herencias futuras',
            'Provisiones de manutención',
          ],
        },
        services: [
          {
            title: 'Redacción de Acuerdo',
            description: 'Crear acuerdos prenupciales comprehensivos',
            features: [
              'Divulgación de activos',
              'Términos de propiedad',
              'Protección de deudas',
              'Cláusulas de manutención',
            ],
          },
          {
            title: 'Revisión de Acuerdo',
            description: 'Revisar acuerdos propuestos',
            features: [
              'Análisis de equidad',
              'Revisión legal',
              'Poder de negociación',
              'Asesoramiento de firma',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Son ejecutables los acuerdos prenupciales?',
            answer: 'Sí, cuando se redactan y ejecutan apropiadamente con divulgación completa y representación legal, los acuerdos prenupciales son ejecutables en Carolina del Norte.',
          },
          {
            question: '¿Qué puede incluir un acuerdo prenupcial?',
            answer: 'Pueden abordar división de propiedad, deudas, manutención conyugal, pero no pueden predeterminar custodia de hijos o manutención de hijos.',
          },
        ],
      },
      'proteccion-violencia-domestica': {
        title: 'Protección Contra Violencia Doméstica',
        subtitle: 'Su Seguridad es Nuestra Prioridad',
        description: 'Ayuda legal inmediata para víctimas de violencia doméstica. Proveemos protección urgente y apoyo compasivo.',
        overview: {
          title: 'Abogado de Violencia Doméstica',
          content: 'La violencia doméstica requiere acción inmediata. Nuestros abogados proveen protección de emergencia mientras guían a las víctimas hacia la seguridad y estabilidad a largo plazo.',
          highlights: [
            'Órdenes de protección de emergencia',
            'Órdenes de restricción',
            'Custodia de emergencia',
            'Planificación de seguridad',
            'Recursos para víctimas',
          ],
        },
        services: [
          {
            title: 'Protección de Emergencia',
            description: 'Acción inmediata para su seguridad',
            features: [
              'Órdenes ex parte',
              'Exclusión del hogar',
              'Custodia temporal',
              'Protección de activos',
            ],
          },
          {
            title: 'Apoyo a Largo Plazo',
            description: 'Construyendo estabilidad después del abuso',
            features: [
              'Órdenes permanentes',
              'Procedimientos de divorcio',
              'Reubicación segura',
              'Conexiones de recursos',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Qué es una orden de protección contra violencia doméstica?',
            answer: 'Es una orden de la corte que prohíbe al abusador contactar o acercarse a usted. La violación puede resultar en arresto inmediato.',
          },
          {
            question: '¿Cómo obtengo protección de emergencia?',
            answer: 'Podemos ayudarle a obtener una orden ex parte inmediatamente, a menudo el mismo día, para protección de emergencia.',
          },
        ],
      },
      'tutela-legal': {
        title: 'Tutela Legal',
        subtitle: 'Protegiendo a Quienes No Pueden Protegerse',
        description: 'Establecimiento de tutela compasiva para proteger a seres queridos vulnerables. Guía experta a través de este proceso sensible.',
        overview: {
          title: 'Abogado de Tutela',
          content: 'La tutela protege a aquellos que no pueden tomar decisiones por sí mismos. Ayudamos a las familias a navegar este proceso mientras aseguran el cuidado apropiado.',
          highlights: [
            'Tutela de adultos',
            'Tutela de menores',
            'Tutela limitada',
            'Tutela de emergencia',
            'Alternativas a la tutela',
          ],
        },
        services: [
          {
            title: 'Establecimiento de Tutela',
            description: 'Crear protecciones legales apropiadas',
            features: [
              'Evaluaciones de capacidad',
              'Peticiones de corte',
              'Nombramiento de tutor',
              'Planes de cuidado',
            ],
          },
          {
            title: 'Administración de Tutela',
            description: 'Apoyo continuo para tutores',
            features: [
              'Informes anuales',
              'Gestión financiera',
              'Decisiones médicas',
              'Cumplimiento de la corte',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Cuándo se necesita la tutela?',
            answer: 'La tutela se necesita cuando alguien no puede tomar decisiones debido a incapacidad mental, enfermedad, lesión o edad menor.',
          },
          {
            question: '¿Cuáles son las alternativas a la tutela?',
            answer: 'Los poderes notariales, fideicomisos y directivas anticipadas pueden a veces evitar la necesidad de tutela formal.',
          },
        ],
      },
    },
    'lesiones-personales': {
      'responsabilidad-producto': {
        title: 'Responsabilidad del Producto',
        subtitle: 'Responsabilizando a los Fabricantes',
        description: 'Representación agresiva para víctimas de productos defectuosos. Luchamos contra grandes corporaciones por su seguridad.',
        overview: {
          title: 'Abogado de Productos Defectuosos',
          content: 'Los productos defectuosos causan lesiones graves y muertes. Responsabilizamos a los fabricantes y aseguramos compensación para las víctimas y sus familias.',
          highlights: [
            'Defectos de diseño',
            'Defectos de fabricación',
            'Advertencias inadecuadas',
            'Retiros de productos',
            'Demandas colectivas',
          ],
        },
        services: [
          {
            title: 'Investigación de Producto',
            description: 'Análisis exhaustivo de productos defectuosos',
            features: [
              'Pruebas de producto',
              'Análisis de ingeniería',
              'Historia de retiros',
              'Quejas similares',
            ],
          },
          {
            title: 'Litigio Corporativo',
            description: 'Enfrentando a grandes fabricantes',
            features: [
              'Descubrimiento extenso',
              'Testimonios de expertos',
              'Litigio multiestatal',
              'Negociaciones de acuerdo',
            ],
          },
        ],
        faqs: [
          {
            question: '¿Qué productos pueden estar defectuosos?',
            answer: 'Cualquier producto puede ser defectuoso: vehículos, dispositivos médicos, medicamentos, juguetes, electrodomésticos, herramientas y más.',
          },
          {
            question: '¿Cuánto tiempo tengo para demandar?',
            answer: 'Generalmente 3 años desde la lesión, pero algunos casos tienen plazos más cortos. Contacte a un abogado inmediatamente para proteger sus derechos.',
          },
        ],
      },
    },
  },
};