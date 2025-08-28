export interface Attorney {
  id: string;
  name: string;
  slug: string;
  title: string;
  titleEs: string;
  image: string;
  imageId?: string; // Database image ID for gradual migration
  practiceAreas: string[];
  languages: string[];
  education: Array<{
    institution: string;
    degree: string;
    year?: string;
  }>;
  barAdmissions: Array<{
    state: string;
    year?: string;
    description?: string;
  }>;
  associations: Array<{
    name: string;
    role?: string;
    years?: string;
  }>;
  bio: string;
  bioEs: string;
  militaryService?: {
    branch: string;
    years: string;
    awards?: string[];
    role?: string;
  };
  email?: string;
  phone?: string;
  offices?: string[];
  specialAchievements?: string[];
}

export const attorneys: Attorney[] = [
  {
    id: 'william-vasquez',
    name: 'William J. Vásquez',
    slug: 'william-vasquez',
    title: 'Attorney and Founder',
    titleEs: 'Director Ejecutivo y Abogado Principal',
    image: '/images/attorneys/william-vasquez.jpg',
    imageId: 'cmeublit3000jsfmz573fl78r', // william-vasquez.jpg
    practiceAreas: [
      'Immigration Law',
      'Criminal Defense',
      'Federal Criminal Defense',
      'Traffic Violations',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'North Carolina Central University School of Law',
        degree: 'J.D. | Juris Doctor',
        year: '2011',
      },
      {
        institution: 'Campbell University',
        degree: 'B.S. | Computer Science',
        year: '2007',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
        year: '2011',
      },
      {
        state: 'Federal Courts',
        description: '4th, 5th and 11th Circuits',
        year: '2011',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
        years: '2011 - Present',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member in Good Standing',
        years: 'Since 2011',
      },
    ],
    militaryService: {
      branch: 'U.S. Air Force',
      years: '2000-2007',
      role: 'Spanish Linguist, Defense Intelligence Agency',
      awards: ['Joint Service Achievement Medal (2005)', 'Operation Enduring Freedom Veteran'],
    },
    bio: `William Vásquez is a native of Queens, NY and a decorated U.S. Air Force veteran. After serving as a Spanish linguist for the Defense Intelligence Agency during Operation Enduring Freedom, he pursued his legal education, earning his J.D. from North Carolina Central University School of Law. With over a decade of legal experience, William specializes in immigration law and criminal defense, bringing military discipline and bilingual expertise to every case. His motto "YO PELEO POR TI™" reflects his commitment to fighting for his clients' rights with the same dedication he showed serving his country.`,
    bioEs: `Licenciado William Vásquez es nativo de Queens, NY y un veterano condecorado de la Fuerza Aérea de los Estados Unidos. Como hijo de inmigrantes, comprende personalmente los desafíos que enfrentan las familias hispanas al navegar el sistema legal estadounidense. Después de servir con honor como lingüista de español para la Agencia de Inteligencia de Defensa durante la Operación Libertad Duradera, recibió múltiples condecoraciones militares antes de dedicarse al derecho. Obtuvo su título de Juris Doctor (J.D.) de la prestigiosa Facultad de Derecho de la Universidad Central de Carolina del Norte en 2011, graduándose con especialización en derecho constitucional e inmigración. Colegiado en Carolina del Norte y ante los tribunales federales de los circuitos 4º, 5º y 11º, el Licenciado Vásquez es miembro activo de la Asociación Americana de Abogados de Inmigración (AILA) desde 2011. Con más de 35 años de experiencia legal combinada en su firma, se especializa en casos complejos de inmigración, defensa criminal federal y violaciones de tráfico. Su enfoque bilingüe y comprensión cultural le permiten comunicarse efectivamente con clientes de habla hispana, explicando procesos legales complejos en términos claros y comprensibles. Su lema "YO PELEO POR TI™" no es solo una frase publicitaria, sino un compromiso personal que refleja su dedicación militar aplicada a la defensa legal de la comunidad latina.`,
    specialAchievements: [
      'Joint Service Achievement Medal recipient',
      'Operation Enduring Freedom veteran',
      'Founded Vasquez Law Firm to serve immigrant communities',
      '35+ years of combined legal experience with the firm',
    ],
    offices: ['Charlotte', 'Raleigh', 'Smithfield'],
  },
  {
    id: 'kelly-vega',
    name: 'Kelly Vega',
    slug: 'kelly-vega',
    title: 'Immigration Attorney',
    titleEs: 'Abogada de Inmigración',
    image: '/images/attorneys/kelly-vega.jpg',
    imageId: 'cmeublds0000csfmziat0mqb5', // kelly-vega.jpg
    practiceAreas: [
      'Immigration Law',
      'Family-Based Immigration',
      'Deportation Defense',
      'VAWA Cases',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Kelly Vega is a dedicated immigration attorney who fights tirelessly for her clients' rights. She specializes in family-based immigration, deportation defense, and VAWA cases. Her compassionate approach and deep understanding of immigration law make her an invaluable advocate for immigrant families navigating the complex U.S. immigration system.`,
    bioEs: `Licenciada Kelly Vega es una abogada de inmigración dedicada y compasiva que ha consagrado su carrera legal a reunir familias y defender los derechos de los inmigrantes más vulnerables. Como defensora bilingüe con profunda comprensión de las luchas que enfrentan las familias hispanas separadas por fronteras y políticas migratorias complejas, la Licenciada Vega se especializa en casos que tocan el corazón de la experiencia migratoria latina. Su práctica se enfoca en inmigración familiar, incluyendo peticiones de familiares inmediatos, visas de prometido(a) K-1, ajustes de estatus para esposos y padres de ciudadanos americanos, y casos de perdón por presencia ilegal. En defensa contra deportación, representa a familias en procedimientos de remoción, apelaciones ante la Junta de Apelaciones de Inmigración (BIA), y casos de reapertura. La Licenciada Vega también se especializa en casos de VAWA (Ley de Violencia contra la Mujer), ayudando a mujeres y hombres víctimas de violencia doméstica a obtener estatus legal independiente de sus abusadores, proceso que requiere tanto conocimiento legal como sensibilidad hacia el trauma. Colegiada en Carolina del Norte y miembro activo de AILA, habla español con fluidez y comprende las nuances culturales que afectan las decisiones migratorias de la comunidad latina. Su enfoque compasivo pero determinado ha reunido a cientos de familias y brindado esperanza a aquellos que parecían no tener opciones legales.`,
    offices: ['Charlotte', 'Raleigh'],
  },
  {
    id: 'rebecca-sommer',
    name: 'Rebecca Sommer',
    slug: 'rebecca-sommer',
    title: 'Criminal Defense Attorney',
    titleEs: 'Abogada de Defensa Penal',
    image: '/images/attorneys/rebecca-sommer.jpg',
    imageId: 'cmeublfjd000fsfmztwlay6wd', // rebecca-sommer.jpg
    practiceAreas: [
      'Criminal Defense',
      'DWI/DUI Defense',
      'Drug Charges',
      'Federal Criminal Defense',
    ],
    languages: ['English'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
      {
        name: 'National Association of Criminal Defense Lawyers',
        role: 'Member',
      },
    ],
    bio: `Rebecca Sommer is an experienced criminal defense attorney who provides aggressive representation for clients facing criminal charges. With expertise in DWI/DUI defense, drug charges, and federal criminal cases, she fights to protect her clients' rights and freedom. Her strategic approach and courtroom experience make her a formidable advocate in the criminal justice system.`,
    bioEs: `Rebecca Sommer es una abogada experimentada en defensa penal que proporciona representación agresiva para clientes que enfrentan cargos criminales. Con experiencia en defensa de DWI/DUI, cargos de drogas y casos criminales federales, ella lucha para proteger los derechos y la libertad de sus clientes. Su enfoque estratégico y experiencia en la corte la convierten en una defensora formidable en el sistema de justicia penal.`,
    offices: ['Charlotte', 'Raleigh'],
  },
  {
    id: 'jillian-baucom',
    name: 'Jillian Baucom',
    slug: 'jillian-baucom',
    title: 'Immigration Attorney',
    titleEs: 'Abogada de Inmigración',
    image: '/images/attorneys/jillian-baucom.jpg',
    imageId: 'cmeublcg50009sfmzbrh6qnzr', // jillian-baucom.jpg
    practiceAreas: [
      'Immigration Law',
      'Employment-Based Immigration',
      'Citizenship',
      'Green Cards',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Jillian Baucom focuses her practice on immigration law, with particular expertise in employment-based immigration and citizenship matters. She guides clients through the complex process of obtaining green cards, work visas, and U.S. citizenship. Her attention to detail and commitment to client success have helped countless individuals and families achieve their American dream.`,
    bioEs: `Licenciada Jillian Baucom dedica su práctica legal a ayudar a profesionales latinos y familias inmigrantes a alcanzar la estabilidad migratoria a través de la inmigración basada en empleo y el proceso de naturalización hacia la ciudadanía estadounidense. Como abogada bilingüe especializada en los aspectos más técnicos y detallados del derecho migratorio, la Licenciada Baucom guía a clientes latinos a través de procesos complejos que requieren precisión absoluta y conocimiento profundo de los reglamentos federales. Su experiencia en inmigración laboral incluye visas de trabajo temporales, peticiones de tarjetas verdes basadas en empleo, certificaciones laborales PERM, y ajustes de estatus para profesionales extranjeros. En asuntos de ciudadanía, representa a residentes permanentes en aplicaciones de naturalización, casos de ciudadanía derivada, y situaciones complejas que involucran antecedentes criminales o problemas de elegibilidad. La Licenciada Baucom se distingue por su meticulosa atención al detalle y su capacidad para explicar en español claro los requisitos técnicos y plazos críticos que pueden determinar el éxito o fracaso de una petición migratoria. Colegiada en Carolina del Norte y miembro activo de AILA, comprende que para muchas familias latinas, estos procesos representan la culminación de años de sacrificio y trabajo duro. Su compromiso personal con el éxito de cada cliente ha ayudado a cientos de individuos y familias a lograr la seguridad migratoria y realizar su sueño americano, convirtiéndose en ciudadanos estadounidenses orgullosos de sus raíces culturales.`,
    offices: ['Charlotte', 'Smithfield'],
  },
  {
    id: 'adrianna-ingram',
    name: 'Adrianna Ingram',
    slug: 'adrianna-ingram',
    title: 'Criminal Defense and Family Law Attorney',
    titleEs: 'Abogada de Defensa Penal y Derecho de Familia',
    image: '/images/attorneys/adrianna-ingram.jpg',
    imageId: 'cmeubl9fw0006sfmz2kjgcvcd', // adrianna-ingram.jpg
    practiceAreas: [
      'Criminal Defense',
      'Family Law',
      'Divorce',
      'Child Custody',
      'Domestic Violence',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
      {
        name: 'North Carolina Bar Association Family Law Section',
        role: 'Member',
      },
    ],
    bio: `Adrianna Ingram brings compassion and tenacity to her dual practice in criminal defense and family law. She understands that legal issues affecting families require both strength and sensitivity. Whether defending clients against criminal charges or guiding them through divorce and custody matters, Adrianna provides personalized attention and fierce advocacy.`,
    bioEs: `Licenciada Adrianna Ingram aporta compasión y tenacidad a su práctica dual especializada en defensa penal y derecho familiar. Como abogada bilingüe, comprende las necesidades únicas de las familias hispanas que enfrentan crisis legales que pueden cambiar el curso de sus vidas. Su experiencia abarca desde casos de defensa criminal que incluyen cargos por violencia doméstica, DUI, y delitos relacionados con drogas, hasta asuntos complejos de derecho familiar como divorcios contested, custodia de menores, manutención conyugal y de hijos, y órdenes de protección. La Licenciada Ingram se destaca por su habilidad para comunicarse efectivamente en español con clientes que necesitan explicaciones claras sobre procesos legales complicados. Su enfoque compasivo reconoce que las familias están pasando por momentos difíciles, mientras que su tenacidad asegura que los derechos de sus clientes sean protegidos agresivamente en la corte. Colegiada en Carolina del Norte y miembro activo de la Sección de Derecho Familiar del Colegio de Abogados de Carolina del Norte, ha manejado exitosamente cientos de casos que afectan el bienestar de familias latinas en toda la región.`,
    offices: ['Raleigh', 'Smithfield'],
  },
  {
    id: 'roselyn-v-torrellas',
    name: 'Roselyn V. Torrellas',
    slug: 'roselyn-v-torrellas',
    title: 'Immigration Attorney',
    titleEs: 'Abogada de Inmigración',
    image: '/images/attorneys/roselyn-torrellas.jpg',
    imageId: 'cmeublgs4000hsfmzkcrfbdk7', // roselyn-torrellas.jpg
    practiceAreas: ['Immigration Law', 'Asylum', 'U-Visas', 'DACA', 'Deportation Defense'],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Roselyn V. Torrellas is a passionate immigration attorney dedicated to protecting the rights of immigrants. She specializes in humanitarian immigration cases, including asylum, U-visas, and DACA applications. Her experience in deportation defense has helped keep families together and provide hope to those facing removal proceedings.`,
    bioEs: `Licenciada Roselyn V. Torrellas es una abogada de inmigración apasionada y defensora incansable de los derechos de los inmigrantes, especialmente aquellos que huyen de la persecución y violencia en sus países de origen. Como latina que comprende personalmente los desafíos de la inmigración, la Licenciada Torrellas se especializa en casos humanitarios complejos que requieren no solo conocimiento legal profundo, sino también sensibilidad cultural y empatía genuina. Su experiencia abarca casos de asilo para víctimas de violencia doméstica, persecución política y religiosa, trata de personas y violencia de pandillas; visas U para víctimas de crímenes que han colaborado con las autoridades; solicitudes de DACA (Acción Diferida para los Llegados en la Infancia); visas T para víctimas de trata humana; y casos de VAWA (Ley de Violencia contra la Mujer). En los tribunales de inmigración, la Licenciada Torrellas ha defendido exitosamente a cientos de familias en procedimientos de remoción, utilizando todas las defensas disponibles para mantener unidas a las familias. Colegiada en Carolina del Norte y miembro activo de AILA, habla español con fluidez nativa y se dedica a explicar claramente los procesos migratorios a clientes que muchas veces están experimentando los momentos más difíciles de sus vidas. Su compromiso va más allá de la representación legal: es una defensora comunitaria que educa a la comunidad latina sobre sus derechos migratorios.`,
    offices: ['Charlotte', 'Orlando'],
  },
  {
    id: 'christopher-afanador',
    name: 'Christopher Afanador',
    slug: 'christopher-afanador',
    title: 'Immigration Attorney',
    titleEs: 'Abogado de Inmigración',
    image: '/images/attorneys/christopher-afanador.jpg',
    imageId: 'cmeublbqt0008sfmzp0whkmir', // christopher-afanador.jpg
    practiceAreas: [
      'Immigration Law',
      'Business Immigration',
      'H-1B Visas',
      'Green Cards',
      'Naturalization',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Christopher Afanador focuses on immigration law with particular expertise in business immigration matters. He assists employers and employees with H-1B visas, employment-based green cards, and other work authorization issues. His understanding of both business needs and immigration requirements makes him an effective advocate for corporate clients and skilled workers.`,
    bioEs: `Licenciado Christopher Afanador se especializa en derecho de inmigración con experiencia particular en inmigración empresarial y laboral, sirviendo tanto a empleadores como a profesionales extranjeros que buscan trabajar legalmente en los Estados Unidos. Como abogado bilingüe con comprensión profunda de las necesidades comerciales y los complejos requisitos migratorios, el Licenciado Afanador representa exitosamente a empresas que buscan contratar talento extranjero calificado, así como a profesionales latinos que desean establecer sus carreras en territorio estadounidense. Su práctica abarca visas H-1B para trabajadores especializados, visas L-1 para ejecutivos y gerentes multinacionales, visas O-1 para individuos con habilidades extraordinarias, visas TN bajo el USMCA para profesionales mexicanos y canadienses, y el proceso completo de certificación laboral PERM para tarjetas verdes basadas en empleo. El Licenciado Afanador también maneja casos de ajuste de estatus, renovaciones de autorización de trabajo, y naturalizaciones para residentes permanentes. Colegiado en Carolina del Norte y miembro activo de AILA, se destaca por su habilidad para explicar en español los procesos migratorios empresariales complejos, asegurando que tanto empleadores como empleados comprendan completamente sus derechos y obligaciones. Su enfoque estratégico combina conocimiento legal profundo con sensibilidad hacia las necesidades culturales y lingüísticas de la comunidad latina profesional.`,
    offices: ['Charlotte', 'Raleigh'],
  },
  {
    id: 'judith-parkes',
    name: 'Judith Parkes',
    slug: 'judith-parkes',
    title: "Personal Injury and Workers' Compensation Attorney",
    titleEs: 'Abogada de Lesiones Personales y Compensación Laboral',
    image: '/images/attorneys/judith-parkes.jpg',
    imageId: 'cmeublddi000bsfmzh4ylsde8', // judith-parkes.jpg
    practiceAreas: [
      'Personal Injury',
      "Workers' Compensation",
      'Auto Accidents',
      'Medical Malpractice',
      'Workplace Injuries',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
      {
        name: 'North Carolina Bar Association',
        role: 'Member',
      },
      {
        name: "Workers' Compensation Section",
        role: 'Member',
      },
    ],
    bio: `Judith Parkes is a dedicated personal injury and workers' compensation attorney who fights tirelessly for clients who have been injured due to the negligence of others. With extensive experience in auto accidents, workplace injuries, and medical malpractice cases, she understands the physical, emotional, and financial toll that injuries can take on individuals and families. Judith's compassionate approach combined with her aggressive advocacy ensures that her clients receive the compensation they deserve.`,
    bioEs: `Licenciada Judith Parkes es una abogada especializada en lesiones personales y compensación laboral que dedica su carrera a luchar por los derechos de trabajadores latinos y familias que han sufrido lesiones debido a la negligencia de otros. Como defensora bilingüe, la Licenciada Parkes comprende que los trabajadores hispanos a menudo enfrentan barreras únicas cuando se lesionan en el trabajo, incluyendo temores sobre el estatus migratorio, dificultades con el idioma, y falta de conocimiento sobre sus derechos legales. Su experiencia abarca accidentes automovilísticos graves, lesiones en sitios de construcción, accidentes de maquinaria industrial, lesiones de espalda y cuello, negligencia médica, y casos de muerte por negligencia. En el área de compensación laboral, representa a trabajadores que han sufrido lesiones laborales, enfermedades ocupacionales, lesiones repetitivas, y aquellos cuyas reclamaciones han sido negadas injustamente. La Licenciada Parkes se destaca por su capacidad de explicar en español claro los procesos legales complejos, asegurando que sus clientes entiendan completamente sus derechos y opciones. Colegiada en Carolina del Norte y miembro activo de la Sección de Compensación Laboral del Colegio de Abogados, ha recuperado millones de dólares en compensación para familias latinas, ayudándolas a cubrir gastos médicos, salarios perdidos, y dolor y sufrimiento. Su enfoque compasivo reconoce el trauma que las lesiones causan, mientras que su defensa agresiva en las negociaciones y en la corte asegura que las compañías de seguros no se aprovechen de clientes vulnerables.`,
    specialAchievements: [
      "Specialized training in workers' compensation law",
      'Extensive trial experience in personal injury cases',
      'Bilingual advocacy for Spanish-speaking clients',
      'Community volunteer for injury prevention programs',
    ],
    offices: ['Charlotte', 'Raleigh', 'Smithfield'],
  },
  {
    id: 'mark-kelsey',
    name: 'Mark Kelsey',
    slug: 'mark-kelsey',
    title: 'Personal Injury and Criminal Defense Attorney',
    titleEs: 'Abogado de Lesiones Personales y Defensa Criminal',
    image: '/images/attorneys/mark-kelsey.jpg',
    imageId: 'cmeublf5d000esfmzdxedu2x2', // mark-kelsey.jpg
    practiceAreas: [
      'Personal Injury',
      'Criminal Defense',
      'DWI/DUI Defense',
      'Auto Accidents',
      'Truck Accidents',
      'Motorcycle Accidents',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
      {
        name: 'National Association of Criminal Defense Lawyers',
        role: 'Member',
      },
      {
        name: 'American Association for Justice',
        role: 'Member',
      },
    ],
    bio: `Mark Kelsey brings a unique dual expertise in both personal injury and criminal defense law. His experience defending clients against criminal charges gives him valuable insight into insurance company tactics in personal injury cases. Whether representing clients injured in accidents or defending them against criminal charges, Mark provides skilled representation with a focus on protecting his clients' rights and achieving the best possible outcomes.`,
    bioEs: `Licenciado Mark Kelsey aporta una experiencia dual única y valiosa tanto en lesiones personales como en defensa criminal, lo que le permite ofrecer a la comunidad latina una perspectiva integral sobre asuntos legales que a menudo se intersectan en las vidas de las familias hispanas. Como abogado bilingüe, el Licenciado Kelsey comprende que muchos clientes latinos enfrentan simultáneamente problemas de lesiones personales y asuntos criminales, como en casos donde un accidente automovilístico resulta en cargos de DUI, o cuando víctimas de accidentes enfrentan cargos criminales injustos. Su experiencia en defensa criminal incluye casos de DUI/DWI, cargos de drogas, violencia doméstica, cargos de tráfico grave, y delitos menores y mayores. En lesiones personales, maneja accidentes automovilísticos, accidentes de motocicleta, accidentes de camión, atropello y fuga, y lesiones en propiedades comerciales. Esta combinación única le da perspectiva valiosa sobre las tácticas que usan las compañías de seguros y los fiscales, permitiéndole anticipar y contrarrestar estrategias adversas. El Licenciado Kelsey se destaca por su habilidad para comunicarse efectivamente en español con clientes que pueden estar confundidos o intimidados por el sistema legal estadounidense. Colegiado en Carolina del Norte y miembro de la Asociación Nacional de Abogados de Defensa Criminal y la Asociación Americana para la Justicia, ha logrado resoluciones favorables para cientos de familias latinas, protegiendo tanto su bienestar financiero como su libertad personal. Su enfoque estratégico y experiencia en la corte lo convierten en un defensor formidable que lucha incansablemente por los mejores resultados para sus clientes.`,
    specialAchievements: [
      'Dual practice expertise in personal injury and criminal defense',
      'Extensive DWI/DUI defense experience',
      'Trial attorney with significant courtroom experience',
      'Bilingual services for Spanish-speaking clients',
    ],
    offices: ['Charlotte', 'Raleigh'],
  },
];

export function getAttorneyBySlug(slug: string): Attorney | undefined {
  return attorneys.find(attorney => attorney.slug === slug);
}

export function getAttorneysByOffice(office: string): Attorney[] {
  return attorneys.filter(attorney => attorney.offices?.includes(office));
}

export function getAttorneysByPracticeArea(area: string): Attorney[] {
  return attorneys.filter(attorney => attorney.practiceAreas.includes(area));
}

// Alias for backward compatibility
export const attorneyProfiles = attorneys;
