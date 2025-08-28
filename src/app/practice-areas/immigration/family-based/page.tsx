// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Heart, Home, FileText, Globe, Clock, Shield, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Family-Based Immigration Services | Reunite Your Family | Vasquez Law Firm',
  description:
    'Expert family-based immigration services including I-130 petitions, K-1 visas, green card renewal, naturalization, and consular processing. Reunite with your loved ones.',
  keywords:
    'family immigration, I-130 petition, K-1 visa, family visa, green card, naturalization, adjustment of status, consular processing',
};

const familyServices = [
  {
    title: 'I-130 Family Petitions',
    description:
      'File petitions to bring your family members to the United States as permanent residents through family relationships.',
    link: '/practice-areas/immigration/family-based/petitions',
    icon: <FileText className="text-4xl text-blue-600" />,
    highlights: [
      'Immediate relative petitions',
      'Family preference categories',
      'Sibling petitions',
      'Adult children petitions',
    ],
  },
  {
    title: 'K-1 Fiancé(e) Visas',
    description:
      'Bring your fiancé(e) to the United States for marriage and subsequent adjustment of status to permanent residence.',
    link: '/practice-areas/immigration/family-based/k1-visa',
    icon: <Heart className="text-4xl text-blue-600" />,
    highlights: [
      'K-1 visa applications',
      'K-2 visas for children',
      'Marriage timeline requirements',
      'Adjustment after marriage',
    ],
  },
  {
    title: 'Immigration Waivers',
    description:
      'Overcome inadmissibility issues and immigration violations through various waiver applications for family unity.',
    link: '/practice-areas/immigration/family-based/waivers',
    icon: <Shield className="text-4xl text-blue-600" />,
    highlights: [
      'I-601 unlawful presence waivers',
      'I-601A provisional waivers',
      'I-212 reentry waivers',
      'Fraud and misrepresentation waivers',
    ],
  },
  {
    title: 'Naturalization & Citizenship',
    description:
      'Become a U.S. citizen through naturalization, with full preparation for the civics test and interview process.',
    link: '/practice-areas/immigration/family-based/naturalization',
    icon: <Globe className="text-4xl text-blue-600" />,
    highlights: [
      'N-400 applications',
      'Civics test preparation',
      'English test assistance',
      'Oath ceremony guidance',
    ],
  },
  {
    title: 'Removal of Conditions',
    description:
      'Remove conditions on your green card to obtain permanent residence without restrictions.',
    link: '/practice-areas/immigration/family-based/removal-conditions',
    icon: <Users className="text-4xl text-blue-600" />,
    highlights: [
      'I-751 joint petitions',
      'Waiver of joint filing',
      'Divorce situations',
      'Evidence preparation',
    ],
  },
  {
    title: 'Green Card Renewal',
    description:
      'Renew or replace your green card to maintain proof of your lawful permanent resident status.',
    link: '/practice-areas/immigration/family-based/green-card-renewal',
    icon: <Clock className="text-4xl text-blue-600" />,
    highlights: [
      'I-90 renewal applications',
      'Lost card replacement',
      'Name change updates',
      'Travel considerations',
    ],
  },
  {
    title: 'Adjustment of Status',
    description:
      'Change from a temporary visa to permanent residence without leaving the United States.',
    link: '/practice-areas/immigration/family-based/adjustment-status',
    icon: <Home className="text-4xl text-blue-600" />,
    highlights: [
      'I-485 applications',
      'Work permit applications',
      'Travel document requests',
      'Interview preparation',
    ],
  },
  {
    title: 'Consular Processing',
    description:
      'Obtain immigrant visas through U.S. consulates abroad for family members outside the United States.',
    link: '/practice-areas/immigration/family-based/consular-processing',
    icon: <Plane className="text-4xl text-blue-600" />,
    highlights: [
      'DS-260 visa applications',
      'Embassy interview prep',
      'Document requirements',
      'Medical examinations',
    ],
  },
];

export default function FamilyBasedImmigrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Family-Based Immigration Services</h1>
            <p className="text-xl mb-8 text-blue-100">
              Reunite with your loved ones through our comprehensive family immigration services. 
              From I-130 petitions to naturalization, we guide families through every step of the 
              immigration process with compassion and expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Your Family Petition
              </Link>
              <Link
                href="tel:1-844-967-3536"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition-colors border-2 border-blue-600"
              >
                Call 1-844-YO-PELEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">98%</div>
              <div className="text-gray-700">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">35+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">10,000+</div>
              <div className="text-gray-700">Families Reunited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">24/7</div>
              <div className="text-gray-700">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Family Immigration Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate the complex family immigration process with confidence. Our experienced attorneys 
              handle every type of family-based immigration case.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {familyServices.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-blue-600 font-semibold group-hover:text-blue-700">
                      Learn More →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Times Notice */}
      <section className="bg-yellow-50 border-t-4 border-yellow-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start space-x-4">
            <div className="text-yellow-600 text-2xl">⚠️</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Important USCIS Update</h3>
              <p className="text-gray-700">
                As of 2025, USCIS has over 2.4 million pending family petitions. Processing times vary significantly 
                based on relationship type and country of origin. Immediate relatives of U.S. citizens receive priority 
                processing. Contact us for current wait times and strategies to expedite your case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Reunite Your Family?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't navigate the complex immigration system alone. Our experienced attorneys will guide 
            you through every step of the family petition process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule Free Consultation
            </Link>
            <Link
              href="/practice-areas/immigration"
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors border-2 border-blue-600"
            >
              View All Immigration Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}