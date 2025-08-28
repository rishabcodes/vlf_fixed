import React from 'react';
import Link from 'next/link';
import { generateFooterMegaLinks } from '@/lib/seo/internal-linking-mesh';
import { usePathname } from 'next/navigation';

export function MegaFooterLinks() {
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es');
  const language: 'en' | 'es' = isSpanish ? 'es' : 'en';
  const megaLinkSections = generateFooterMegaLinks(language);

  return (
    <div className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {megaLinkSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-lg font-bold mb-4 text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}

                className={`
                        text-sm transition-colors
                        ${
                          link.priority
                            ? 'text-white hover:text-primary font-medium'
                            : 'text-gray-400 hover:text-white'
                        }
                        ${link.href.startsWith('tel:') ? 'inline-flex items-center' : ''}
                      `}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO Text Block */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {language === 'es'
                ? 'La Firma de Abogados Más Agresiva de Carolina del Norte'
                : "North Carolina's Most Aggressive Law Firm"}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === 'es' ? (
                <>
                  Vasquez Law Firm domina el panorama legal en Carolina del Norte con oficinas en{' '}
                  <Link
                    href="/es/ubicaciones/nc/charlotte"
                    className="text-white hover:text-primary underline"
                  >
                    Charlotte
                  </Link>
                  ,{' '}
                  <Link
                    href="/es/ubicaciones/nc/raleigh"
                    className="text-white hover:text-primary underline"
                  >
                    Raleigh
                  </Link>
                  ,{' '}
                  <Link
                    href="/es/ubicaciones/nc/greensboro"
                    className="text-white hover:text-primary underline"
                  >
                    Greensboro
                  </Link>
                  , y{' '}
                  <Link
                    href="/es/ubicaciones/nc/smithfield"
                    className="text-white hover:text-primary underline"
                  >
                    Smithfield
                  </Link>
                  . Nuestro equipo élite de{' '}
                  <Link
                    href="/es/areas-de-practica/inmigracion"
                    className="text-white hover:text-primary underline"
                  >
                    abogados de inmigración
                  </Link>
                  ,{' '}
                  <Link
                    href="/es/areas-de-practica/lesiones-personales"
                    className="text-white hover:text-primary underline"
                  >
                    abogados de lesiones personales
                  </Link>
                  ,{' '}
                  <Link
                    href="/es/areas-de-practica/defensa-criminal"
                    className="text-white hover:text-primary underline"
                  >
                    abogados de defensa criminal
                  </Link>
                  , y{' '}
                  <Link
                    href="/es/areas-de-practica/compensacion-laboral"
                    className="text-white hover:text-primary underline"
                  >
                    abogados de compensación laboral
                  </Link>{' '}
                  ofrecen resultados récord. Disponibles 24/7 para emergencias. Más de 30,000 casos
                  ganados. Más de $100M recuperados para clientes. Cuando necesite los mejores
                  abogados en NC, llame al 1-844-YO-PELEO.
                </>
              ) : (
                <>
                  Vasquez Law Firm dominates the legal landscape across North Carolina with offices
                  in{' '}
                  <Link
                    href="/locations/nc/charlotte"
                    className="text-white hover:text-primary underline"
                  >
                    Charlotte
                  </Link>
                  ,{' '}
                  <Link
                    href="/locations/nc/raleigh"
                    className="text-white hover:text-primary underline"
                  >
                    Raleigh
                  </Link>
                  ,{' '}
                  <Link
                    href="/locations/nc/greensboro"
                    className="text-white hover:text-primary underline"
                  >
                    Greensboro
                  </Link>
                  , and{' '}
                  <Link
                    href="/locations/nc/smithfield"
                    className="text-white hover:text-primary underline"
                  >
                    Smithfield
                  </Link>
                  . Our elite team of{' '}
                  <Link
                    href="/practice-areas/immigration"
                    className="text-white hover:text-primary underline"
                  >
                    immigration lawyers
                  </Link>
                  ,{' '}
                  <Link
                    href="/practice-areas/personal-injury"
                    className="text-white hover:text-primary underline"
                  >
                    personal injury attorneys
                  </Link>
                  ,{' '}
                  <Link
                    href="/practice-areas/criminal-defense"
                    className="text-white hover:text-primary underline"
                  >
                    criminal defense lawyers
                  </Link>
                  , and{' '}
                  <Link
                    href="/practice-areas/workers-compensation"
                    className="text-white hover:text-primary underline"
                  >
                    workers comp attorneys
                  </Link>{' '}
                  deliver record-breaking results. Available 24/7 for emergencies. Over 30,000 cases
                  won. $100M+ recovered for clients. When you need the best lawyers in NC, call
                  1-844-YO-PELEO.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Local SEO Block */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
          <div>
            <h4 className="font-semibold text-gray-400 mb-2">Charlotte Metro</h4>
            <p>
              Serving Uptown, South End, NoDa, Plaza Midwood, Myers Park, Ballantyne, Matthews, Mint
              Hill, Huntersville, Cornelius
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-400 mb-2">Triangle Region</h4>
            <p>
              Serving Raleigh, Durham, Chapel Hill, Cary, Apex, Holly Springs, Wake Forest, Garner,
              Morrisville, Carrboro
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-400 mb-2">Triad Area</h4>
            <p>
              Serving Greensboro, Winston-Salem, High Point, Burlington, Kernersville, Thomasville,
              Asheboro
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-400 mb-2">Eastern NC</h4>
            <p>
              Serving Fayetteville, Wilmington, Jacksonville, New Bern, Greenville, Rocky Mount,
              Wilson, Goldsboro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
