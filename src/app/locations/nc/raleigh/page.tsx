import { Metadata } from 'next';

import Link from 'next/link';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Best Lawyers in Raleigh, NC | All Practice Areas | Vasquez Law Firm',
  description:
    'Top-rated law firm in Raleigh, North Carolina. Immigration, personal injury, workers comp, criminal defense. 60+ years experience. Free consultation. Se habla español.',
  keywords:
    'lawyers Raleigh NC, attorneys Raleigh, law firm Raleigh North Carolina, abogados Raleigh',
};
export default function RaleighHubPage() {
  const practiceAreas = [
    { name: 'Immigration Law', slug: 'immigration-lawyer', icon: '🌍' },
    { name: 'Personal Injury', slug: 'personal-injury-attorney', icon: '🏥' },
    { name: "Workers' Compensation", slug: 'workers-compensation-lawyer', icon: '👷' },
    { name: 'Criminal Defense', slug: 'criminal-defense-attorney', icon: '⚖️' },
    { name: 'Car Accidents', slug: 'car-accident-lawyer', icon: '🚗' },
  ];
  return (
    <LocationPageTemplate
      location="Raleigh"
      content={
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
              Raleigh's Premier Law Firm - Vasquez Law
            </h1>
            <p className="text-xl text-gray-700">
              Serving Raleigh and all of Wake County with 60+ years of legal excellence. Choose your
              practice area below or call 1-844-YO-PELEO for immediate assistance.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-8 text-[#6B1F2E]">Our Raleigh Legal Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map(area => (
                <Link
                  key={area.slug}

                href={`/locations/nc/raleigh/${area.slug}`}

                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#C9974D]"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold text-[#6B1F2E] mb-2">{area.name}</h3>
                  <p className="text-gray-600">
                    Expert {area.name.toLowerCase()} services in Raleigh
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
              Why Raleigh Trusts Vasquez Law Firm
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">
                  Local Raleigh Presence
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Serving Raleigh for over 20 years</li>
                  <li>✓ Deep knowledge of Wake County legal system</li>
                  <li>✓ Active in Raleigh community</li>
                  <li>✓ Convenient location for all Raleigh residents</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">Proven Results</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 98% success rate in Wake County</li>
                  <li>✓ $100M+ recovered for clients</li>
                  <li>✓ 5,000+ Raleigh clients helped</li>
                  <li>✓ 24/7 availability for emergencies</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
