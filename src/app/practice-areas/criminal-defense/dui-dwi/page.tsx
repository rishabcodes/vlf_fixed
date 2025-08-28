import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DWI/DUI Defense Attorney NC & FL | License Protection | Vasquez Law Firm',
  description: 'Aggressive DWI/DUI defense lawyers. Protect your license & freedom. 24/7 emergency response. First offense to felony DWI. Free consultation.',
  keywords: 'DWI attorney, DUI lawyer, drunk driving defense, license restoration, breathalyzer test',
};

export default function DwiDrunkDrivingPage() {
  const services = [
    {
      title: 'First Offense DWI/DUI',
      description: 'Protecting first-time offenders from harsh consequences',
      icon: '🚗',
      features: [
        'License privilege preservation',
        'Avoiding jail time',
        'Diversion program eligibility',
        'Limited driving privileges',
        'Insurance impact mitigation',
        'Criminal record protection',
      ],
    },
    {
      title: 'Felony & Aggravated DWI',
      description: 'Defense for serious DWI charges with enhanced penalties',
      icon: '⚠️',
      features: [
        'Multiple DWI offenses',
        'High BAC cases (.15+)',
        'Accident with injuries',
        'Child endangerment DWI',
        'Commercial driver DWI',
        'Habitual offender status',
      ],
    },
    {
      title: 'License Restoration',
      description: 'Getting your driving privileges back after suspension',
      icon: '📋',
      features: [
        'DMV hearing representation',
        'Limited privilege petitions',
        'Ignition interlock compliance',
        'License reinstatement',
        'Out-of-state transfers',
        'CDL protection',
      ],
    },
    {
      title: 'Field Test Challenges',
      description: 'Challenging evidence from traffic stops and testing',
      icon: '🔬',
      features: [
        'Breathalyzer accuracy disputes',
        'Blood test chain of custody',
        'Field sobriety test validity',
        'Illegal stop challenges',
        'Miranda violations',
        'Video evidence analysis',
      ],
    },
    {
      title: 'Underage DWI Defense',
      description: 'Protecting young drivers from life-altering consequences',
      icon: '🎓',
      features: [
        'Zero tolerance violations',
        'College disciplinary defense',
        'License saving strategies',
        'Diversion programs',
        'Record sealing options',
        'Future protection',
      ],
    },
    {
      title: '24/7 Emergency Response',
      description: 'Immediate help when you need it most',
      icon: '🚨',
      features: [
        'Weekend/night arrests',
        'Bail assistance',
        'Evidence preservation',
        'Family communication',
        'Quick release strategies',
        'Immediate DMV action',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Should I blow if pulled over for DWI?',
      answer: 'In NC and FL, refusing the breathalyzer results in automatic license suspension (1 year NC, 1 year FL first offense). However, refusal may limit evidence against you. Each situation is unique. Call us immediately for guidance specific to your case.',
    },
    {
      question: 'What are the penalties for first offense DWI?',
      answer: 'North Carolina: Level 5 (least serious) includes up to 60 days jail, fines, and license revocation for 1 year. Florida: Up to 6 months jail, fines, and 6-month license suspension. Both states require substance abuse assessment and possible ignition interlock.',
    },
    {
      question: 'Can I get a limited driving privilege after DWI?',
      answer: 'Possibly. NC allows limited driving privileges for work, school, treatment after 10 days (first offense). FL offers hardship licenses for work/business purposes. Eligibility depends on BAC level, prior record, and compliance with requirements.',
    },
    {
      question: 'How can a DWI lawyer help my case?',
      answer: 'We challenge every aspect: traffic stop legality, test accuracy, officer training, constitutional violations. We negotiate reduced charges, diversion programs, and alternative sentencing. Our goal is dismissal, reduction, or minimal consequences.',
    },
    {
      question: 'What is the legal BAC limit?',
      answer: '.08% for drivers 21+, .04% for commercial drivers, .00% for drivers under 21 in both NC and FL. However, you can be charged with DWI even below .08% if impairment is shown.',
    },
    {
      question: 'Will a DWI affect my job?',
      answer: 'Possibly. Many employers check criminal records. Professional licenses, CDLs, and security clearances may be affected. We work to minimize employment impact through charge reductions, diversion programs, and expungement when eligible.',
    },
  ];

  const content = {
    introduction: `A DWI/DUI arrest doesn\'t have to ruin your life. Our experienced defense attorneys protect your freedom, license, and future. We challenge evidence, negotiate with prosecutors, and fight for the best possible outcome. Available 24/7 for emergency response throughout North Carolina and Florida.`,

    processTitle: 'DWI Defense Strategy',
    process: [
      {
        step: '1',
        title: 'Immediate Action',
        description: '24/7 response, DMV hearing request, evidence preservation',
      },
      {
        step: '2',
        title: 'Evidence Review',
        description: 'Analyze video, tests, reports for weaknesses',
      },
      {
        step: '3',
        title: 'Challenge & Negotiate',
        description: 'File motions, suppress evidence, negotiate with prosecutor',
      },
      {
        step: '4',
        title: 'Court Representation',
        description: 'Aggressive defense at trial or plea negotiation',
      },
      {
        step: '5',
        title: 'License & Future',
        description: 'Restore driving privileges, minimize long-term impact',
      },
    ],

    urgencyTitle: '⏰ Act Within 30 Days!',
    urgencyMessage: 'You have limited time to request DMV hearing to save your license. Missing deadlines means automatic suspension. Call immediately for free consultation.',

    whyChooseTitle: 'Why Choose Vasquez Law for DWI Defense',
    whyChoosePoints: [
      '24/7 emergency response for arrests',
      'Former prosecutors on our team',
      'Certified in field sobriety testing',
      'Breathalyzer and blood test expertise',
      'Successful trial record',
      'License restoration specialists',
      'Bilingual legal team',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">DWI Penalties by State (2025)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">North Carolina DWI</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-white">First Offense:</span>
                <ul className="text-gray-300 mt-1 space-y-1">
                  <li>• 24 hours - 60 days jail</li>
                  <li>• 1 year license revocation</li>
                  <li>• Substance abuse assessment</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-white">Aggravating Factors:</span>
                <ul className="text-gray-300 mt-1 space-y-1">
                  <li>• BAC .15+ (Aggravated Level 1)</li>
                  <li>• Child in vehicle</li>
                  <li>• Causing injury</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">Florida DUI</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-white">First Offense:</span>
                <ul className="text-gray-300 mt-1 space-y-1">
                  <li>• Up to 6 months jail</li>
                  <li>• 6-12 month suspension</li>
                  <li>• DUI school required</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-white">Enhanced Penalties:</span>
                <ul className="text-gray-300 mt-1 space-y-1">
                  <li>• BAC .15+ (9 months jail)</li>
                  <li>• Minor in vehicle</li>
                  <li>• Property damage/injury</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common DWI Defenses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">Stop Challenges</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• No reasonable suspicion</li>
              <li>• Illegal checkpoint</li>
              <li>• Pretext stop</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Test Challenges</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Machine calibration</li>
              <li>• Officer training</li>
              <li>• Medical conditions</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Procedural Issues</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Miranda violations</li>
              <li>• Chain of custody</li>
              <li>• Discovery violations</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="DWI/DUI Defense"
      subtitle="Protecting Your Freedom & Driving Privileges"
      description="Arrested for DWI/DUI? Our aggressive defense attorneys fight to protect your license, freedom, and future. Available 24/7 throughout North Carolina and Florida."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
