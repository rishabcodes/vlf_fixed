// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Heart, Users, Home, FileText, Globe, UserCheck, HandHeart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Humanitarian Immigration Services | Protection & Relief | Vasquez Law Firm',
  description:
    'Comprehensive humanitarian immigration services including asylum, DACA, TPS, U-visa, T-visa, VAWA, and SIJS. Expert legal protection for vulnerable immigrants.',
  keywords:
    'humanitarian immigration, asylum, DACA, TPS, U-visa, T-visa, VAWA, SIJS, refugee protection, immigration relief',
};

const humanitarianServices = [
  {
    title: 'Asylum & Refugee Protection',
    description:
      'Protection for individuals fleeing persecution based on race, religion, nationality, political opinion, or membership in a particular social group.',
    link: '/practice-areas/immigration/humanitarian/asylum',
    icon: <Shield className="text-4xl text-blue-600" />,
    highlights: [
      'Affirmative asylum applications',
      'Defensive asylum in removal proceedings',
      'Withholding of removal',
      'Convention Against Torture protection',
    ],
  },
  {
    title: 'DACA (Deferred Action for Childhood Arrivals)',
    description:
      'Protection and work authorization for individuals who came to the United States as children and meet specific requirements.',
    link: '/practice-areas/immigration/humanitarian/daca',
    icon: <Home className="text-4xl text-blue-600" />,
    highlights: [
      'Initial DACA applications',
      'DACA renewals',
      'Advance parole applications',
      'Path to permanent status',
    ],
  },
  {
    title: 'TPS (Temporary Protected Status)',
    description:
      'Temporary immigration status for nationals of designated countries affected by armed conflict, natural disasters, or extraordinary conditions.',
    link: '/practice-areas/immigration/humanitarian/tps',
    icon: <Globe className="text-4xl text-blue-600" />,
    highlights: [
      'Initial TPS registration',
      'TPS re-registration',
      'Work authorization',
      'Travel authorization',
    ],
  },
  {
    title: 'U-Visa for Crime Victims',
    description:
      'Protection for victims of qualifying crimes who have suffered mental or physical abuse and are helpful to law enforcement.',
    link: '/practice-areas/immigration/humanitarian/u-visa',
    icon: <UserCheck className="text-4xl text-blue-600" />,
    highlights: [
      'Victim of qualifying crime',
      'Law enforcement certification',
      'Derivative benefits for family',
      'Path to green card',
    ],
  },
  {
    title: 'T-Visa for Trafficking Victims',
    description:
      'Protection for victims of human trafficking who are in the United States as a result of trafficking.',
    link: '/practice-areas/immigration/humanitarian/t-visa',
    icon: <HandHeart className="text-4xl text-blue-600" />,
    highlights: [
      'Severe trafficking victims',
      'Law enforcement cooperation',
      'Family reunification',
      'Path to permanent residence',
    ],
  },
  {
    title: 'VAWA (Violence Against Women Act)',
    description:
      'Protection for victims of domestic violence, allowing them to petition for immigration status independently of their abuser.',
    link: '/practice-areas/immigration/humanitarian/vawa',
    icon: <Heart className="text-4xl text-blue-600" />,
    highlights: [
      'Self-petitions for abused spouses',
      'Protection for abused children',
      'Protection for abused parents',
      'Confidential filing process',
    ],
  },
  {
    title: 'SIJS (Special Immigrant Juvenile Status)',
    description:
      'Protection for immigrant children who have been abused, abandoned, or neglected by one or both parents.',
    link: '/practice-areas/immigration/humanitarian/sijs',
    icon: <Users className="text-4xl text-blue-600" />,
    highlights: [
      'State court dependency orders',
      'USCIS petition filing',
      'Age-out protection',
      'Path to green card',
    ],
  },
  {
    title: 'Humanitarian Parole',
    description:
      'Temporary admission into the United States for urgent humanitarian reasons or significant public benefit.',
    link: '/practice-areas/immigration/humanitarian/parole',
    icon: <FileText className="text-4xl text-blue-600" />,
    highlights: [
      'Medical emergencies',
      'Family reunification',
      'Humanitarian crises',
      'Public interest cases',
    ],
  },
];

export default function HumanitarianImmigrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Humanitarian Immigration Services</h1>
            <p className="text-xl mb-8 text-blue-100">
              Protecting vulnerable immigrants through comprehensive humanitarian relief programs. 
              Our experienced attorneys provide compassionate legal representation for asylum seekers, 
              crime victims, and those fleeing persecution or violence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Protection Now
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Humanitarian Immigration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive legal support for individuals seeking protection and relief 
              under various humanitarian immigration programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {humanitarianServices.map((service, index) => (
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

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Humanitarian Protection?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Time is critical in humanitarian cases. Contact us immediately for a confidential consultation.
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

      {/* Emergency Contact */}
      <section className="bg-red-50 border-t-4 border-red-500 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-2">Emergency Immigration Help</h3>
              <p className="text-red-700">
                Facing deportation or in immigration detention? We provide emergency assistance 24/7.
              </p>
            </div>
            <Link
              href="tel:1-844-967-3536"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors mt-4 lg:mt-0"
            >
              Emergency Hotline: 1-844-YO-PELEO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}