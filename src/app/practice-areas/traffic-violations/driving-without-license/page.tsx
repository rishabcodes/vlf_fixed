import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Driving Without License Attorney NC & FL | DWOL Defense | Vasquez Law',
  description: "Charged with driving without a license? Avoid jail and get legal driving privileges. No operator's license defense.",
  keywords: 'driving without license, DWOL, no operators license, suspended license',
};

export default function DrivingWithoutLicensePage() {
  const services = [
    {
      title: 'No Valid License',
      description: "Never obtained a driver's license",
      icon: '🚫',
      features: [
        'First-time offenders',
        'Expired license cases',
        'Out-of-state issues',
        'Immigration status problems',
        'Age requirement issues',
        'Hardship license applications',
      ],
    },
    {
      title: 'Suspended License',
      description: 'Driving while license suspended',
      icon: '⚠️',
      features: [
        'DWI suspensions',
        'Point suspensions',
        'Failure to appear',
        'Unpaid tickets',
        'Child support suspensions',
        'Insurance lapses',
      ],
    },
    {
      title: 'Revoked License',
      description: 'Driving after revocation',
      icon: '🚨',
      features: [
        'Habitual offender status',
        'DWI revocations',
        'Fatal accident revocations',
        'Medical revocations',
        'Permanent revocation cases',
        'Restoration eligibility',
      ],
    },
    {
      title: 'Immigration Issues',
      description: 'Undocumented driver cases',
      icon: '🌎',
      features: [
        'No social security number',
        'DACA license issues',
        'Visa status problems',
        'International licenses',
        'Deportation concerns',
        'ICE hold risks',
      ],
    },
    {
      title: 'Commercial Driving',
      description: 'CDL and work-related violations',
      icon: '🚛',
      features: [
        'No CDL violations',
        'Wrong class license',
        'Medical card expired',
        'Endorsement violations',
        'Employment consequences',
        'DOT violations',
      ],
    },
    {
      title: 'License Restoration',
      description: 'Getting driving privileges back',
      icon: '🔄',
      features: [
        'DMV hearings',
        'Limited privileges',
        'Compliance requirements',
        'SR-22 insurance',
        'Reinstatement process',
        'Clearing old tickets',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the penalties for driving without a license?',
      answer: 'First offense: Class 3 misdemeanor in NC (up to 20 days jail), second degree misdemeanor in FL (up to 60 days). Suspended license driving: Class 1 misdemeanor in NC (up to 120 days), first degree misdemeanor in FL (up to 1 year). Penalties increase with prior convictions.',
    },
    {
      question: 'Can I go to jail for driving without a license?',
      answer: 'Yes, especially for suspended/revoked license or repeat offenses. First-time "no license" cases often avoid jail, but driving while suspended/revoked frequently results in jail time. Immigration status can complicate matters significantly.',
    },
    {
      question: 'What\'s the difference between suspended and revoked?',
      answer: 'Suspended means temporarily unable to drive (can be reinstated after requirements met). Revoked means license is terminated (must reapply from beginning). Revoked is more serious with longer restoration process.',
    },
    {
      question: 'Can I get a limited license to drive to work?',
      answer: 'Possibly. Limited driving privileges available for work, school, treatment, and household maintenance in some cases. Not available for revoked licenses or certain violations. We help petition for limited privileges.',
    },
    {
      question: 'Will this affect my immigration status?',
      answer: 'Driving without a license can trigger immigration consequences, especially with multiple offenses or if arrested. Some jurisdictions report to ICE. We coordinate with immigration attorneys to minimize risks.',
    },
    {
      question: 'How do I restore my license?',
      answer: 'Requirements vary: pay fines, complete suspension period, obtain SR-22 insurance, pay restoration fees, retake tests sometimes. We guide you through the specific requirements and help clear barriers to restoration.',
    },
  ];

  const content = {
    introduction: `Driving without a valid license can lead to jail, fines, and extended suspension. Whether you never had a license, drove while suspended, or face immigration-related license issues, immediate legal help is crucial. Our attorneys fight to keep you out of jail, minimize consequences, and help restore your driving privileges legally.`,

    processTitle: 'DWOL Defense Strategy',
    process: [
      {
        step: '1',
        title: 'Case Analysis',
        description: 'Review license status and violation details',
      },
      {
        step: '2',
        title: 'Identify Defenses',
        description: 'Challenge stop, notice issues, emergencies',
      },
      {
        step: '3',
        title: 'Negotiate Resolution',
        description: 'Reduce charges or alternative disposition',
      },
      {
        step: '4',
        title: 'Court Representation',
        description: 'Minimize penalties and jail time',
      },
      {
        step: '5',
        title: 'License Restoration',
        description: 'Help regain legal driving privileges',
      },
    ],

    urgencyTitle: '🚨 Multiple Offenses = Mandatory Jail',
    urgencyMessage: 'Second and subsequent DWOL convictions often require mandatory jail time. Get legal help immediately to avoid escalating penalties.',

    whyChooseTitle: 'Why Choose Vasquez Law for DWOL Defense',
    whyChoosePoints: [
      'Keeping clients out of jail',
      'DMV hearing representation',
      'Immigration-safe resolutions',
      'License restoration assistance',
      'Payment plan arrangements',
      'Bilingual legal team',
      'Same-day court representation',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">License Status Types</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">No License</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Never obtained license</li>
              <li>• Expired over 1 year</li>
              <li>• Not valid in state</li>
              <li>• Class 3 misdemeanor</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Suspended</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Temporary withdrawal</li>
              <li>• Can be reinstated</li>
              <li>• Various causes</li>
              <li>• Class 1 misdemeanor</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">Revoked</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• License terminated</li>
              <li>• Must reapply</li>
              <li>• Serious violations</li>
              <li>• Class 1 misdemeanor</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Suspension Reasons</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Traffic-Related</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• DWI conviction</li>
                <li>• Too many points (12 in 3 years)</li>
                <li>• Failure to appear in court</li>
                <li>• Unpaid traffic tickets</li>
                <li>• Speeding over 75 mph + 15 over</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Non-Traffic</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• No insurance coverage</li>
                <li>• Child support non-payment</li>
                <li>• Drug offense convictions</li>
                <li>• Failure to pay judgments</li>
                <li>• Medical conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Driving Without License Defense"
      subtitle="Protecting Your Freedom to Drive"
      description="Caught driving without a valid license? Our attorneys fight DWOL charges, prevent jail time, and help restore your driving privileges."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
