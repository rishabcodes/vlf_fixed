import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'VAWA & U Visa Abogados NC & FL | Crime Victim Inmigración Protection | Vasquez Law Firm',
  description:
    'Expert VAWA self-petition and U visa attorneys for crime victims and domestic violence survivors. Confidential, trauma-informed legal representation. Call 1-844-YO-PELEO',
  keywords:
    'VAWA lawyer, U visa attorney, crime victim immigration, domestic violence lawyer, VAWA self petition, U visa application, crime victim protection',
  openGraph: {
    title: 'VAWA & U Visa Abogados | Crime Victim Protection - Vasquez Law Firm',
    description:
      'Compassionate VAWA and U visa attorneys providing confidential protection for crime victims and survivors.',
    images: [{ url: '/images/vawa-u-visa-lawyers.jpg' }],
  },
};

export default function VawaUVisaPage() {
  const services = [
    {
      title: 'VAWA Self-Petition Applications',
      description:
        'Self-petitions for abused spouses, children, and parents of US citizens or permanent residents',
      icon: '💗',
      features: [
        'Spouse VAWA self-petition applications',
        'Child VAWA petition assistance (under 21)',
        'Parent VAWA petitions for abused parents',
        'Abuse documentation and evidence gathering',
        'Good faith marriage evidence compilation',
        'Confidential filing without abuser knowledge',
      ],
    },
    {
      title: 'U Visa Crime Victim Protection',
      description:
        'U visa applications for victims of qualifying crimes who assist law enforcement',
      icon: '🛡️',
      features: [
        'Form I-918 U visa application preparation',
        'Law enforcement certification assistance',
        'Qualifying crime documentation',
        'Victim cooperation evidence',
        'Substantial harm demonstration',
        'Helpfulness to investigation proof',
      ],
    },
    {
      title: 'Domestic Violence Protection',
      description:
        'Specialized assistance for domestic violence survivors seeking immigration relief',
      icon: '🏠',
      features: [
        'Physical abuse documentation',
        'Emotional and psychological abuse evidence',
        'Sexual abuse case preparation',
        'Economic abuse documentation',
        'Medical records compilation',
        'Expert witness testimony coordination',
      ],
    },
    {
      title: 'Sexual Assault Victim Services',
      description: 'Trauma-informed legal assistance for sexual assault and rape survivors',
      icon: '🚨',
      features: [
        'Sexual assault U visa applications',
        'Rape victim immigration protection',
        'Incest survivor legal assistance',
        'Sexual abuse evidence gathering',
        'Police report and medical evidence',
        'Victim advocate coordination',
      ],
    },
    {
      title: 'Violent Crime Victim Assistance',
      description: 'Inmigración protection for victims of violent crimes and felonies',
      icon: '⚖️',
      features: [
        'Felonious assault victim cases',
        'Kidnapping survivor protection',
        'Murder victim family assistance',
        'Torture survivor immigration relief',
        'Witness tampering victim support',
        'Obstruction of justice cases',
      ],
    },
    {
      title: 'Derivative Family Protection',
      description:
        'Inmigración protection for qualifying family members of VAWA and U visa applicants',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Spouse derivative U visa applications',
        'Children derivative petition assistance',
        'Parent derivative eligibility assessment',
        'Family unity preservation strategies',
        'Concurrent family member applications',
        'Age-out protection for children',
      ],
    },
    {
      title: 'Work Authorization & Benefits',
      description: 'Employment authorization and benefit access for VAWA and U visa applicants',
      icon: '💼',
      features: [
        'VAWA work authorization applications',
        'U visa work permit assistance',
        'Federal benefits eligibility guidance',
        'Public benefits access coordination',
        'Social services connection assistance',
        'Victim compensation program help',
      ],
    },
    {
      title: 'Adjustment to Permanent Residence',
      description: 'Green card applications for approved VAWA and U visa holders',
      icon: '🏡',
      features: [
        'VAWA I-485 adjustment applications',
        'U visa to green card transitions',
        'Continuous presence documentation',
        'Good moral character evidence',
        'Admissibility waiver applications',
        'Family member adjustment assistance',
      ],
    },
    {
      title: 'VAWA/U Visa Denials & Appeals',
      description:
        'Appellate representation for denied VAWA self-petitions and U visa applications',
      icon: '📋',
      features: [
        'Motion to reopen denied VAWA cases',
        'Motion to reconsider U visa denials',
        'Additional evidence submission',
        'Case strategy revision and refiling',
        'Administrative Appeals Office briefs',
        'Alternative relief pathway exploration',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is VAWA and who qualifies for a VAWA self-petition?',
      answer:
        "VAWA (Violence Against Women Act) allows abused spouses, children, and parents of US citizens or permanent residents to self-petition for immigration status without their abuser's knowledge or consent. Both men and women can qualify.",
    },
    {
      question: 'What crimes qualify for a U visa?',
      answer:
        'U visas are for victims of qualifying crimes including domestic violence, sexual assault, human trafficking, kidnapping, murder, felonious assault, rape, incest, torture, and many others. We evaluate each case individually.',
    },
    {
      question: 'Do I need to cooperate with law enforcement for a U visa?',
      answer:
        'Yes, you must be helpful in the investigation or prosecution of the qualifying crime. However, we help coordinate this cooperation while protecting your safety and ensuring your rights are respected.',
    },
    {
      question: 'Will my abuser find out if I file a VAWA self-petition?',
      answer:
        'No, VAWA self-petitions are confidential. USCIS cannot disclose information about your case to your abuser. We take every precaution to protect your safety and privacy throughout the process.',
    },
    {
      question: 'How long does the VAWA or U visa process take?',
      answer:
        'VAWA cases typically take 12-20 months, while U visas can take 3-5 years due to annual caps. However, both provide work authorization and protection from removal while pending.',
    },
    {
      question: 'Can my children be included in my VAWA or U visa application?',
      answer:
        'Yes, unmarried children under 21 can be included as derivatives in both VAWA and U visa applications. We help ensure your entire family receives protection.',
    },
  ];

  const content = {
    introduction: `Crime victims and domestic violence survivors deserve protection, not fear of deportation. Our VAWA and U visa attorneys provide confidential, trauma-informed legal representation for survivors seeking safety and immigration relief. With specialized experience in both domestic violence and crime victim cases, we understand your trauma and fight for the protection you deserve while maintaining complete confidentiality.`,

    processTitle: 'Our VAWA & U Visa Process',
    process: [
      {
        step: '1',
        title: 'Confidential Safety Consultation',
        description:
          'Trauma-informed assessment in a safe, private environment with complete confidentiality',
      },
      {
        step: '2',
        title: 'Evidence Development & Documentation',
        description: 'Careful compilation of abuse or crime evidence with sensitivity to trauma',
      },
      {
        step: '3',
        title: 'Law Enforcement Coordination (U Visa)',
        description: 'Strategic cooperation with agencies while protecting your safety',
      },
      {
        step: '4',
        title: 'Application Preparation & Filing',
        description: 'Expert preparation of VAWA self-petition or U visa application',
      },
      {
        step: '5',
        title: 'Approval & Continued Protection',
        description: 'Status approval processing and path to permanent residence',
      },
    ],

    urgencyTitle: '🔒 CONFIDENTIAL HELP FOR CRIME VICTIMS',
    urgencyMessage:
      'Your safety is our absolute priority. All consultations are completely confidential. Your abuser or perpetrator will never be contacted or notified.',

    successStats: [
      { number: '400+', label: 'VAWA & U Visa Cases' },
      { number: '91%', label: 'Approval Rate' },
      { number: '100%', label: 'Confidentiality Guaranteed' },
      { number: '24/7', label: 'Emergency Support' },
    ],

    whyChooseTitle: 'Why Choose Our VAWA & U Visa Team?',
    whyChoosePoints: [
      '91% approval rate for VAWA and U visa applications',
      'Specialized trauma-informed legal representation',
      'Complete confidentiality and safety protection guaranteed',
      'Extensive experience with domestic violence cases',
      'Strong relationships with law enforcement and victim advocates',
      'Bilingual attorneys and culturally sensitive staff',
      'Comprehensive family protection services',
      'Long-term support through permanent residence process',
    ],

    qualifyingCrimes: {
      title: 'Qualifying Crimes for U Visa Protection',
      categories: [
        {
          category: 'Violent Crimes',
          crimes: [
            'Domestic Violence',
            'Sexual Assault',
            'Rape',
            'Felonious Assault',
            'Murder',
            'Kidnapping',
          ],
        },
        {
          category: 'Exploitation Crimes',
          crimes: [
            'Human Trafficking',
            'Peonage',
            'Slave Trade',
            'Involuntary Servitude',
            'Debt Bondage',
            'Forced Labor',
          ],
        },
        {
          category: 'Other Qualifying Crimes',
          crimes: [
            'Incest',
            'Torture',
            'Witness Tampering',
            'Obstruction of Justice',
            'Perjury',
            'Blackmail',
          ],
        },
      ],
    },
  };

  return (
    <StandardizedPracticeAreaTemplate
      title="VAWA & U Visa Abogados"
      subtitle="Protection for Crime Victims & Survivors"
      description="Confidential VAWA self-petition and U visa assistance for domestic violence survivors and crime victims. Our trauma-informed attorneys provide safe, private legal representation while protecting your safety and securing your immigration status."
      services={services}
      faqs={faqs}
      overview={{
        content: content.introduction,
      }}
      additionalContent={
        <div className="space-y-12">
          {/* Qualifying Crimes */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Qualifying Crimes for U Visa</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.qualifyingCrimes.categories.map((category, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-xl font-bold text-primary mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.crimes.map((crime, cIndex) => (
                      <li key={cIndex}

                className="text-gray-300 flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {crime}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-primary/20">
              <p className="text-gray-300 text-center">
                <strong className="text-primary">Note:</strong> This is not a complete list. Many
                other crimes may qualify. Contact us for a confidential consultation to discuss your
                specific situation.
              </p>
            </div>
          </section>

          {/* VAWA vs U Visa Comparison */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              VAWA vs U Visa: Which Protection is Right for You?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-6">💗 VAWA Self-Petition</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Who Qualifies:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Abused spouse of US citizen/LPR</li>
                      <li>• Abused child of US citizen/LPR</li>
                      <li>• Abused parent of US citizen</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Key Benefits:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Complete confidentiality from abuser</li>
                      <li>• No law enforcement cooperation required</li>
                      <li>• Direct path to permanent residence</li>
                      <li>• Work authorization available</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Processing Time:</h4>
                    <p className="text-primary text-sm">12-20 months typically</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-6">🛡️ U Visa</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Who Qualifies:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Victim of qualifying crime in US</li>
                      <li>• Suffered substantial harm</li>
                      <li>• Helpful to law enforcement</li>
                      <li>• Crime violated US law</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Key Benefits:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Protection from removal</li>
                      <li>• Work authorization for 4 years</li>
                      <li>• Family members can be included</li>
                      <li>• Path to permanent residence after 3 years</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Processing Time:</h4>
                    <p className="text-primary text-sm">3-5 years due to annual cap</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Evidence Requirements */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Evidence We Help You Gather</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🏥 VAWA Evidence</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Medical records documenting abuse</li>
                  <li>• Police reports and incident documentation</li>
                  <li>• Photos of injuries or property damage</li>
                  <li>• Witness statements and affidavits</li>
                  <li>• Counseling and therapy records</li>
                  <li>• Protective orders or court documents</li>
                  <li>• Good faith marriage evidence</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🚔 U Visa Evidence</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Law enforcement certification (Form I-918B)</li>
                  <li>• Police reports and criminal case records</li>
                  <li>• Medical documentation of injuries</li>
                  <li>• Victim impact statements</li>
                  <li>• Evidence of cooperation with authorities</li>
                  <li>• Prosecutor correspondence</li>
                  <li>• Expert witness testimony</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Safety & Support */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Your Safety is Our Priority</h2>
            <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    🔒 Complete Confidentiality
                  </h3>
                  <ul className="space-y-2 text-red-200">
                    <li>• All consultations are private and confidential</li>
                    <li>• Your abuser will never be contacted</li>
                    <li>• Safe meeting locations available</li>
                    <li>• Secure communication protocols</li>
                    <li>• Abogado-client privilege protection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-4">❤️ Trauma-Informed Care</h3>
                  <ul className="space-y-2 text-red-200">
                    <li>• Specially trained attorneys and staff</li>
                    <li>• Flexible scheduling for your comfort</li>
                    <li>• Coordination with victim advocates</li>
                    <li>• Mental health professional referrals</li>
                    <li>• Cultural competency and language services</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-800/30 rounded-lg text-center">
                <p className="text-red-200 font-medium">
                  🆘 If you are in immediate danger, call 911 or the National Domestic Violence
                  Hotline: 1-800-799-7233
                </p>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
