import { Metadata } from 'next';

import Link from 'next/link';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Best Lawyers in Edgecombe County, NC | All Legal Services | Vasquez Law Firm',
  description:
    'Top-rated attorneys serving Edgecombe County, North Carolina. Immigration, personal injury, workers comp, criminal defense. 60+ years experience. Free consultation.',
  keywords:
    'Edgecombe County lawyers, Edgecombe County attorneys, Edgecombe County law firm, abogados Edgecombe County NC',
  openGraph: {
    title: '#1 Law Firm in Edgecombe County, North Carolina | Vasquez Law',
    description:
      'Leading law firm serving all of Edgecombe County with 60+ years combined experience. Free consultation. Se habla español.',
    url: `https://www.vasquezlawfirm.com/locations/nc/counties/edgecombe`,
  },
};
export default function EdgecombeCountyPage() {
  // Find which region this county belongs to
  const regionData = {
    Triangle: {
      hub: 'raleigh',
      counties: [
        'Wake',
        'Durham',
        'Orange',
        'Chatham',
        'Johnston',
        'Franklin',
        'Granville',
        'Vance',
        'Warren',
      ],
      majorCities: [
        'Raleigh',
        'Durham',
        'Chapel Hill',
        'Cary',
        'Apex',
        'Clayton',
        'Garner',
        'Wake Forest',
        'Morrisville',
      ],
    },
    'Charlotte Metro': {
      hub: 'charlotte',
      counties: [
        'Mecklenburg',
        'Union',
        'Cabarrus',
        'Gaston',
        'Lincoln',
        'Iredell',
        'Rowan',
        'Cleveland',
        'Catawba',
      ],
      majorCities: [
        'Charlotte',
        'Concord',
        'Gastonia',
        'Huntersville',
        'Matthews',
        'Monroe',
        'Salisbury',
        'Statesville',
      ],
    },
    Triad: {
      hub: 'greensboro',
      counties: [
        'Guilford',
        'Forsyth',
        'Davidson',
        'Randolph',
        'Alamance',
        'Rockingham',
        'Stokes',
        'Surry',
        'Yadkin',
      ],
      majorCities: [
        'Greensboro',
        'Winston-Salem',
        'High Point',
        'Burlington',
        'Lexington',
        'Asheboro',
        'Kernersville',
      ],
    },
    'Eastern NC': {
      hub: 'wilmington',
      counties: [
        'New Hanover',
        'Brunswick',
        'Pender',
        'Onslow',
        'Carteret',
        'Craven',
        'Pitt',
        'Wayne',
        'Lenoir',
      ],
      majorCities: [
        'Wilmington',
        'Jacksonville',
        'Greenville',
        'New Bern',
        'Kinston',
        'Goldsboro',
        'Morehead City',
      ],
    },
    'Western NC': {
      hub: 'asheville',
      counties: [
        'Buncombe',
        'Henderson',
        'Haywood',
        'Jackson',
        'Transylvania',
        'Madison',
        'Yancey',
        'Mitchell',
        'Avery',
      ],
      majorCities: [
        'Asheville',
        'Hendersonville',
        'Waynesville',
        'Brevard',
        'Black Mountain',
        'Boone',
        'Burnsville',
      ],
    },
    Piedmont: {
      hub: 'fayetteville',
      counties: [
        'Cumberland',
        'Harnett',
        'Lee',
        'Moore',
        'Hoke',
        'Robeson',
        'Scotland',
        'Richmond',
        'Anson',
      ],
      majorCities: [
        'Fayetteville',
        'Sanford',
        'Laurinburg',
        'Lumberton',
        'Southern Pines',
        'Pinehurst',
        'Rockingham',
      ],
    },
  };
  const region =
    Object.entries(regionData).find(([_, data]) => data.counties.includes('Edgecombe'))?.[0] ||
    'North Carolina';
  return (
    <>
      <LocationPageTemplate
        location="Edgecombe County"
        content={
          <div className="space-y-12">
            <section>
              <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
                Edgecombe County's Trusted Law Firm - 60+ Years of Excellence
              </h1>
              <p className="text-xl text-gray-700">
                When legal issues arise in Edgecombe County, North Carolina residents trust Vasquez
                Law Firm. With over 60 years of combined experience and a proven track record
                throughout the ${region} region, we're here to fight for your rights.
              </p>
            </section>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">Immigration Lawyer</h3>
                <p className="text-gray-600 mb-4">
                  Expert immigration lawyer services for Edgecombe County residents
                </p>
                <Link
                  href="/practice-areas/immigration"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">
                  Personal Injury Attorney
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert personal injury attorney services for Edgecombe County residents
                </p>
                <Link
                  href="/practice-areas/personal-injury"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">
                  Workers' Compensation Lawyer
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert workers' compensation lawyer services for Edgecombe County residents
                </p>
                <Link
                  href="/practice-areas/workers-compensation"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">
                  Criminal Defense Attorney
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert criminal defense attorney services for Edgecombe County residents
                </p>
                <Link
                  href="/practice-areas/criminal-defense"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">Car Accident Lawyer</h3>
                <p className="text-gray-600 mb-4">
                  Expert car accident lawyer services for Edgecombe County residents
                </p>
                <Link
                  href="/practice-areas/personal-injury/car-accidents"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
            </section>
            <section className="bg-[#6B1F2E] text-white p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Why Edgecombe County Chooses Vasquez Law</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-2">
                  <li>✓ 60+ years combined legal experience</li>
                  <li>✓ Fluent Spanish-speaking attorneys</li>
                  <li>✓ 24/7 availability for emergencies</li>
                  <li>✓ Free initial consultations</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ No fees unless we win (PI/WC cases)</li>
                  <li>✓ Offices throughout North Carolina</li>
                  <li>✓ Virtual consultations available</li>
                  <li>✓ 98% client satisfaction rate</li>
                </ul>
              </div>
            </section>
            <section className="text-center bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-[#6B1F2E]">
                Get Help Now - Serving All of Edgecombe County
              </h2>
              <p className="text-xl mb-6">
                Don't wait - North Carolina law has strict deadlines
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:18449673536"
                  className="bg-[#C9974D] text-white px-8 py-3 rounded-md hover:bg-[#D4A574] transition-colors font-semibold text-lg"
                >
                  Call 1-844-YO-PELEO
                </a>
                <button className="bg-[#6B1F2E] text-white px-8 py-3 rounded-md hover:bg-[#8B2635] transition-colors font-semibold text-lg">
                  Start Live Chat
                </button>
              </div>
            </section>
          </div>
        }
      />
      <Script
        id="edgecombe-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: `Vasquez Law Firm - Edgecombe County`,
            description: `Comprehensive legal services for Edgecombe County, North Carolina residents`,
            areaServed: {
              '@type': 'AdministrativeArea',
              name: 'Edgecombe County, NC',
            },
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
            },
          }),
        }}
      />
    </>
  );
}
