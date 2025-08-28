import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Top Personal Injury Lawyers in NC | No Fee Unless We Win | Vasquez Law Firm',
  description:
    "North Carolina's premier personal injury attorneys with 60+ years experience. Maximum compensation for accidents. Free consultation. No upfront fees. Available 24/7.",
  keywords:
    'personal injury lawyer NC, accident attorney North Carolina, car accident lawyer, slip and fall attorney, wrongful death lawyer NC, Raleigh personal injury lawyer, Charlotte accident attorney, Durham injury law firm, Greensboro car accident lawyer, Winston Salem wrongful death attorney',
  openGraph: {
    title: 'Top Personal Injury Lawyers in NC | No Fee Unless We Win | Vasquez Law Firm',
    description:
      "North Carolina's premier personal injury attorneys with 60+ years experience. Maximum compensation for accidents. Free consultation. No upfront fees. Available 24/7.",
    url: `https://www.vasquezlawfirm.com/practice-areas/personal-injury`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/personal-injury-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Personal Injury Lawyers in NC | No Fee Unless We Win | Vasquez Law Firm',
    description:
      "North Carolina's premier personal injury attorneys with 60+ years experience. Maximum compensation for accidents. Free consultation. No upfront fees. Available 24/7.",
    images: ['/images/practice-areas/personal-injury-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/personal-injury`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/personal-injury`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/personal-injury`,
    },
  },
};

