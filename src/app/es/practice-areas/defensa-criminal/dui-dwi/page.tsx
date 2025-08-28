import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'DUI DWI Defense Abogados NC & FL | Drunk Driving Abogado | Vasquez Law Firm',
  description:
    'Expert DUI DWI defense attorneys in Raleigh, Charlotte, Smithfield & Orlando. Aggressive defense for drunk driving, license restoration, DMV hearings.',
  keywords:
    'DUI lawyer, DWI attorney, drunk driving defense, license restoration, DMV hearing, breathalyzer, field sobriety, criminal defense, Raleigh NC, Charlotte NC, Orlando FL',
  openGraph: {
    title: 'DUI DWI Defense Abogados | Drunk Driving Abogado | Vasquez Law Firm',
    description: 'Expert DUI DWI defense attorneys fighting to protect your license and freedom.',
    type: 'website',
    images: [
      {
        url: '/images/dui-dwi-defense-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'DUI DWI Defense Abogados',
      },
    ],
  },
};

export default function DuiDwiPage() {
  const services = [
    {
      title: 'First DUI/DWI Defense',
      description:
        'Aggressive defense strategies to minimize penalties and protect your record for first-time offenders',
      icon: '🚗',
    },
    {
      title: 'Multiple DUI Defense',
      description:
        'Expert representation for repeat offenses with strategies to avoid felony charges and mandatory jail time',
      icon: '⚖️',
    },
    {
      title: 'License Restoration',
      description:
        'Fight DMV suspension and obtain limited driving privileges for work, school, and medical needs',
      icon: '📄',
    },
    {
      title: 'Breathalyzer Challenges',
      description:
        'Technical defense challenging calibration, maintenance, and proper administration of breath tests',
      icon: '🔬',
    },
    {
      title: 'Field Sobriety Defense',
      description:
        'Challenge improper administration and medical conditions affecting standardized field sobriety tests',
      icon: '👮',
    },
    {
      title: 'Blood Test Defense',
      description:
        'Chain of custody, storage conditions, and lab procedure challenges to suppress blood evidence',
      icon: '💉',
    },
    {
      title: 'CDL DUI Defense',
      description: 'Specialized defense for commercial drivers facing career-ending DUI charges',
      icon: '🚛',
    },
    {
      title: 'Underage DUI Defense',
      description:
        "Protect young drivers' futures with strategic defense against zero-tolerance violations",
      icon: '🎓',
    },
    {
      title: 'DMV Hearings',
      description:
        '10-day deadline defense at administrative hearings to save your driving privileges',
      icon: '🏛️',
    },
  ];

  const faqs = [
    {
      question: 'Should I refuse the breathalyzer test?',
      answer:
        'Refusal has serious consequences including automatic license suspension and can be used against you in court. However, every situation is unique. Call us immediately for guidance on your specific case.',
    },
    {
      question: "Can I get a DUI if I wasn't driving?",
      answer:
        'Yes. Being in "actual physical control" of a vehicle while impaired can lead to DUI charges, even if the car was not moving. This includes sitting in the driver\'s seat with keys accessible.',
    },
    {
      question: 'Will I lose my job over a DUI?',
      answer:
        'It depends on your profession and employer policies. CDL holders, healthcare workers, and those requiring security clearances face heightened risks. We work to minimize employment impacts.',
    },
    {
      question: 'Can DUI charges be reduced or dismissed?',
      answer:
        'Yes. Through careful examination of evidence, procedural errors, and negotiations, charges can often be reduced to reckless driving or dismissed entirely. Every case requires thorough investigation.',
    },
    {
      question: 'How much will a DUI cost me?',
      answer:
        'Beyond legal fees, DUI costs include fines ($200-$4,000), increased insurance, license fees, and potential lost wages. Investing in experienced defense often saves money long-term.',
    },
    {
      question: 'Can I get a limited license after DUI?',
      answer:
        'Often yes. We can petition for limited driving privileges for work, school, medical appointments, and court-ordered obligations. Timing and eligibility vary by case.',
    },
  ];

  const content = {
    introduction: `Arrested for DUI or DWI? Your license, freedom, and future are at risk. Our experienced DUI defense attorneys know how to challenge evidence, protect your rights, and fight for the best possible outcome in your case. With former prosecutors on our team and certification in field sobriety testing, we understand both sides of DUI cases and use that knowledge to your advantage.`,

    processTitle: 'How We Challenge DUI/DWI Evidence',
    process: [
      {
        step: '1',
        title: 'Traffic Stop Validity',
        description:
          'Police must have reasonable suspicion. We examine dashcam footage and reports to challenge illegal stops',
      },
      {
        step: '2',
        title: 'Field Sobriety Tests',
        description:
          'Often improperly administered. Medical conditions and nervousness can affect performance',
      },
      {
        step: '3',
        title: 'Breathalyzer Accuracy',
        description:
          'We obtain maintenance records and challenge results affected by calibration issues',
      },
      {
        step: '4',
        title: 'Blood Test Issues',
        description:
          'Chain of custody, storage, and lab procedures can all affect blood test reliability',
      },
      {
        step: '5',
        title: 'Constitutional Violations',
        description:
          'Miranda rights, illegal searches, and due process violations can lead to dismissal',
      },
    ],

    urgencyTitle: 'CRITICAL DUI/DWI Deadlines - Act Now!',
    urgencyMessage:
      "You have only 10 days to request a DMV hearing to protect your license. Don't face DUI charges alone - the consequences are too severe.",

    successStats: [
      { number: '5,000+', label: 'DUI Cases Defended' },
      { number: '85%', label: 'Charges Reduced or Dismissed' },
      { number: '10', label: 'Days to Save License' },
      { number: '24/7', label: 'Emergency DUI Help' },
    ],

    whyChooseTitle: 'Why Choose Vasquez Law Firm for DUI Defense?',
    whyChoosePoints: [
      'Certified in field sobriety testing',
      'Breathalyzer operation knowledge',
      'Blood test analysis experience',
      'DMV hearing specialists',
      'Trial-tested attorneys',
      '24/7 emergency consultation',
      'Aggressive evidence challenges',
      'Alternative sentencing options',
    ],

    penaltiesTitle: 'DUI/DWI Penalties You Face',
    penalties: [
      {
        title: 'First Offense DUI/DWI',
        criminal: [
          'Up to 60 days jail (NC)',
          'Up to 6 months jail (FL)',
          'Fines $200-$4,000',
          'Community service',
          'Probation supervision',
        ],
        license: [
          '1 year revocation (NC)',
          '6-12 months suspension (FL)',
          'Limited driving privileges',
          'Ignition interlock device',
          'SR-22 insurance required',
        ],
      },
      {
        title: 'Second Offense DUI/DWI',
        criminal: [
          'Mandatory jail time',
          'Enhanced fines',
          'Vehicle immobilization',
          'Mandatory treatment',
          'Extended probation',
        ],
        license: [
          '4 year revocation (NC)',
          '5 year suspension (FL)',
          'Mandatory interlock',
          'No limited privileges',
          'Permanent record',
        ],
      },
    ],

    stateComparison: {
      title: 'Understanding DUI/DWI Laws in NC and FL',
      states: [
        {
          name: 'North Carolina DWI',
          points: [
            'BAC limit: 0.08% (0.04% commercial)',
            'Zero tolerance under 21: Any BAC',
            'Implied consent law',
            'Mandatory license revocation',
            '5 levels of DWI severity',
            'Aggravating factors increase penalties',
          ],
        },
        {
          name: 'Florida DUI',
          points: [
            'BAC limit: 0.08% (0.04% commercial)',
            'Enhanced penalties: 0.15% BAC',
            'Zero tolerance under 21: 0.02% BAC',
            'Administrative suspension',
            'Mandatory DUI school',
            '10-year lookback period',
          ],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="DUI/DWI Defense Abogados"
      subtitle="Protecting Your License, Freedom, and Future"
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
