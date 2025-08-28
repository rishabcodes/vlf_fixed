import { Metadata } from 'next';

import Link from 'next/link';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
export const metadata: Metadata = {
  title: 'Best Lawyers in Asheville, NC | All Practice Areas | Vasquez Law Firm',
  description:
    'Top-rated law firm in Asheville, North Carolina. Immigration, personal injury, workers comp, criminal defense. 60+ years experience. Free consultation. Se habla español.',
  keywords:
    'lawyers Asheville NC, attorneys Asheville, law firm Asheville North Carolina, abogados Asheville',
};
export default function AshevilleHubPage() {
  const practiceAreas = [
    { name: 'Immigration Law', slug: 'immigration-lawyer', icon: '🌍' },
    { name: 'Personal Injury', slug: 'personal-injury-attorney', icon: '🏥' },
    { name: "Workers' Compensation", slug: 'workers-compensation-lawyer', icon: '👷' },
    { name: 'Criminal Defense', slug: 'criminal-defense-attorney', icon: '⚖️' },
    { name: 'Car Accidents', slug: 'car-accident-lawyer', icon: '🚗' },
  ];
  return (
    <LocationPageTemplate
      location="Asheville"
      content={
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
              Asheville's Premier Law Firm - Vasquez Law
            </h1>
            <p className="text-xl text-gray-700">
              Serving Asheville and all of Buncombe County with 60+ years of legal excellence.
              Choose your practice area below or call 1-844-YO-PELEO for immediate assistance.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-8 text-[#6B1F2E]">Our Asheville Legal Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map(area => (
                <Link
                  key={area.slug}

                href={`/locations/nc/asheville/${area.slug}`}

                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#C9974D]"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold text-[#6B1F2E] mb-2">{area.name}</h3>
                  <p className="text-gray-600">
                    Expert {area.name.toLowerCase()} services in Asheville
                  </p>
                  <span className="text-[#C9974D] font-semibold mt-4 inline-block">
                    Learn More →
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-[#6B1F2E]">
              Why Asheville Trusts Vasquez Law Firm
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">
                  Local Asheville Presence
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Serving Asheville for over 20 years</li>
                  <li>✓ Deep knowledge of Buncombe County legal system</li>
                  <li>✓ Active in Asheville community</li>
                  <li>✓ Convenient location for all Asheville residents</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">Proven Results</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 98% success rate in Buncombe County</li>
                  <li>✓ $100M+ recovered for clients</li>
                  <li>✓ 5,000+ Asheville clients helped</li>
                  <li>✓ 24/7 availability for emergencies</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="bg-[#6B1F2E] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              Asheville - Western NC: Complete Legal Coverage
            </h2>
            <p className="text-xl mb-6">From the mountains to the coast, we're here for you</p>
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
