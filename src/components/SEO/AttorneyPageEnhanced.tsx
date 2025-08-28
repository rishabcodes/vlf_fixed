import { generateEnhancedAttorneySchema } from '@/components/SEO/enhanced-schemas';
import { StructuredData } from '@/components/SEO/StructuredData';
import { generateBreadcrumbSchema } from '@/components/SEO/schemas';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, Award, GraduationCap, Globe, ArrowRight } from 'lucide-react';

interface AttorneyPageProps {
  attorney: {
    name: string;
    slug: string;
    jobTitle: string;
    image?: string;
    phone?: string;
    email?: string;
    bio: string;
    education: Array<{
      school: string;
      degree: string;
      year?: string;
    }>;
    barAdmissions: string[];
    practiceAreas: string[];
    languages: string[];
    awards?: string[];
    memberships?: string[];
    yearsExperience: number;
  };
}

export function AttorneyPageEnhanced({ attorney }: AttorneyPageProps) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.vasquezlawnc.com' },
    { name: 'Attorneys', url: 'https://www.vasquezlawnc.com/attorneys' },
    { name: attorney.name, url: `https://www.vasquezlawnc.com/attorneys/${attorney.slug}` },
  ];

  return (
    <>
      {/* Structured Data */}
      <StructuredData
        data={generateEnhancedAttorneySchema({
          name: attorney.name,
          jobTitle: attorney.jobTitle,
          slug: attorney.slug,
          image: attorney.image,
          telephone: attorney.phone,
          email: attorney.email,
          education: attorney.education.map(edu => ({
            name: edu.school,
            degree: edu.degree,
            year: edu.year,
          })),
          barAdmissions: attorney.barAdmissions,
          knowsAbout: attorney.practiceAreas,
          languages: attorney.languages,
          award: attorney.awards,
          memberOf: attorney.memberships,
          yearsExperience: attorney.yearsExperience,
        })}
      />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm mb-8" aria-label="Breadcrumb">
              {breadcrumbItems.map((item, index) => (
                <span key={index}

                className="flex items-center">
                  {index > 0 && <span
                className="mx-2">/</span>}
                  {index === breadcrumbItems.length - 1 ? (
                    <span className="text-gold-400">{item.name}</span>
                  ) : (
                    <Link href={item.url}

                className="hover:text-gold-400 transition-colors">
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Attorney Photo */}
              <div className="md:col-span-1">
                <div className="relative h-96 w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={attorney.image || `/images/attorneys/${attorney.slug}.jpg`}
                    alt={`${attorney.name}, ${attorney.jobTitle} at Vasquez Law Firm`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>

              {/* Attorney Info */}
              <div className="md:col-span-2">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">{attorney.name}</h1>
                <p className="text-2xl text-gold-400 font-semibold mb-6">{attorney.jobTitle}</p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {attorney.phone && (
                    <a
                      href={`tel:${attorney.phone}`}

                className="inline-flex items-center px-6 py-3 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      Call Now
                    </a>
                  )}
                  {attorney.email && (
                    <a
                      href={`mailto:${attorney.email}`}

                className="inline-flex items-center px-6 py-3 bg-white text-burgundy-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Mail className="mr-2 w-5 h-5" />
                      Email
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-400" />
                    <span>{attorney.yearsExperience}+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gold-400" />
                    <span>Languages: {attorney.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                {/* Education */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-burgundy-900 mb-3">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {attorney.education.map((edu, index) => (
                      <li key={index}>
                        <div className="font-semibold">{edu.degree}</div>
                        <div className="text-gray-600">{edu.school}</div>
                        {edu.year && <div className="text-gray-500">{edu.year}</div>}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bar Admissions */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-burgundy-900 mb-3">Bar Admissions</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {attorney.barAdmissions.map((bar, index) => (
                      <li key={index}>{bar}</li>
                    ))}
                  </ul>
                </div>

                {/* Practice Areas */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-burgundy-900 mb-3">Practice Areas</h3>
                  <ul className="space-y-1 text-sm">
                    {attorney.practiceAreas.map((area, index) => (
                      <li key={index}>
                        <Link
                          href={`/practice-areas/${area.toLowerCase().replace(/\s+/g, '-')}`}

                className="text-burgundy-700 hover:underline"
                        >
                          {area}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Awards */}
                {attorney.awards && attorney.awards.length > 0 && (
                  <div className="mb-6">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-burgundy-900 mb-3">
                      <Award className="w-5 h-5" />
                      Awards & Recognition
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {attorney.awards.map((award, index) => (
                        <li key={index}>{award}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Professional Memberships */}
                {attorney.memberships && attorney.memberships.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-burgundy-900 mb-3">
                      Professional Memberships
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {attorney.memberships.map((membership, index) => (
                        <li key={index}>{membership}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-burgundy-900 mb-6">About {attorney.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: attorney.bio }} />
              </div>

              {/* Call to Action */}
              <div className="mt-12 bg-burgundy-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
                  Schedule a Consultation with {attorney.name.split(' ')[0]}
                </h3>
                <p className="text-gray-700 mb-6">
                  Get experienced legal representation for your case. Free initial consultation
                  available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-burgundy-700 text-white font-bold rounded-full hover:bg-burgundy-800 transition-colors"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <a
                    href="tel:1-844-967-3536"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-burgundy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    1-844-YO-PELEO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Attorneys */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-burgundy-900 mb-12">
            Meet Our Other Attorneys
          </h2>
          {/* Add related attorneys grid here */}
        </div>
      </section>
    </>
  );
}
}
