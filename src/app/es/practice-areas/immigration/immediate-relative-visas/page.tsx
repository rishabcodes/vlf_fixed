import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title:
    'Immediate Relative Visas Abogados NC & FL | Spouses, Parents, Children | No Wait Times | Vasquez Law Firm',
  description:
    'Expert immediate relative visa attorneys. IR-1, CR-1, IR-5 visas for spouses, parents, children of US citizens. No numerical limits, fastest processing. 97% approval rate. Call 1-844-YO-PELEO',
  keywords:
    'immediate relative visa lawyer, IR-1 visa attorney, CR-1 visa lawyer, IR-5 visa attorney, spouse visa lawyer, parent visa attorney, child visa lawyer, family immigration attorney',
  openGraph: {
    title: 'Immediate Relative Visas Abogados | Fastest Family Inmigración - Vasquez Law Firm',
    description:
      'Expert immediate relative visa attorneys with 97% approval rate. No numerical limits or wait times.',
    images: [{ url: '/images/immediate-relative-visa-lawyers.jpg' }],
  },
};

export default function ImmediateRelativeVisasPage() {
  const services = [
    {
      title: 'Spouse Visas (IR-1/CR-1)',
      description:
        'Immigrant visas for spouses of US citizens with immediate processing and no waiting periods',
      icon: '💑',
      features: [
        'IR-1 visas for marriages over 2 years',
        'CR-1 visas for marriages under 2 years',
        'I-130 petition preparation and filing',
        'Consular processing coordination',
        'Adjustment of status applications',
        'Removal of conditions (I-751) assistance',
      ],
    },
    {
      title: 'Parent Visas (IR-5)',
      description: 'Immigrant visas for parents of US citizens age 21 and older',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'IR-5 parent immigrant visa petitions',
        'Parent eligibility verification',
        'Birth certificate authentication',
        'Relationship documentation',
        'Consular processing support',
        'Medical examination coordination',
      ],
    },
    {
      title: 'Children Visas (IR-2/IH-2)',
      description: 'Immigrant visas for unmarried children under 21 of US citizens',
      icon: '👶',
      features: [
        'IR-2 biological children petitions',
        'IH-2 adopted children visas',
        'Child age protection strategies',
        'Adoption documentation review',
        'Child Status Protection Act (CSPA)',
        'Derivative beneficiary coordination',
      ],
    },
    {
      title: 'Consular Processing Excellence',
      description: 'Complete consular processing support at US embassies and consulates worldwide',
      icon: '🏛️',
      features: [
        'National Visa Center (NVC) processing',
        'DS-260 application assistance',
        'Document collection and submission',
        'Interview preparation and coaching',
        'Administrative processing follow-up',
        'Visa issuance and travel coordination',
      ],
    },
    {
      title: 'Adjustment of Status (I-485)',
      description:
        'Convert from temporary status to permanent residence while in the United States',
      icon: '🇺🇸',
      features: [
        'I-485 adjustment applications',
        'Concurrent I-130/I-485 filing',
        'Work authorization (I-765)',
        'Travel documents (I-131)',
        'Interview preparation and representation',
        'Approval processing and green card receipt',
      ],
    },
    {
      title: 'Marriage Evidence Development',
      description: 'Strategic compilation of evidence to prove genuine marital relationships',
      icon: '💍',
      features: [
        'Bona fide marriage evidence',
        'Joint financial documentation',
        'Cohabitation proof compilation',
        'Social evidence organization',
        'Family integration documentation',
        'Cultural context explanations',
      ],
    },
    {
      title: 'Removal of Conditions (I-751)',
      description: 'Remove conditions from conditional permanent residence for recent marriages',
      icon: '📋',
      features: [
        'Joint I-751 petition filing',
        'Continued marriage evidence',
        'Waiver applications for divorced spouses',
        'Good faith marriage documentation',
        'Interview preparation and representation',
        'Permanent residence finalization',
      ],
    },
    {
      title: 'Inadmissibility Waivers',
      description: 'Overcome inadmissibility grounds that may prevent visa approval',
      icon: '🛡️',
      features: [
        'I-601 inadmissibility waiver applications',
        'Extreme hardship documentation',
        'Criminal inadmissibility waivers',
        'Health-related waiver assistance',
        'Fraud/misrepresentation waivers',
        'Poverty guidelines compliance',
      ],
    },
    {
      title: 'Expedited Processing Services',
      description: 'Fast-track processing for urgent family reunification cases',
      icon: '⚡',
      features: [
        'Emergency petition expediting',
        'Medical emergency processing',
        'Military deployment expedites',
        'Humanitarian emergency cases',
        'Premium processing when available',
        'Congressional inquiry assistance',
      ],
    },
  ];

  const faqs = [
    {
      question:
        'What makes immediate relatives different from other family immigration categories?',
      answer:
        'Immediate relatives have no numerical limits or waiting periods. Visas are immediately available, making the process much faster than family preference categories which have annual quotas and long wait times.',
    },
    {
      question: 'How long does the immediate relative visa process take?',
      answer:
        'The process typically takes 12-18 months for consular processing and 8-12 months for adjustment of status. Processing times vary by USCIS office and embassy, but there are no quota-based delays.',
    },
    {
      question: 'Can I file for adjustment of status or must I use consular processing?',
      answer:
        "If you're in the US in lawful status, you can often file for adjustment of status (I-485). If you're outside the US or entered unlawfully, you typically must use consular processing. We help determine the best option.",
    },
    {
      question: 'What is the difference between IR-1 and CR-1 visas?',
      answer:
        'IR-1 is for marriages over 2 years old and grants immediate permanent residence. CR-1 is for marriages under 2 years and grants conditional permanent residence, requiring removal of conditions after 2 years.',
    },
    {
      question: 'Do I need an Affidavit of Support for immediate relatives?',
      answer:
        'Yes, Form I-864 Affidavit of Support is required for most immediate relative cases to show you can financially support your relative and prevent them from becoming a public charge.',
    },
    {
      question: 'What happens if my immediate relative petition is denied?',
      answer:
        'We can appeal the denial, file a motion to reopen/reconsider, or refile with additional evidence. Many denials can be overcome with proper legal representation and comprehensive evidence packages.',
    },
  ];

  const content = {
    introduction: `Immediate relatives of US citizens enjoy the fastest path to permanent residence with no numerical limitations or waiting periods. Our immediate relative visa attorneys have successfully reunited thousands of families with a 97% approval rate, providing expert guidance through the streamlined process that prioritizes family unity.`,

    processTitle: 'Our Immediate Relative Visa Process',
    process: [
      {
        step: '1',
        title: 'Relationship Verification & Case Strategy',
        description:
          'Confirm immediate relative relationship and develop optimal processing strategy',
      },
      {
        step: '2',
        title: 'I-130 Petition Preparation & Filing',
        description: 'Expert preparation of family-based immigrant petition with complete evidence',
      },
      {
        step: '3',
        title: 'USCIS Processing & Response Management',
        description: 'Monitor petition progress and respond to any requests for evidence',
      },
      {
        step: '4',
        title: 'Consular/Adjustment Processing',
        description: 'Complete final processing through embassy abroad or USCIS office',
      },
      {
        step: '5',
        title: 'Permanent Residence & Follow-up',
        description: 'Green card receipt and any necessary condition removal assistance',
      },
    ],

    urgencyTitle: 'No Wait Times - Immediate Processing Available!',
    urgencyMessage:
      'Unlike other family categories, immediate relatives can proceed immediately without waiting for visa availability. Start your family reunification process today.',

    successStats: [
      { number: '8,000+', label: 'Immediate Relatives Reunited' },
      { number: '97%', label: 'Approval Rate' },
      { number: '0', label: 'Wait Time for Visa Numbers' },
      { number: '12-18', label: 'Months Average Processing' },
    ],

    whyChooseTitle: 'Why Choose Our Immediate Relative Team?',
    whyChoosePoints: [
      '97% approval rate for immediate relative petitions',
      'Expert evidence development for complex relationships',
      'Comprehensive consular processing support worldwide',
      'Strategic choice between adjustment and consular processing',
      'Bilingual attorneys for international families',
      'Expedited processing assistance for urgent cases',
      'Complete removal of conditions support',
      'Inadmissibility waiver expertise when needed',
    ],

    immediateRelativeCategories: {
      title: 'Immediate Relative Categories',
      categories: [
        {
          category: 'IR-1',
          title: 'Spouse of US Citizen (Married 2+ Years)',
          description: 'Immediate permanent residence for established marriages',
          processing: '12-18 months',
          conditions: 'No conditions - permanent residence',
          benefits: [
            'Immediate work authorization',
            'No removal of conditions required',
            'Direct path to citizenship',
          ],
        },
        {
          category: 'CR-1',
          title: 'Spouse of US Citizen (Married Under 2 Years)',
          description: 'Conditional permanent residence for newer marriages',
          processing: '12-18 months',
          conditions: '2-year conditional period',
          benefits: [
            'Immediate work authorization',
            'I-751 required after 2 years',
            'Path to permanent residence',
          ],
        },
        {
          category: 'IR-5',
          title: 'Parent of US Citizen (21+ Years Old)',
          description: 'Immediate permanent residence for parents',
          processing: '8-15 months',
          conditions: 'No conditions - permanent residence',
          benefits: [
            'Fast processing times',
            'No age restrictions',
            'Medicare eligibility after 5 years',
          ],
        },
        {
          category: 'IR-2',
          title: 'Unmarried Child Under 21 of US Citizen',
          description: 'Immediate permanent residence for minor children',
          processing: '8-12 months',
          conditions: 'Age protection under CSPA',
          benefits: [
            'Child Status Protection Act coverage',
            'Educational benefits',
            'Derivative eligibility',
          ],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Immediate Relative Visas Abogados"
      subtitle="Fastest Family Inmigración - No Wait Times"
      description="Reunite with your spouse, parents, or children immediately through expert immediate relative visa assistance. No numerical limits or waiting periods - start your family's American dream today with our 97% approval rate."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Immediate Relative Categories */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Immediate Relative Categories</h2>
            <div className="space-y-6">
              {content.immediateRelativeCategories.categories.map((cat, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <div className="grid md:grid-cols-4 gap-4 items-center mb-4">
                    <div>
                      <div
                className="text-2xl font-bold text-primary mb-1">{cat.category}</div>
                      <div className="text-sm text-gray-400">Category</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white mb-1">{cat.processing}</div>
                      <div className="text-sm text-gray-400">Processing Time</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">{cat.conditions}</div>
                      <div className="text-sm text-gray-400">Conditions</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-primary font-medium">Key Benefits</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{cat.title}</h3>
                  <p className="text-gray-300 mb-4">{cat.description}</p>
                  <div>
                    <ul className="grid md:grid-cols-3 gap-2 text-gray-300 text-sm">
                      {cat.benefits.map((benefit, bIndex) => (
                        <li key={bIndex}

                className="flex items-start gap-2">
                          <span
                className="text-primary mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Processing Options */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Processing Options</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">🏛️ Consular Processing</h3>
                <p className="text-gray-300 mb-6">
                  Process your visa at a US embassy or consulate abroad
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Best For:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Beneficiaries living outside the US</li>
                      <li>• Those who entered unlawfully</li>
                      <li>• When faster processing is available abroad</li>
                      <li>• Multiple family members processing together</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Timeline:</h4>
                    <p className="text-primary text-sm">12-18 months total process</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-4">🇺🇸 Adjustment of Status</h3>
                <p className="text-gray-300 mb-6">
                  Apply for permanent residence while remaining in the US
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Best For:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Beneficiaries already in the US legally</li>
                      <li>• Those who want to remain in the US</li>
                      <li>• When work authorization is needed immediately</li>
                      <li>• Travel document requirements exist</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Timeline:</h4>
                    <p className="text-primary text-sm">8-12 months total process</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Required Documents */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Required Documentation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">👤 Identity Documents</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Birth certificates with certified translations</li>
                  <li>• Valid passports for all applicants</li>
                  <li>• Marriage certificates (if applicable)</li>
                  <li>• Divorce decrees (if previously married)</li>
                  <li>• Death certificates (if widowed)</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">💰 Financial Evidence</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Form I-864 Affidavit of Support</li>
                  <li>• Tax returns (3 most recent years)</li>
                  <li>• Employment verification letters</li>
                  <li>• Bank statements and asset documentation</li>
                  <li>• Joint sponsor documentation (if needed)</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">❤️ Relationship Evidence</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Photos together spanning relationship</li>
                  <li>• Communication records and correspondence</li>
                  <li>• Joint financial accounts and assets</li>
                  <li>• Lease agreements or property ownership</li>
                  <li>• Affidavits from family and friends</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Advantages of Immediate Relative Status */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Advantages of Immediate Relative Status
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">🚀 Speed Advantages:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• No numerical limitations or annual quotas</li>
                    <li>• No waiting for visa availability</li>
                    <li>• Fastest family immigration category</li>
                    <li>• Priority processing at USCIS and embassies</li>
                    <li>• Can file for work authorization immediately</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">💪 Legal Protections:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Child Status Protection Act coverage</li>
                    <li>• Automatic visa availability</li>
                    <li>• Protection from category downgrades</li>
                    <li>• Priority in case backlogs</li>
                    <li>• Expedited processing options available</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
