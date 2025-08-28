import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title: 'Slip and Fall Lawyer NC | Premises Liability Attorney | Vasquez Law Firm',
  description:
    'Injured in a slip and fall accident? NC premises liability attorneys with 98% success rate. Property owners must keep you safe. No fee unless we win. Free consultation.',
  keywords:
    'slip and fall lawyer NC, trip and fall attorney North Carolina, premises liability lawyer Raleigh, store accident attorney Charlotte, restaurant slip and fall Durham, apartment complex injury lawyer, sidewalk accident attorney NC, parking lot fall lawyer',
  openGraph: {
    title: 'Slip and Fall Lawyer NC | Premises Liability Attorney',
    description:
      'Injured in a slip and fall? NC premises liability attorneys fight for maximum compensation. No fee unless we win.',
    url: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/slip-and-fall',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/slip-and-fall-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Slip and Fall Legal Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slip and Fall Lawyer NC | Premises Liability Attorney',
    description:
      'Injured in a slip and fall? NC premises liability attorneys fight for maximum compensation.',
    images: ['/images/practice-areas/slip-and-fall-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/slip-and-fall',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/personal-injury/slip-and-fall',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/lesiones-personales/resbalones-y-caidas',
    },
  },
};

export default function SlipAndFallPage() {
  const services = [
    {
      title: 'Store & Restaurant Accidents',
      description:
        'Businesses must maintain safe premises. We hold them accountable for hazardous conditions that cause injuries.',
      features: [
        'Wet floor accidents',
        'Spilled food/liquids',
        'Inadequate warning signs',
        'Poor lighting conditions',
        'Cluttered aisles',
        'Defective equipment',
      ],
    },
    {
      title: 'Apartment & Hotel Falls',
      description:
        'Property managers have a duty to maintain safe living spaces. We fight for tenants and guests injured by negligence.',
      features: [
        'Stairway accidents',
        'Balcony/railing failures',
        'Pool area hazards',
        'Parking lot defects',
        'Inadequate security lighting',
        'Ice/snow removal failures',
      ],
    },
    {
      title: 'Sidewalk & Parking Lot',
      description:
        'Municipalities and property owners must maintain safe walkways. We pursue claims for preventable injuries.',
      features: [
        'Cracked/uneven sidewalks',
        'Pothole injuries',
        'Missing handrails',
        'Construction hazards',
        'Ice and snow accidents',
        'Inadequate lighting',
      ],
    },
    {
      title: 'Workplace Slip & Falls',
      description:
        "Beyond workers' comp, third-party claims may provide additional compensation for workplace accidents.",
      features: [
        'Construction site falls',
        'Office building accidents',
        'Warehouse injuries',
        'Delivery accidents',
        'Customer location falls',
        'Equipment failures',
      ],
    },
    {
      title: 'Government Property',
      description:
        'Special rules apply to government property claims. We navigate complex procedures to secure compensation.',
      features: [
        'Public building accidents',
        'Park and recreation injuries',
        'School property falls',
        'Government office accidents',
        'Public transportation slips',
        'Municipal property defects',
      ],
    },
    {
      title: 'Nursing Home Falls',
      description:
        'Elderly residents deserve safe environments. We hold facilities accountable for preventable fall injuries.',
      features: [
        'Inadequate supervision',
        'Unsafe room conditions',
        'Bathroom accidents',
        'Medication-related falls',
        'Improper transfers',
        'Equipment failures',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I prove the property owner was liable?',
      answer:
        'We must show the owner knew or should have known about the dangerous condition and failed to fix it or warn visitors. We gather evidence including surveillance footage, incident reports, and witness statements.',
    },
    {
      question: "What if I didn't report the fall immediately?",
      answer:
        'While immediate reporting is best, you can still pursue a claim. Seek medical attention first, then report the incident as soon as possible. We can help gather evidence even after the fact.',
    },
    {
      question: 'Can I sue if there was a "wet floor" sign?',
      answer:
        'Yes, if the sign was inadequate, improperly placed, or the hazard was unreasonably dangerous despite the warning. Each case depends on specific circumstances.',
    },
    {
      question: 'What damages can I recover in a slip and fall case?',
      answer:
        'You may recover medical expenses, lost wages, pain and suffering, future medical costs, and in severe cases, compensation for permanent disability or disfigurement.',
    },
    {
      question: 'How long do I have to file a slip and fall lawsuit in NC?',
      answer:
        'North Carolina generally allows 3 years from the date of injury, but government claims may have shorter deadlines. Contact us immediately to protect your rights.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina Slip & Fall Accident Lawyers"
        subtitle="Property Owners Must Keep You Safe - We Make Them Pay"
        description="When property owners fail to maintain safe premises, innocent people get hurt. Our experienced premises liability attorneys fight for maximum compensation for your injuries."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Key Elements Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Proving Your Slip & Fall Case
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">We Must Prove:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Dangerous condition existed</li>
                    <li>• Owner knew or should have known</li>
                    <li>• Failed to fix or warn</li>
                    <li>• Condition caused your fall</li>
                    <li>• You suffered actual damages</li>
                    <li>• You were lawfully on the property</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Evidence We Gather:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Security camera footage</li>
                    <li>• Incident/accident reports</li>
                    <li>• Witness statements</li>
                    <li>• Photos of the hazard</li>
                    <li>• Maintenance records</li>
                    <li>• Prior complaint history</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Hazards Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Common Slip & Fall Hazards</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Indoor Hazards</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Wet/slippery floors</li>
                    <li>• Torn carpeting</li>
                    <li>• Poor lighting</li>
                    <li>• Cluttered walkways</li>
                    <li>• Broken stairs</li>
                    <li>• Missing handrails</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Outdoor Hazards</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Ice and snow</li>
                    <li>• Cracked sidewalks</li>
                    <li>• Potholes</li>
                    <li>• Uneven surfaces</li>
                    <li>• Construction debris</li>
                    <li>• Inadequate lighting</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Hidden Dangers</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Clear liquids on floors</li>
                    <li>• Black ice</li>
                    <li>• Loose floorboards</li>
                    <li>• Elevator gaps</li>
                    <li>• Escalator defects</li>
                    <li>• Automatic door failures</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Steps After Fall Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Critical Steps After Your Slip & Fall
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Get Medical Attention</h3>
                    <p className="text-gray-300">
                      Your health comes first. Seek immediate medical care and follow all treatment
                      recommendations. This also documents your injuries.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Report the Incident</h3>
                    <p className="text-gray-300">
                      Notify the property owner, manager, or supervisor immediately. Get a copy of
                      any incident report filed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Document Everything</h3>
                    <p className="text-gray-300">
                      Take photos of the hazard, your injuries, and the surrounding area. Get
                      contact information from witnesses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Preserve Evidence</h3>
                    <p className="text-gray-300">
                      Keep the clothes and shoes you were wearing. Don\'t post on social media about
                      the accident.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">5.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Call an Attorney</h3>
                    <p className="text-gray-300">
                      Contact us before giving statements to insurance companies. We protect your
                      rights and maximize your compensation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Results Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Recent Slip & Fall Case Results
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="text-3xl font-black text-primary mb-2">Major Recovery</div>
                  <p className="text-gray-300">
                    Grocery store fall resulting in hip replacement surgery for 68-year-old client
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="text-3xl font-black text-primary mb-2">Substantial Settlement</div>
                  <p className="text-gray-300">
                    Restaurant slip on unmarked wet floor causing back surgery for server
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="text-3xl font-black text-primary mb-2">Significant Recovery</div>
                  <p className="text-gray-300">
                    Apartment complex stairway fall due to broken handrail
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="text-3xl font-black text-primary mb-2">Notable Settlement</div>
                  <p className="text-gray-300">
                    Parking lot pothole injury resulting in ankle surgery
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                * Past results do not guarantee future outcomes. Each case is unique.
              </p>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="slip-fall-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Slip and Fall Legal Services - Vasquez Law Firm',
            description:
              'Experienced slip and fall accident attorneys in North Carolina. We fight for victims injured due to property owner negligence.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Premises Liability Law',
          }),
        }}
      />
    </>
  );
}
