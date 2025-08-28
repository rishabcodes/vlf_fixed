'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { generateEnhancedBreadcrumbSchema } from '@/lib/seo/comprehensive-schema';

// Map of common path segments to human-readable names
const pathNameMap: Record<string, string> = {
  'practice-areas': 'Practice Areas',
  'areas-de-practica': 'Áreas de Práctica',
  immigration: 'Immigration Law',
  inmigracion: 'Ley de Inmigración',
  'personal-injury': 'Personal Injury',
  'lesiones-personales': 'Lesiones Personales',
  'workers-compensation': 'Workers Compensation',
  'compensacion-laboral': 'Compensación Laboral',
  'criminal-defense': 'Criminal Defense',
  'defensa-criminal': 'Defensa Criminal',
  'family-law': 'Family Law',
  'derecho-familia': 'Derecho de Familia',
  attorneys: 'Attorneys',
  abogados: 'Abogados',
  locations: 'Locations',
  ubicaciones: 'Ubicaciones',
  blog: 'Blog',
  contact: 'Contact',
  contacto: 'Contacto',
  about: 'About',
  'sobre-nosotros': 'Sobre Nosotros',
  nc: 'North Carolina',
  fl: 'Florida',
  charlotte: 'Charlotte',
  raleigh: 'Raleigh',
  durham: 'Durham',
  orlando: 'Orlando',
  smithfield: 'Smithfield',
  greensboro: 'Greensboro',
  'winston-salem': 'Winston-Salem',
};

export function DynamicBreadcrumbSchema() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Skip breadcrumbs for homepage
  if (pathname === '/' || pathname === '/es') return null;

  // Generate breadcrumb items
  const paths = pathname.split('/').filter(Boolean);
  const isSpanish = paths[0] === 'es';
  const items: Array<{ name: string; url: string }> = [];

  // Add home
  items.push({
    name: isSpanish ? 'Inicio' : 'Home',
    url: `https://www.vasquezlawnc.com${isSpanish ? '/es' : ''}`,
  });

  // Build breadcrumb path
  let currentPath = isSpanish ? '/es' : '';
  paths.forEach((path, index) => {
    // Skip language segment
    if (index === 0 && path === 'es') return;

    currentPath += `/${path}`;

    // Get human-readable name
    let name =
      pathNameMap[path] ||
      path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Handle special cases
    if (path === 'counties' && paths[index - 1] === 'nc') {
      name = 'Counties';
    }

    items.push({
      name,
      url: `https://www.vasquezlawnc.com${currentPath}`,
    });
  });

  // Only show breadcrumbs if we have more than just home
  if (items.length <= 1) return null;

  const breadcrumbSchema = generateEnhancedBreadcrumbSchema(items);

  return (
    <Script
      id="dynamic-breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}
