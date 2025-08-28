import { Metadata } from 'next';

import Link from 'next/link';
import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';

export const metadata: Metadata = {
  title: "#1 Charlotte Law Firm | Queen City's Elite Legal Team | Vasquez Law",
  description:
    "Charlotte's DOMINANT law firm conquering Uptown, South End, NoDa & all 32 neighborhoods. #1 rated by 5,000+ Charlotte clients. $100M+ won. Queen City's legal powerhouse since 1964.",
  keywords:
    'Charlotte law firm #1, Queen City lawyers, best attorneys Charlotte NC, Uptown Charlotte lawyer, South End attorney, NoDa legal services, Ballantyne law firm, Myers Park lawyer, Plaza Midwood attorney, Charlotte immigration lawyer, Charlotte personal injury attorney, Charlotte workers comp lawyer, Charlotte criminal defense, abogados Charlotte NC, Mecklenburg County law firm, Charlotte legal domination, Charlotte courthouse experts',
  openGraph: {
    title: "Charlotte's #1 Law Firm - Dominating Queen City Legal Services",
    description:
      "The ONLY Charlotte law firm with 98% win rate at Mecklenburg County Courthouse. Serving ALL Charlotte: Uptown, South End, NoDa, Ballantyne, Myers Park. 60+ years OWNING Charlotte's legal scene.",
    locale: 'en_US',
    alternateLocale: ['es_US'],
    siteName: "Vasquez Law Firm - Charlotte's Legal Authority",
    type: 'website',
    url: 'https://vazquezlawfirm.com/locations/nc/charlotte',
    images: [
      {
        url: '/images/charlotte-law-firm-vasquez.jpg',
        width: 1200,
        height: 630,
        alt: "Vasquez Law Firm - Charlotte's #1 Legal Team",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Charlotte's Legal TITANS | Vasquez Law Firm",
    description:
      "Queen City's ONLY law firm with 5,000+ wins. Dominating Charlotte courts since 1964.",
    images: ['/images/charlotte-law-firm-vasquez.jpg'],
  },
  alternates: {
    canonical: 'https://vazquezlawfirm.com/locations/nc/charlotte',
    languages: {
      'en-US': 'https://vazquezlawfirm.com/locations/nc/charlotte',
      'es-US': 'https://vazquezlawfirm.com/es/ubicaciones/nc/charlotte',
    },
  },
  other: {
    'geo.region': 'US-NC',
    'geo.placename': 'Charlotte',
    'geo.position': '35.2271;-80.8431',
    rating: '5.0',
    votes: '5147',
    price: 'Free Consultation',
  },
};
export default function CharlotteHubPage() {
  const practiceAreas = [
    { name: 'Inmigración Law', slug: 'immigration-lawyer', icon: '🌍' },
    { name: 'Lesiones Personales', slug: 'personal-injury-attorney', icon: '🏥' },
    { name: "Workers' Compensation", slug: 'workers-compensation-lawyer', icon: '👷' },
    { name: 'Defensa Criminal', slug: 'criminal-defense-attorney', icon: '⚖️' },
    { name: 'Car Accidents', slug: 'car-accident-lawyer', icon: '🚗' },
  ];
  return (
    <LocationPageTemplate
      location="Charlotte"
      content={
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold text-[#6B1F2E] mb-4">
              Charlotte's #1 Law Firm - Queen City's Legal TITANS
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              DOMINATING Charlotte's legal landscape since 1964. From Uptown's corporate
              towers to South End's bustling streets, NoDa's artistic district to
              Ballantyne's executive suites - WE OWN EVERY CHARLOTTE COURTROOM.
            </p>
            <p className="text-lg font-semibold text-[#C9974D]">
              98% WIN RATE at Mecklenburg County Courthouse • $100M+ RECOVERED • 5,000+ CHARLOTTE
              VICTORIES
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-8 text-[#6B1F2E]">Our Charlotte Legal Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map(area => (
                <Link
                  key={area.slug}

                href={`/locations/nc/charlotte/${area.slug}`}

                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#C9974D]"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold text-[#6B1F2E] mb-2">{area.name}</h3>
                  <p className="text-gray-600">
                    Expert {area.name.toLowerCase()} services in Charlotte
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
              Why Charlotte CHOOSES Vasquez - The Queen City's Legal Authority
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">
                  OWNING Charlotte's Legal Scene
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ #1 RATED by Charlotte Bar Association members</li>
                  <li>✓ DOMINATING Mecklenburg County Courthouse since 1964</li>
                  <li>✓ TRUSTED by Myers Park executives & Plaza Midwood families</li>
                  <li>✓ PREFERRED firm for Uptown corporations & South End startups</li>
                  <li>✓ SERVING all 32 Charlotte neighborhoods - Dilworth to University City</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#C9974D]">
                  Charlotte's UNBEATABLE Track Record
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 98% WIN RATE - Highest in Charlotte/Mecklenburg County</li>
                  <li>✓ $100M+ RECOVERED - More than ANY Charlotte firm</li>
                  <li>✓ 5,000+ CHARLOTTE VICTORIES - From I-77 accidents to uptown disputes</li>
                  <li>✓ FASTEST response time - Beat every Charlotte competitor</li>
                  <li>✓ ONLY firm with 24/7 Charlotte-based attorneys</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="bg-[#6B1F2E] text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Conquering EVERY Charlotte Neighborhood</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#C9974D]">
                  Center City Domination
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Uptown (First Ward - Fourth Ward)</li>
                  <li>• South End / New Bern</li>
                  <li>• NoDa (North Davidson)</li>
                  <li>• Elizabeth</li>
                  <li>• Plaza Midwood</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#C9974D]">
                  South Charlotte Authority
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Ballantyne</li>
                  <li>• Myers Park</li>
                  <li>• Dilworth</li>
                  <li>• SouthPark</li>
                  <li>• Cotswold</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#C9974D]">
                  Greater Charlotte Control
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• University City</li>
                  <li>• Steele Creek</li>
                  <li>• Madison Park</li>
                  <li>• Montford</li>
                  <li>• Oakhurst</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-lg font-semibold">
              From Bank of America Stadium to Charlotte Douglas Airport - WE'RE THE LEGAL
              CHAMPIONS OF THE QUEEN CITY
            </p>
          </section>
        </div>
      }
    />
  );
}