export default function PersonalInjuryPage() {
  const services = [
    {
      title: 'Car, Truck & Motorcycle Accidents',
      description:
        'Serious accidents demand serious representation. We fight insurance companies to get you maximum compensation for medical bills, lost wages, and pain and suffering.',
      features: [
        'Car accident claims',
        'Commercial truck crashes',
        'Motorcycle accidents',
        'Uber/Lyft accidents',
        'Hit and run cases',
        'Uninsured motorist claims',
      ],
    },
    {
      title: 'Slip, Trip & Fall Injuries',
      description:
        'Property owners must keep you safe. When they fail, we hold them accountable for your injuries, medical expenses, and other damages.',
      features: [
        'Store and restaurant falls',
        'Apartment complex injuries',
        'Workplace slip and falls',
        'Sidewalk and parking lot hazards',
        'Swimming pool accidents',
        'Inadequate security claims',
      ],
    },
    {
      title: 'Medical Malpractice',
      description:
        'When healthcare providers fail to meet the standard of care, patients suffer. Our experienced attorneys hold negligent medical professionals accountable.',
      features: [
        'Surgical errors',
        'Misdiagnosis cases',
        'Birth injuries',
        'Medication errors',
        'Hospital negligence',
        'Emergency room mistakes',
      ],
    },
    {
      title: 'Wrongful Death Claims',
      description:
        "Losing a loved one due to someone else's negligence is devastating. We help families seek justice and compensation for their profound loss.",
      features: [
        'Fatal car accidents',
        'Workplace fatalities',
        'Medical malpractice deaths',
        'Defective product deaths',
        'Criminal act victims',
        'Nursing home neglect',
      ],
    },
    {
      title: 'Workplace Accidents',
      description:
        "Injured on the job? You have rights beyond workers' compensation. We explore all avenues to maximize your recovery.",
      features: [
        'Construction accidents',
        'Industrial injuries',
        'Third-party liability claims',
        'Defective equipment cases',
        'Toxic exposure',
        'Repetitive strain injuries',
      ],
    },
    {
      title: 'Product Liability',
      description:
        'Dangerous and defective products cause serious injuries. We hold manufacturers and sellers responsible for the harm their products cause.',
      features: [
        'Defective auto parts',
        'Dangerous drugs',
        'Faulty medical devices',
        'Toxic products',
        "Children's product recalls",
        'Consumer product defects',
      ],
    },
    {
      title: 'Pedestrian & Bicycle Accidents',
      description:
        'Vulnerable road users deserve protection. When drivers fail to share the road safely, we fight for injured pedestrians and cyclists.',
      features: [
        'Crosswalk accidents',
        'Sidewalk injuries',
        'Bicycle lane violations',
        'Dooring incidents',
        'School zone accidents',
        'Greenway injuries',
      ],
    },
    {
      title: 'Catastrophic Injuries',
      description:
        'Life-changing injuries require life-long care. We secure compensation that accounts for your future medical needs and quality of life.',
      features: [
        'Traumatic brain injuries',
        'Spinal cord injuries',
        'Burn injuries',
        'Amputation cases',
        'Paralysis claims',
        'Multiple trauma injuries',
      ],
    },
    {
      title: 'Nursing Home Abuse',
      description:
        'Our elderly deserve dignity and proper care. When nursing homes fail in their duty, we fight to protect vulnerable residents and their families.',
      features: [
        'Physical abuse cases',
        'Neglect and malnutrition',
        'Medication errors',
        'Fall injuries',
        'Bedsore cases',
        'Financial exploitation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How much does a personal injury lawyer cost?',
      answer:
        'We work on a contingency fee basis - you pay nothing unless we win your case. Our fee comes from the settlement or verdict we secure for you. Free consultations always.',
    },
    {
      question: 'How long do I have to file a personal injury claim in NC?',
      answer:
        'North Carolina generally allows 3 years from the date of injury to file a lawsuit. However, some cases have shorter deadlines. Contact us immediately to protect your rights.',
    },
    {
      question: 'What is my personal injury case worth?',
      answer:
        'Every case is unique. Value depends on medical expenses, lost wages, pain and suffering, and other factors. We provide honest case evaluations during your free consultation.',
    },
    {
      question: 'Do I have to go to court?',
      answer:
        'Most personal injury cases settle without trial. However, we prepare every case as if it will go to court, ensuring insurance companies take your claim seriously.',
    },
    {
      question: 'What if I was partially at fault?',
      answer:
        "North Carolina follows contributory negligence rules, which can be harsh. Even 1% fault can bar recovery. That's why you need experienced attorneys who know how to protect your claim.",
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina's Premier Personal Injury Law Firm"
        subtitle="No Fee Unless We Win - Maximum Compensation Guaranteed"
        description="Injured due to someone else's negligence? With $100+ million recovered for clients and 60+ years of combined experience, we fight for the compensation you deserve."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why Vasquez Law Firm for Personal Injury?
              </h2>
              <p className="text-lg mb-6">
                When you're hurt, you need more than just a lawyer - you need a fighter. Our
                record speaks for itself: $100+ million recovered, 98% success rate, and thousands
                of satisfied clients across North Carolina.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">No Fee Unless We Win</h3>
                  <p className="text-gray-300">
                    You pay nothing upfront. We only get paid when we win your case. No hidden
                    costs, no surprises.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Maximum Compensation</h3>
                  <p className="text-gray-300">
                    We don't settle for less. Our aggressive approach ensures you get every
                    dollar you deserve.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">24/7 Availability</h3>
                  <p className="text-gray-300">
                    Accidents don't wait for business hours. Neither do we. Call anytime for
                    immediate help.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Bilingual Support</h3>
                  <p className="text-gray-300">
                    Full legal services in English and Spanish. We ensure nothing gets lost in
                    translation.
                  </p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Proven Process</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Case Evaluation</h3>
                    <p className="text-gray-300">
                      We review your case at no cost and explain your rights and options clearly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Investigation & Evidence</h3>
                    <p className="text-gray-300">
                      We gather evidence, interview witnesses, and work with experts to build your
                      strongest case.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Aggressive Negotiation</h3>
                    <p className="text-gray-300">
                      We fight insurance companies who try to lowball you, demanding maximum
                      compensation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Trial Ready</h3>
                    <p className="text-gray-300">
                      If insurers won't pay fairly, we take them to court. Our trial experience
                      gets results.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Results Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Track Record of Success</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">$100M+</div>
                  <p className="text-sm text-gray-300">Recovered for Clients</p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">98%</div>
                  <p className="text-sm text-gray-300">Success Rate</p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">30K+</div>
                  <p className="text-sm text-gray-300">Cases Won</p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">60+</div>
                  <p className="text-sm text-gray-300">Years Experience</p>
                </div>
              </div>
            </section>

            {/* Coverage Area */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Serving All 100 North Carolina Counties
              </h2>
              <p className="text-lg mb-8">
                No matter where your accident happened in North Carolina, we're here to help.
                With offices strategically located across the state and virtual consultations
                available, justice is always within reach.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Triangle Area</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Raleigh</li>
                    <li>• Durham</li>
                    <li>• Chapel Hill</li>
                    <li>• Cary</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Charlotte Metro</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Charlotte</li>
                    <li>• Concord</li>
                    <li>• Gastonia</li>
                    <li>• Rock Hill</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Triad Area</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Greensboro</li>
                    <li>• Winston-Salem</li>
                    <li>• High Point</li>
                    <li>• Burlington</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Eastern NC</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Wilmington</li>
                    <li>• Jacksonville</li>
                    <li>• Greenville</li>
                    <li>• New Bern</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="personal-injury-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Personal Injury Law Services - Vasquez Law Firm',
            description:
              'Comprehensive personal injury legal services in North Carolina including car accidents, slip and falls, medical malpractice, and wrongful death claims.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Personal Injury Law',
            offers: {
              '@type': 'Offer',
              name: 'Free Consultation - No Fee Unless We Win',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      {/* Local Business Structured Data */}
      <Script
        id="personal-injury-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: 'Vasquez Law Firm, PLLC',
            image: 'https://www.vasquezlawfirm.com/images/vasquez-law-firm-logo.png',
            url: 'https://www.vasquezlawfirm.com',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '333 Fayetteville Street, Suite 810',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00',
            },
            sameAs: [
              'https://www.facebook.com/vasquezlawfirm',
              'https://twitter.com/vasquezlawfirm',
              'https://www.linkedin.com/company/vasquez-law-firm',
              'https://www.youtube.com/vasquezlawfirm',
            ],
            priceRange: '$$',
          }),
        }}
      />
    </>
  );
}
