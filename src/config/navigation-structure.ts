export interface NavSubItem {
  label: { en: string; es: string };
  href: { en: string; es: string };
}

export interface NavCategory {
  label: { en: string; es: string };
  href: { en: string; es: string };
  subItems?: NavSubItem[];
}

export interface NavPracticeArea {
  label: { en: string; es: string };
  href: { en: string; es: string };
  categories: NavCategory[];
}

export interface NavItem {
  label: { en: string; es: string };
  href: { en: string; es: string };
  practiceAreas?: NavPracticeArea[];
}

export const navigationStructure: NavItem[] = [
  {
    label: { en: 'Home', es: 'Inicio' },
    href: { en: '/', es: '/es' },
  },
  {
    label: { en: 'Practice Areas', es: 'Áreas de Práctica' },
    href: { en: '/practice-areas', es: '/es/areas-de-practica' },
    practiceAreas: [
      {
        label: { en: 'Immigration', es: 'Inmigración' },
        href: { en: '/practice-areas/immigration', es: '/es/areas-de-practica/inmigracion' },
        categories: [
          {
            label: { en: 'Family-Based', es: 'Basado en Familia' },
            href: {
              en: '/practice-areas/immigration/family-based',
              es: '/es/areas-de-practica/inmigracion/basado-en-familia',
            },
            subItems: [
              {
                label: { en: 'Spouse Petitions', es: 'Peticiones de Cónyuge' },
                href: {
                  en: '/practice-areas/immigration/family-based/spouse-petitions',
                  es: '/es/areas-de-practica/inmigracion/basado-en-familia/peticiones-conyugales',
                },
              },
              {
                label: { en: 'Fiancé(e) Visas', es: 'Visas de Prometido(a)' },
                href: {
                  en: '/practice-areas/immigration/fiance-k-visas',
                  es: '/es/areas-de-practica/inmigracion/visas-prometido',
                },
              },
              {
                label: { en: 'Parent & Child Petitions', es: 'Peticiones de Padres e Hijos' },
                href: {
                  en: '/practice-areas/immigration/family-based/parent-child-petitions',
                  es: '/es/areas-de-practica/inmigracion/basado-en-familia/peticiones-padres-hijos',
                },
              },
              {
                label: { en: 'Sibling Petitions', es: 'Peticiones de Hermanos' },
                href: {
                  en: '/practice-areas/immigration/family-preference-visas',
                  es: '/es/areas-de-practica/inmigracion/visas-preferencia-familiar',
                },
              },
            ],
          },
          {
            label: { en: 'Removal Defense', es: 'Defensa de Deportación' },
            href: {
              en: '/practice-areas/immigration/deportation-removal-defense',
              es: '/es/areas-de-practica/inmigracion/defensa-deportacion',
            },
            subItems: [
              {
                label: { en: 'Deportation Defense', es: 'Defensa Contra Deportación' },
                href: {
                  en: '/practice-areas/immigration/deportation-removal-defense',
                  es: '/es/areas-de-practica/inmigracion/deportacion-remocion-defensa',
                },
              },
              {
                label: { en: 'Cancellation of Removal', es: 'Cancelación de Remoción' },
                href: {
                  en: '/practice-areas/immigration/removal-defense/cancellation-of-removal',
                  es: '/es/areas-de-practica/inmigracion/defensa-remocion/cancelacion-remocion',
                },
              },
              {
                label: { en: 'Bond Hearings', es: 'Audiencias de Fianza' },
                href: {
                  en: '/practice-areas/immigration/detention-bond-hearings',
                  es: '/es/areas-de-practica/inmigracion/audiencias-fianza-detencion',
                },
              },
              {
                label: { en: 'Appeals', es: 'Apelaciones' },
                href: {
                  en: '/practice-areas/immigration/appeals-motions',
                  es: '/es/areas-de-practica/inmigracion/apelaciones-mociones',
                },
              },
            ],
          },
          {
            label: { en: 'Humanitarian', es: 'Humanitario' },
            href: {
              en: '/practice-areas/immigration/humanitarian',
              es: '/es/areas-de-practica/inmigracion/humanitario',
            },
            subItems: [
              {
                label: { en: 'Asylum', es: 'Asilo' },
                href: {
                  en: '/practice-areas/immigration/asylum-refugee-legal-help',
                  es: '/es/areas-de-practica/inmigracion/asilo',
                },
              },
              {
                label: { en: 'VAWA', es: 'VAWA' },
                href: {
                  en: '/practice-areas/immigration/vawa-u-visa-victims-of-crimes',
                  es: '/es/areas-de-practica/inmigracion/vawa-u-visa-crimen-victimas',
                },
              },
              {
                label: { en: 'U Visa', es: 'Visa U' },
                href: {
                  en: '/practice-areas/immigration/humanitarian/u-visa',
                  es: '/es/areas-de-practica/inmigracion/humanitario/visa-u',
                },
              },
              {
                label: { en: 'T Visa', es: 'Visa T' },
                href: {
                  en: '/practice-areas/immigration/humanitarian/t-visa',
                  es: '/es/areas-de-practica/inmigracion/abogados-de-inmigracion-de-t-visa',
                },
              },
            ],
          },
          {
            label: { en: 'Business Immigration', es: 'Inmigración de Negocios' },
            href: {
              en: '/practice-areas/immigration/business',
              es: '/es/areas-de-practica/inmigracion/negocios',
            },
            subItems: [
              {
                label: { en: 'H-1B Visas', es: 'Visas H-1B' },
                href: {
                  en: '/practice-areas/immigration/business/h1b-visas',
                  es: '/es/areas-de-practica/inmigracion/negocios/visas-h1b',
                },
              },
              {
                label: { en: 'L-1 Visas', es: 'Visas L-1' },
                href: {
                  en: '/practice-areas/immigration/business/l1-visas',
                  es: '/es/areas-de-practica/inmigracion/negocios/visas-l1',
                },
              },
              {
                label: { en: 'E-2 Investor Visas', es: 'Visas E-2 de Inversionista' },
                href: {
                  en: '/practice-areas/immigration/business/e2-investor-visas',
                  es: '/es/areas-de-practica/inmigracion/negocios/visas-e2-inversionista',
                },
              },
              {
                label: { en: 'PERM Labor Certification', es: 'Certificación Laboral PERM' },
                href: {
                  en: '/practice-areas/immigration/business/perm-labor-certification',
                  es: '/es/areas-de-practica/inmigracion/negocios/certificacion-laboral-perm',
                },
              },
            ],
          },
        ],
      },
      {
        label: { en: 'Personal Injury', es: 'Lesiones Personales' },
        href: {
          en: '/practice-areas/personal-injury',
          es: '/es/areas-de-practica/lesiones-personales',
        },
        categories: [
          {
            label: { en: 'Auto Accidents', es: 'Accidentes de Auto' },
            href: {
              en: '/practice-areas/personal-injury/car-accidents',
              es: '/es/areas-de-practica/lesiones-personales/accidentes-de-auto',
            },
            subItems: [
              {
                label: { en: 'Car Accidents', es: 'Accidentes de Auto' },
                href: {
                  en: '/practice-areas/personal-injury/car-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-de-auto',
                },
              },
              {
                label: { en: 'Truck Accidents', es: 'Accidentes de Camión' },
                href: {
                  en: '/practice-areas/personal-injury/truck-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-de-camion',
                },
              },
              {
                label: { en: 'Motorcycle Accidents', es: 'Accidentes de Motocicleta' },
                href: {
                  en: '/practice-areas/personal-injury/motorcycle-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-motocicleta',
                },
              },
              {
                label: { en: 'Drunk Driver Accidents', es: 'Accidentes de Conductor Ebrio' },
                href: {
                  en: '/practice-areas/personal-injury/drunk-driver-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-conductor-ebrio',
                },
              },
            ],
          },
          {
            label: { en: 'Catastrophic Injuries', es: 'Lesiones Catastróficas' },
            href: {
              en: '/practice-areas/personal-injury/catastrophic-injuries',
              es: '/es/areas-de-practica/lesiones-personales/lesiones-catastroficas',
            },
            subItems: [
              {
                label: { en: 'Brain Injuries', es: 'Lesiones Cerebrales' },
                href: {
                  en: '/practice-areas/personal-injury/brain-injuries',
                  es: '/es/areas-de-practica/lesiones-personales/lesiones-cerebrales',
                },
              },
              {
                label: { en: 'Spinal Cord Injuries', es: 'Lesiones de Médula Espinal' },
                href: {
                  en: '/practice-areas/personal-injury/spinal-cord-injuries',
                  es: '/es/areas-de-practica/lesiones-personales/lesiones-medula-espinal',
                },
              },
              {
                label: { en: 'Wrongful Death', es: 'Muerte Injusta' },
                href: {
                  en: '/practice-areas/personal-injury/wrongful-death',
                  es: '/es/areas-de-practica/lesiones-personales/muerte-injusta',
                },
              },
              {
                label: { en: 'Medical Malpractice', es: 'Negligencia Médica' },
                href: {
                  en: '/practice-areas/personal-injury/medical-malpractice',
                  es: '/es/areas-de-practica/lesiones-personales/negligencia-medica',
                },
              },
            ],
          },
          {
            label: { en: 'Premises Liability', es: 'Responsabilidad de Locales' },
            href: {
              en: '/practice-areas/personal-injury/premises-liability',
              es: '/es/areas-de-practica/lesiones-personales/responsabilidad-locales',
            },
            subItems: [
              {
                label: { en: 'Slip and Fall', es: 'Resbalones y Caídas' },
                href: {
                  en: '/practice-areas/personal-injury/slip-and-fall',
                  es: '/es/areas-de-practica/lesiones-personales/resbalones-y-caidas',
                },
              },
              {
                label: { en: 'Dog Bites', es: 'Mordeduras de Perro' },
                href: {
                  en: '/practice-areas/personal-injury/dog-bites',
                  es: '/es/areas-de-practica/lesiones-personales/mordeduras-de-perro',
                },
              },
              {
                label: { en: 'Construction Accidents', es: 'Accidentes de Construcción' },
                href: {
                  en: '/practice-areas/personal-injury/construction-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-de-construccion',
                },
              },
              {
                label: { en: 'Product Liability', es: 'Responsabilidad del Producto' },
                href: {
                  en: '/practice-areas/personal-injury/product-liability',
                  es: '/es/areas-de-practica/lesiones-personales/responsabilidad-del-producto',
                },
              },
            ],
          },
          {
            label: { en: 'Other Accidents', es: 'Otros Accidentes' },
            href: {
              en: '/practice-areas/personal-injury',
              es: '/es/areas-de-practica/lesiones-personales',
            },
            subItems: [
              {
                label: { en: 'Pedestrian Accidents', es: 'Accidentes de Peatones' },
                href: {
                  en: '/practice-areas/personal-injury/pedestrian-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-peatones',
                },
              },
              {
                label: { en: 'Bicycle Accidents', es: 'Accidentes de Bicicleta' },
                href: {
                  en: '/practice-areas/personal-injury/bicycle-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-bicicleta',
                },
              },
              {
                label: { en: 'Uninsured Motorist', es: 'Motorista Sin Seguro' },
                href: {
                  en: '/practice-areas/personal-injury/uninsured-motorist',
                  es: '/es/areas-de-practica/lesiones-personales/motorista-sin-seguro',
                },
              },
              {
                label: {
                  en: 'Emergency Response Accidents',
                  es: 'Accidentes de Respuesta de Emergencia',
                },
                href: {
                  en: '/practice-areas/personal-injury/emergency-response-accidents',
                  es: '/es/areas-de-practica/lesiones-personales/accidentes-emergencia',
                },
              },
            ],
          },
        ],
      },
      {
        label: { en: 'Workers Compensation', es: 'Compensación Laboral' },
        href: {
          en: '/practice-areas/workers-compensation',
          es: '/es/areas-de-practica/compensacion-laboral',
        },
        categories: [
          {
            label: { en: 'Workplace Injuries', es: 'Lesiones en el Trabajo' },
            href: {
              en: '/practice-areas/workers-compensation/workplace-accidents',
              es: '/es/areas-de-practica/compensacion-laboral/lesiones-en-el-lugar-de-trabajo',
            },
            subItems: [
              {
                label: { en: 'Construction Injuries', es: 'Lesiones de Construcción' },
                href: {
                  en: '/practice-areas/workers-compensation/construction-site-injuries',
                  es: '/es/areas-de-practica/compensacion-laboral/lesiones-construccion',
                },
              },
              {
                label: { en: 'Back Injuries', es: 'Lesiones de Espalda' },
                href: {
                  en: '/practice-areas/workers-compensation/lifting-injuries',
                  es: '/es/areas-de-practica/compensacion-laboral/lesiones-de-espalda',
                },
              },
              {
                label: { en: 'Equipment Accidents', es: 'Accidentes con Maquinaria' },
                href: {
                  en: '/practice-areas/workers-compensation/equipment-accidents',
                  es: '/es/areas-de-practica/compensacion-laboral/accidentes-con-maquinaria',
                },
              },
              {
                label: { en: 'Repetitive Stress', es: 'Estrés Repetitivo' },
                href: {
                  en: '/practice-areas/workers-compensation/repetitive-stress-carpal-tunnel',
                  es: '/es/areas-de-practica/compensacion-laboral/estres-repetitivo',
                },
              },
            ],
          },
          {
            label: { en: 'Claims & Benefits', es: 'Reclamos y Beneficios' },
            href: {
              en: '/practice-areas/workers-compensation',
              es: '/es/areas-de-practica/compensacion-laboral',
            },
            subItems: [
              {
                label: { en: 'Denied Claims', es: 'Negación de Beneficios' },
                href: {
                  en: '/practice-areas/workers-compensation/denied-claims',
                  es: '/es/areas-de-practica/compensacion-laboral/negacion-de-beneficios',
                },
              },
              {
                label: { en: 'Disability Benefits', es: 'Beneficios por Discapacidad' },
                href: {
                  en: '/practice-areas/workers-compensation/disability-benefits',
                  es: '/es/areas-de-practica/compensacion-laboral/beneficios-discapacidad',
                },
              },
              {
                label: { en: 'Comp Hearings', es: 'Audiencias de Compensación' },
                href: {
                  en: '/practice-areas/workers-compensation/workers-comp-hearings',
                  es: '/es/areas-de-practica/compensacion-laboral/audiencias-de-compensacion',
                },
              },
              {
                label: { en: 'Third Party Claims', es: 'Demandas a Terceros' },
                href: {
                  en: '/practice-areas/workers-compensation/third-party-injury-claims',
                  es: '/es/areas-de-practica/compensacion-laboral/demandas-terceros',
                },
              },
            ],
          },
          {
            label: { en: 'Occupational Health', es: 'Salud Ocupacional' },
            href: {
              en: '/practice-areas/workers-compensation/occupational-diseases',
              es: '/es/areas-de-practica/compensacion-laboral/enfermedades-ocupacionales',
            },
            subItems: [
              {
                label: { en: 'Occupational Diseases', es: 'Enfermedades Ocupacionales' },
                href: {
                  en: '/practice-areas/workers-compensation/occupational-diseases',
                  es: '/es/areas-de-practica/compensacion-laboral/enfermedades-ocupacionales',
                },
              },
              {
                label: { en: 'Mental Health Claims', es: 'Reclamos de Salud Mental' },
                href: {
                  en: '/practice-areas/workers-compensation/mental-health-claims',
                  es: '/es/areas-de-practica/compensacion-laboral/reclamos-salud-mental',
                },
              },
              {
                label: { en: 'Return to Work', es: 'Regreso al Trabajo' },
                href: {
                  en: '/practice-areas/workers-compensation/return-to-work',
                  es: '/es/areas-de-practica/compensacion-laboral/regreso-trabajo',
                },
              },
            ],
          },
        ],
      },
      {
        label: { en: 'Criminal Defense', es: 'Defensa Criminal' },
        href: {
          en: '/practice-areas/criminal-defense',
          es: '/es/areas-de-practica/defensa-criminal',
        },
        categories: [
          {
            label: { en: 'DUI/DWI', es: 'DUI/DWI' },
            href: {
              en: '/practice-areas/criminal-defense/dwi-drunk-driving',
              es: '/es/areas-de-practica/defensa-criminal/dui-dwi',
            },
            subItems: [
              {
                label: { en: 'DUI Defense', es: 'Defensa DUI' },
                href: {
                  en: '/practice-areas/criminal-defense/dwi-drunk-driving',
                  es: '/es/areas-de-practica/defensa-criminal/dui-dwi',
                },
              },
              {
                label: { en: 'License Suspension', es: 'Suspensión de Licencia' },
                href: {
                  en: '/practice-areas/criminal-defense/license-suspension',
                  es: '/es/areas-de-practica/defensa-criminal/suspension-licencia',
                },
              },
              {
                label: { en: 'Traffic Offenses', es: 'Infracciones de Tránsito' },
                href: {
                  en: '/practice-areas/criminal-defense/traffic-offenses',
                  es: '/es/areas-de-practica/defensa-criminal/infracciones-transito-criminal',
                },
              },
            ],
          },
          {
            label: { en: 'Drug Crimes', es: 'Crímenes de Drogas' },
            href: {
              en: '/practice-areas/criminal-defense/drug-crimes',
              es: '/es/areas-de-practica/defensa-criminal/crimenes-drogas',
            },
            subItems: [
              {
                label: { en: 'Drug Possession', es: 'Posesión de Drogas' },
                href: {
                  en: '/practice-areas/criminal-defense/drug-crimes',
                  es: '/es/areas-de-practica/defensa-criminal/crimenes-drogas',
                },
              },
              {
                label: { en: 'Drug Trafficking', es: 'Tráfico de Drogas' },
                href: {
                  en: '/practice-areas/criminal-defense/drug-trafficking',
                  es: '/es/areas-de-practica/defensa-criminal/trafico-drogas',
                },
              },
              {
                label: { en: 'Federal Crimes', es: 'Crímenes Federales' },
                href: {
                  en: '/practice-areas/criminal-defense/federal-crimes',
                  es: '/es/areas-de-practica/defensa-criminal/crimenes-federales',
                },
              },
            ],
          },
          {
            label: { en: 'Violent Crimes', es: 'Crímenes Violentos' },
            href: {
              en: '/practice-areas/criminal-defense/assault',
              es: '/es/areas-de-practica/defensa-criminal/asalto-agresion',
            },
            subItems: [
              {
                label: { en: 'Assault & Battery', es: 'Asalto y Agresión' },
                href: {
                  en: '/practice-areas/criminal-defense/assault',
                  es: '/es/areas-de-practica/defensa-criminal/asalto-agresion',
                },
              },
              {
                label: { en: 'Domestic Violence', es: 'Violencia Doméstica' },
                href: {
                  en: '/practice-areas/criminal-defense/domestic-violence',
                  es: '/es/areas-de-practica/defensa-criminal/violencia-domestica',
                },
              },
              {
                label: { en: 'Theft & Larceny', es: 'Robos y Hurtos' },
                href: {
                  en: '/practice-areas/criminal-defense/theft',
                  es: '/es/areas-de-practica/defensa-criminal/robos-hurtos',
                },
              },
            ],
          },
          {
            label: { en: 'Post-Conviction', es: 'Post-Condena' },
            href: {
              en: '/practice-areas/criminal-defense/expungement',
              es: '/es/areas-de-practica/defensa-criminal/expuncion',
            },
            subItems: [
              {
                label: { en: 'Expungement', es: 'Expunción' },
                href: {
                  en: '/practice-areas/criminal-defense/expungement',
                  es: '/es/areas-de-practica/defensa-criminal/expuncion',
                },
              },
              {
                label: { en: 'Probation Violation', es: 'Violación de Libertad Condicional' },
                href: {
                  en: '/practice-areas/criminal-defense/probation-violation',
                  es: '/es/areas-de-practica/defensa-criminal/violacion-de-libertad-condicional',
                },
              },
              {
                label: { en: 'White Collar Crimes', es: 'Delitos de Cuello Blanco' },
                href: {
                  en: '/practice-areas/criminal-defense/white-collar',
                  es: '/es/areas-de-practica/defensa-criminal/delitos-cuello-blanco',
                },
              },
            ],
          },
        ],
      },
      {
        label: { en: 'Family Law', es: 'Derecho Familiar' },
        href: { en: '/practice-areas/family-law', es: '/es/areas-de-practica/derecho-familia' },
        categories: [
          {
            label: { en: 'Divorce', es: 'Divorcio' },
            href: {
              en: '/practice-areas/family-law/divorce',
              es: '/es/areas-de-practica/derecho-familia/divorcio',
            },
            subItems: [
              {
                label: { en: 'Divorce', es: 'Divorcio' },
                href: {
                  en: '/practice-areas/family-law/divorce',
                  es: '/es/areas-de-practica/derecho-familia/divorcio',
                },
              },
              {
                label: { en: 'Property Division', es: 'División de Propiedad' },
                href: {
                  en: '/practice-areas/family-law/property-division',
                  es: '/es/areas-de-practica/derecho-familia/division-propiedad',
                },
              },
              {
                label: { en: 'Alimony', es: 'Pensión Alimenticia' },
                href: {
                  en: '/practice-areas/family-law/alimony',
                  es: '/es/areas-de-practica/derecho-familia/pension-alimenticia',
                },
              },
              {
                label: { en: 'Prenuptial Agreements', es: 'Acuerdos Prenupciales' },
                href: {
                  en: '/practice-areas/family-law/prenuptial-agreements',
                  es: '/es/areas-de-practica/derecho-familia/acuerdos-prenupciales',
                },
              },
            ],
          },
          {
            label: { en: 'Child Matters', es: 'Asuntos de Hijos' },
            href: {
              en: '/practice-areas/family-law/child-custody',
              es: '/es/areas-de-practica/derecho-familia/custodia-hijos',
            },
            subItems: [
              {
                label: { en: 'Child Custody', es: 'Custodia de Hijos' },
                href: {
                  en: '/practice-areas/family-law/child-custody',
                  es: '/es/areas-de-practica/derecho-familia/custodia-infantil',
                },
              },
              {
                label: { en: 'Child Support', es: 'Manutención de Hijos' },
                href: {
                  en: '/practice-areas/family-law/child-support',
                  es: '/es/areas-de-practica/derecho-familia/manutencion-hijos',
                },
              },
              {
                label: { en: 'Adoption', es: 'Adopción' },
                href: {
                  en: '/practice-areas/family-law/adoption',
                  es: '/es/areas-de-practica/derecho-familia/adopcion',
                },
              },
              {
                label: { en: 'Guardianship', es: 'Tutela Legal' },
                href: {
                  en: '/practice-areas/family-law/guardianship',
                  es: '/es/areas-de-practica/derecho-familia/tutela-legal',
                },
              },
            ],
          },
          {
            label: { en: 'Protection', es: 'Protección' },
            href: {
              en: '/practice-areas/family-law/domestic-violence',
              es: '/es/areas-de-practica/derecho-familia/proteccion-violencia-domestica',
            },
            subItems: [
              {
                label: { en: 'Domestic Violence', es: 'Violencia Doméstica' },
                href: {
                  en: '/practice-areas/family-law/domestic-violence',
                  es: '/es/areas-de-practica/derecho-familia/proteccion-violencia-domestica',
                },
              },
              {
                label: { en: 'Restraining Orders', es: 'Órdenes de Restricción' },
                href: {
                  en: '/practice-areas/family-law/restraining-orders',
                  es: '/es/areas-de-practica/derecho-familia/ordenes-restriccion',
                },
              },
              {
                label: { en: 'Post-Divorce Enforcement', es: 'Ejecución Post-Divorcio' },
                href: {
                  en: '/practice-areas/family-law/post-divorce-modifications-enforcement',
                  es: '/es/areas-de-practica/derecho-familia/ejecucion-y-modificaciones-posteriores-al-divorcio',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: { en: 'Attorneys', es: 'Abogados' },
    href: { en: '/attorneys', es: '/es/abogados' },
  },
  {
    label: { en: 'Results', es: 'Resultados' },
    href: { en: '/case-results', es: '/es/resultados-de-casos' },
  },
  {
    label: { en: 'Blog', es: 'Blog' },
    href: { en: '/blog', es: '/es/blog' },
  },
  {
    label: { en: 'Contact', es: 'Contacto' },
    href: { en: '/contact', es: '/es/contacto' },
  },
];
