import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Full static generation - no revalidation

// Generate only the most important location pages at build time
// Others will be generated on-demand using ISR
export async function generateStaticParams() {
  // Only pre-generate major cities to reduce build time
  const majorCities = {
    nc: ['charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem'],
    fl: ['orlando', 'tampa', 'miami', 'jacksonville', 'kissimmee'],
  };

  const params: Array<{ slug: string[] }> = [];

  // Generate only major city pages (no service pages at build time)
  for (const [state, cities] of Object.entries(majorCities)) {
    for (const city of cities) {
      params.push({ slug: [state, city] });
    }
  }

  // This reduces from ~1000+ pages to just 10 pages at build time
  // Other pages will be generated on-demand
  return params;
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [state, city, service] = params.slug;

  if (!state || !city) {
    return {
      title: 'Ubicaciones | Vasquez Law Firm',
      description: 'Find Vasquez Law Firm offices near you.',
    };
  }

  const cityName = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const stateUpper = state.toUpperCase();

  const baseTitle = `${cityName}, ${stateUpper}`;
  const title = service
    ? `${service
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')} in ${baseTitle}`
    : `${baseTitle} Attorneys | Vasquez Law Firm`;

  const description = service
    ? `Expert ${service.replace(/-/g, ' ')} services in ${cityName}, ${stateUpper}. Free consultation: 1-844-YO-PELEO`
    : `Top-rated attorneys serving ${cityName}, ${stateUpper}. Immigration, personal injury, criminal defense, and workers' compensation. Free consultation: 1-844-YO-PELEO`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vasquezlawnc.com/locations/${state}/${city}${service ? `/${service}` : ''}`,
    },
  };
}

// Location page component
export default async function LocationPage({ params }: { params: { slug: string[] } }) {
  const [state, city, service] = params.slug;

  if (!state || !city) {
    notFound();
  }

  // Import the appropriate component based on the location
  try {
    // Try to dynamically import the specific location component
    const locationModule = await import(`@/app/locations/${state}/${city}/page`);
    const LocationComponent = locationModule.default;
    return <LocationComponent />;
  } catch (error) {
    // If no specific component exists, render the generic template
    const cityName = city
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {cityName}, {state.toUpperCase()}
          </h1>
          <p className="text-gray-600 mb-8">
            Contacto Vasquez Law Firm at 1-844-YO-PELEO for legal assistance in your area.
          </p>

          {service && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                {service
                  .split('-')
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}{' '}
                Services
              </h2>
              <p className="text-gray-600">
                Our experienced attorneys specialize in {service.replace(/-/g, ' ')} cases in{' '}
                {cityName}, {state.toUpperCase()}.
              </p>
            </div>
          )}

          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
            <p className="mb-4">Get expert legal advice for your case.</p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    );
  }
}
