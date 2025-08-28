import { Metadata } from 'next';

import Link from 'next/link';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
export const metadata: Metadata = {
  title: 'Best Lawyers in Western NC North Carolina | Vasquez Law Firm',
  description:
    'Leading law firm serving the Western NC region of NC including Buncombe, Henderson, Haywood counties. 60+ years experience. All practice areas.',
  keywords:
    'Western NC NC lawyers, Western NC attorneys, Asheville lawyers, Hendersonville lawyers, Waynesville lawyers, Brevard lawyers, Black Mountain lawyers',
};
export default function WesternNCRegionPage() {
  const counties = [
    'Buncombe',
    'Henderson',
    'Haywood',
    'Jackson',
    'Transylvania',
    'Madison',
    'Yancey',
    'Mitchell',
    'Avery',
  ];
  const cities = [
    'Asheville',
    'Hendersonville',
    'Waynesville',
    'Brevard',
    'Black Mountain',
    'Boone',
    'Burnsville',
  ];
  return (
    <LocationPageTemplate
      location="Western NC Region"
      content={
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
              Western NC North Carolina's Premier Law Firm
            </h1>
            <p className="text-xl text-gray-700">
              Serving all 9 counties in the Western NC region with comprehensive legal services.
              From Asheville to Burnsville, we're the law firm the Western NC trusts.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
              Counties We Serve in Western NC
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {counties.map(county => (
                <Link
                  key={county}

                href={`/locations/nc/counties/${county.toLowerCase().replace(/\s+/g, '-')}`}

                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center hover:bg-gray-50"
                >
                  <span className="font-semibold text-[#6B1F2E]">{county} County</span>
                </Link>
              ))}
            </div>
          </section>
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">Major Cities in Western NC</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {cities.map(city => (
                <div key={city}

                className="text-center">
                  <h3
                className="font-semibold text-lg text-[#C9974D]">{city}</h3>
                  <p className="text-gray-600">Full legal services</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
              Our Western NC Legal Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">Immigration Lawyer</h3>
                <p className="text-gray-600 mb-4">
                  Serving all of Western NC with expert immigration lawyer services
                </p>
                <Link
                  href="/practice-areas/immigration"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">
                  Personal Injury Attorney
                </h3>
                <p className="text-gray-600 mb-4">
                  Serving all of Western NC with expert personal injury attorney services
                </p>
                <Link
                  href="/practice-areas/personal-injury"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">
                  Workers' Compensation Lawyer
                </h3>
                <p className="text-gray-600 mb-4">
                  Serving all of Western NC with expert workers' compensation lawyer services
                </p>
                <Link
                  href="/practice-areas/workers-compensation"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">
                  Criminal Defense Attorney
                </h3>
                <p className="text-gray-600 mb-4">
                  Serving all of Western NC with expert criminal defense attorney services
                </p>
                <Link
                  href="/practice-areas/criminal-defense"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#6B1F2E] mb-3">Car Accident Lawyer</h3>
                <p className="text-gray-600 mb-4">
                  Serving all of Western NC with expert car accident lawyer services
                </p>
                <Link
                  href="/practice-areas/personal-injury/car-accidents"
                  className="text-[#C9974D] font-semibold hover:text-[#D4A574]"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </section>
          <section className="bg-[#6B1F2E] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              Western NC Residents: Get Your Free Consultation Today
            </h2>
            <p className="text-xl mb-6">Serving 9 counties • 7+ cities • Available 24/7</p>
            <a
              href="tel:18449673536"
              className="inline-block bg-[#C9974D] text-white px-8 py-3 rounded-md hover:bg-[#D4A574] transition-colors font-semibold text-lg"
            >
              Call 1-844-YO-PELEO Now
            </a>
          </section>
        </div>
      }
    />
  );
}
