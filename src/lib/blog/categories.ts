export const BLOG_CATEGORIES = {
  immigration: {
    id: 'immigration',
    name: {
      en: 'Immigration Law',
      es: 'Ley de Inmigración',
    },
    slug: {
      en: 'immigration',
      es: 'inmigracion',
    },
    description: {
      en: 'Expert insights on visas, green cards, citizenship, deportation defense, and immigration policy changes',
      es: 'Perspectivas expertas sobre visas, tarjetas verdes, ciudadanía, defensa de deportación y cambios en políticas migratorias',
    },
    color: 'bg-blue-600',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    icon: '🗽',
    keywords: ['immigration', 'visa', 'green card', 'citizenship', 'deportation', 'asylum', 'DACA'],
  },
  'personal-injury': {
    id: 'personal-injury',
    name: {
      en: 'Personal Injury',
      es: 'Lesiones Personales',
    },
    slug: {
      en: 'personal-injury',
      es: 'lesiones-personales',
    },
    description: {
      en: 'Legal guidance on car accidents, slip and falls, medical malpractice, and injury compensation',
      es: 'Orientación legal sobre accidentes automovilísticos, resbalones y caídas, mala práctica médica y compensación por lesiones',
    },
    color: 'bg-red-600',
    lightColor: 'bg-red-100',
    textColor: 'text-red-600',
    icon: '🚑',
    keywords: [
      'personal injury',
      'accident',
      'car accident',
      'slip and fall',
      'medical malpractice',
      'compensation',
    ],
  },
  'criminal-defense': {
    id: 'criminal-defense',
    name: {
      en: 'Criminal Defense',
      es: 'Defensa Criminal',
    },
    slug: {
      en: 'criminal-defense',
      es: 'defensa-criminal',
    },
    description: {
      en: 'Understanding your rights in DWI/DUI cases, drug charges, assault, and other criminal matters',
      es: 'Comprenda sus derechos en casos de DWI/DUI, cargos de drogas, asalto y otros asuntos criminales',
    },
    color: 'bg-purple-600',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    icon: '⚖️',
    keywords: [
      'criminal defense',
      'DWI',
      'DUI',
      'drug charges',
      'assault',
      'expungement',
      'federal crimes',
    ],
  },
  'workers-compensation': {
    id: 'workers-compensation',
    name: {
      en: "Workers' Compensation",
      es: 'Compensación Laboral',
    },
    slug: {
      en: 'workers-compensation',
      es: 'compensacion-laboral',
    },
    description: {
      en: 'Workplace injury claims, denied benefits, disability compensation, and third-party claims',
      es: 'Reclamos por lesiones laborales, beneficios denegados, compensación por discapacidad y reclamos de terceros',
    },
    color: 'bg-green-600',
    lightColor: 'bg-green-100',
    textColor: 'text-green-600',
    icon: '👷',
    keywords: [
      'workers compensation',
      'workplace injury',
      'disability',
      'job injury',
      'OSHA',
      'construction accident',
    ],
  },
  'family-law': {
    id: 'family-law',
    name: {
      en: 'Family Law',
      es: 'Derecho Familiar',
    },
    slug: {
      en: 'family-law',
      es: 'derecho-familiar',
    },
    description: {
      en: 'Divorce, child custody, alimony, property division, and domestic violence protection',
      es: 'Divorcio, custodia de menores, pensión alimenticia, división de propiedades y protección contra violencia doméstica',
    },
    color: 'bg-orange-600',
    lightColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    icon: '👨‍👩‍👧‍👦',
    keywords: [
      'family law',
      'divorce',
      'custody',
      'alimony',
      'child support',
      'domestic violence',
      'separation',
    ],
  },
  'traffic-violations': {
    id: 'traffic-violations',
    name: {
      en: 'Traffic Violations',
      es: 'Infracciones de Tráfico',
    },
    slug: {
      en: 'traffic-violations',
      es: 'infracciones-transito',
    },
    description: {
      en: 'Speeding tickets, license restoration, reckless driving, and traffic court representation',
      es: 'Multas por exceso de velocidad, restauración de licencia, conducción imprudente y representación en corte de tráfico',
    },
    color: 'bg-yellow-600',
    lightColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    icon: '🚗',
    keywords: ['traffic ticket', 'speeding', 'license', 'reckless driving', 'traffic court', 'DMV'],
  },
} as const;

export type BlogCategoryId = keyof typeof BLOG_CATEGORIES;

export const getCategoryById = (id: string): (typeof BLOG_CATEGORIES)[BlogCategoryId] | null => {
  return BLOG_CATEGORIES[id as BlogCategoryId] || null;
};

export const getAllCategories = () => {
  return Object.values(BLOG_CATEGORIES);
};

export const getCategoryName = (id: string, language: 'en' | 'es' = 'en'): string => {
  const category = getCategoryById(id);
  return category ? category.name[language] : id;
};

export const getCategoryDescription = (id: string, language: 'en' | 'es' = 'en'): string => {
  const category = getCategoryById(id);
  return category ? category.description[language] : '';
};

// SEO helpers
export const getCategorySEOData = (categoryId: string, language: 'en' | 'es' = 'en') => {
  const category = getCategoryById(categoryId);
  if (!category) return null;

  const baseUrl = 'https://www.vasquezlawnc.com';
  const categoryUrl = getCategoryUrl(categoryId, language);

  return {
    title: `${category.name[language]} Blog | Vasquez Law Firm, PLLC`,
    description: category.description[language],
    keywords: category.keywords.join(', '),
    canonical: `${baseUrl}${categoryUrl}`,
    openGraph: {
      title: `${category.name[language]} Legal Articles`,
      description: category.description[language],
      type: 'website',
      url: `${baseUrl}${categoryUrl}`,
    },
  };
};

// Helper to get category URL
export const getCategoryUrl = (categoryId: string, language: 'en' | 'es' = 'en'): string => {
  const category = getCategoryById(categoryId);
  if (!category) return '/blog';

  const langPrefix = language === 'es' ? '/es' : '';
  const categoryPath = language === 'es' ? 'categoria' : 'category';
  const slug = category.slug[language];

  return `${langPrefix}/blog/${categoryPath}/${slug}`;
};

// Helper to get related categories
export const getRelatedCategories = (
  currentCategoryId: string,
  limit: number = 3
): BlogCategoryId[] => {
  const allCategories = Object.keys(BLOG_CATEGORIES) as BlogCategoryId[];
  return allCategories.filter(id => id !== currentCategoryId).slice(0, limit);
};
