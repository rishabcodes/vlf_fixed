import { notFound } from 'next/navigation';
import { logger } from '@/lib/safe-logger';
import { Metadata } from 'next';

// Full static generation - no revalidation needed

// Dynamic imports for each attorney page
const attorneyPages = {
  'adrianna-ingram': () => import('../adrianna-ingram/page').then(mod => mod.default),
  'jillian-baucom': () => import('../jillian-baucom/page').then(mod => mod.default),
  'kelly-vega': () => import('../kelly-vega/page').then(mod => mod.default),
  // 'mark-kelsey-es': Spanish version removed - using main page,
  'christopher-afanador': () => import('../christopher-afanador/page').then(mod => mod.default),
  'mark-kelsey': () => import('../mark-kelsey/page').then(mod => mod.default),
  'judith-parkes': () => import('../judith-parkes/page').then(mod => mod.default),
  'roselyn-v-torrellas': () => import('../roselyn-v-torrellas/page').then(mod => mod.default),
  'william-vasquez': () => import('../william-vasquez/page').then(mod => mod.default),
  'rebecca-sommer': () => import('../rebecca-sommer/page').then(mod => mod.default),
} as const;

// Attorney metadata
const attorneyMetadata: Record<string, Metadata> = {
  'adrianna-ingram': {
    title: 'Adrianna Ingram | Immigration Attorney | Vasquez Law Firm',
    description:
      'Meet Adrianna Ingram, experienced immigration attorney at Vasquez Law Firm. Specialized in immigration law and client advocacy.',
  },
  'jillian-baucom': {
    title: 'Jillian Baucom | Immigration Attorney | Vasquez Law Firm',
    description:
      'Meet Jillian Baucom, experienced immigration attorney at Vasquez Law Firm. Dedicated to helping clients achieve their immigration goals.',
  },
  'christopher-afanador': {
    title: 'Christopher Afanador | Immigration Attorney | Vasquez Law Firm',
    description:
      'Meet Christopher Afanador, skilled immigration attorney at Vasquez Law Firm. Providing compassionate legal representation.',
  },
  'judith-parkes': {
    title: 'Judith Parkes | Immigration Attorney | Vasquez Law Firm',
    description:
      'Meet Judith Parkes, dedicated immigration attorney at Vasquez Law Firm. Committed to excellence in immigration law.',
  },
  'kelly-vega': {
    title: 'Kelly Vega | Immigration Attorney | Vasquez Law Firm',
    description:
      'Meet Kelly Vega, dedicated immigration attorney at Vasquez Law Firm. Expert in immigration law and client representation.',
  },
  'mark-kelsey': {
    title: 'Mark Kelsey | Criminal Defense Attorney | Vasquez Law Firm',
    description:
      'Meet Mark Kelsey, experienced criminal defense attorney at Vasquez Law Firm. Dedicated to protecting your rights.',
  },
  'roselyn-v-torrellas': {
    title: 'Roselyn V. Torrellas | Immigration Attorney | Vasquez Law Firm',
    description:
      'Meet Roselyn V. Torrellas, skilled immigration attorney at Vasquez Law Firm. Bilingual representation for immigration matters.',
  },
  'william-vasquez': {
    title: 'William J. Vásquez | Founding Attorney | Vasquez Law Firm',
    description:
      'Meet William J. Vásquez, founding attorney and managing partner of Vasquez Law Firm. Leading the fight for justice since 2011.',
  },
  'rebecca-sommer': {
    title: 'Rebecca Sommer | Immigration Attorney | Vasquez Law Firm',
    description:
      'Meet Rebecca Sommer, dedicated immigration attorney at Vasquez Law Firm. Committed to helping clients achieve their immigration goals.',
  },
  'jillian-baucom-es': {
    title: 'Jillian Baucom | Abogada de Inmigración | Vasquez Law Firm',
    description:
      'Conozca a Jillian Baucom, abogada de inmigración en Vasquez Law Firm. Servicios legales en español.',
  },
  'mark-kelsey-es': {
    title: 'Mark Kelsey | Abogado de Defensa Criminal | Vasquez Law Firm',
    description:
      'Conozca a Mark Kelsey, abogado de defensa criminal en Vasquez Law Firm. Protegiendo sus derechos.',
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  if (!(slug in attorneyMetadata)) {
    return {
      title: 'Attorney Not Found | Vasquez Law Firm',
      description: 'The requested attorney page could not be found.',
    };
  }

  const metadata = attorneyMetadata[slug as keyof typeof attorneyMetadata];

  // TypeScript safety check - should never happen due to the guard above
  if (!metadata) {
    return {
      title: 'Attorney Not Found | Vasquez Law Firm',
      description: 'The requested attorney page could not be found.',
    };
  }

  return metadata;
}

export default async function AttorneyPage({ params }: PageProps) {
  const { slug } = params;

  // Check if the attorney page exists
  if (!(slug in attorneyPages)) {
    notFound();
  }

  // Dynamically import and render the attorney page
  try {
    const AttorneyComponent = await attorneyPages[slug as keyof typeof attorneyPages]();
    return <AttorneyComponent />;
  } catch (error) {
    logger.error(`Error loading attorney page for slug: ${slug}`, error);
    notFound();
  }
}

// Generate static params for all known attorneys
export async function generateStaticParams() {
  return Object.keys(attorneyPages).map(slug => ({
    slug,
  }));
}
