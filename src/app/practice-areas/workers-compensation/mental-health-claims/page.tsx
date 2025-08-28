import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mental Health & PTSD Workers Comp Attorney | Vasquez Law Firm',
  description: 'PTSD, anxiety, depression from workplace trauma. Get workers comp for mental health injuries. Serving NC and FL.',
  keywords: 'PTSD workers compensation, mental health claims, workplace trauma, anxiety, depression',
};

export default function MentalHealthClaimsPage() {
  const services = [
    {
      title: 'PTSD Claims',
      description: 'Post-traumatic stress from workplace incidents',
      icon: '🧠',
      features: [
        'Workplace violence trauma',
        'Accident witness PTSD',
        'First responder PTSD',
        'Robbery/assault trauma',
        'Fatal accident witnesses',
        'Ongoing threat exposure',
      ],
    },
    {
      title: 'Anxiety & Depression',
      description: 'Mental health conditions from work stress',
      icon: '💔',
      features: [
        'Severe workplace harassment',
        'Bullying and intimidation',
        'Discrimination trauma',
        'Toxic work environment',
        'Retaliation anxiety',
        'Job loss depression',
      ],
    },
    {
      title: 'Physical-Mental Claims',
      description: 'Mental health from physical injuries',
      icon: '🤕',
      features: [
        'Chronic pain depression',
        'Disability adjustment disorder',
        'Medication side effects',
        'Loss of function grief',
        'Disfigurement trauma',
        'Sleep disorder anxiety',
      ],
    },
    {
      title: 'First Responders',
      description: 'Special protections for emergency workers',
      icon: '🚑',
      features: [
        'Police officer PTSD',
        'Firefighter trauma',
        'EMT/Paramedic stress',
        'Cumulative trauma',
        'Critical incident stress',
        'Presumption benefits',
      ],
    },
    {
      title: 'Healthcare Workers',
      description: 'Mental health from patient care trauma',
      icon: '🏿',
      features: [
        'COVID-19 PTSD',
        'Patient violence trauma',
        'Death exposure stress',
        'Workplace assault',
        'Pandemic burnout',
        'Moral injury claims',
      ],
    },
    {
      title: 'Workplace Violence',
      description: 'Trauma from violent workplace incidents',
      icon: '⚠️',
      features: [
        'Active shooter trauma',
        'Coworker violence',
        'Customer assaults',
        'Domestic violence at work',
        'Threat of violence',
        'Hostage situations',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Can I get workers comp for mental health conditions?',
      answer: 'Yes, but it\'s challenging. Mental health claims require proving the condition arose from workplace events beyond normal stress. Specific traumatic incidents, violence, or extreme conditions typically qualify. Physical-mental claims (mental health from physical injuries) are easier to prove.',
    },
    {
      question: 'What mental health conditions qualify for workers comp?',
      answer: 'PTSD, acute stress disorder, adjustment disorders, major depression, and anxiety disorders can qualify. The condition must result from specific workplace trauma, not general job stress. First responders have special presumptions for PTSD in many cases.',
    },
    {
      question: 'How do I prove a mental health workers comp claim?',
      answer: 'Documentation is crucial: incident reports, witness statements, medical records, psychiatrist diagnosis, and treatment history. You must show the workplace event was the predominant cause of your condition, not personal issues or pre-existing conditions.',
    },
    {
      question: 'What if I had mental health issues before?',
      answer: 'Pre-existing conditions don\'t automatically disqualify you. If work trauma significantly worsened your condition or caused new symptoms, you may qualify. The work event must be the predominant cause of your current disability.',
    },
    {
      question: 'Do first responders get special mental health protections?',
      answer: 'Yes! North Carolina and Florida provide PTSD presumptions for first responders. If you\'re diagnosed with PTSD after qualifying events, it\'s presumed work-related. This makes claims easier for police, firefighters, and EMTs.',
    },
    {
      question: 'What benefits are available for mental health claims?',
      answer: 'Same as physical injuries: medical treatment (therapy, medication), temporary disability while unable to work, permanent disability ratings, and vocational rehabilitation. Mental health treatment can be extensive and expensive - workers comp must cover it all.',
    },
  ];

  const content = {
    introduction: `Mental health injuries from workplace trauma are real, debilitating, and compensable. Whether you witnessed a fatal accident, survived workplace violence, or developed PTSD as a first responder, you deserve support and benefits. Our attorneys understand the unique challenges of mental health claims and fight to get you the treatment and compensation you need to heal.`,

    processTitle: 'Mental Health Claim Process',
    process: [
      {
        step: '1',
        title: 'Document Trauma',
        description: 'Record incident details and immediate symptoms',
      },
      {
        step: '2',
        title: 'Seek Treatment',
        description: 'Get psychiatric evaluation and diagnosis',
      },
      {
        step: '3',
        title: 'File Claim',
        description: 'Submit with strong medical support',
      },
      {
        step: '4',
        title: 'Build Evidence',
        description: 'Gather witnesses, records, expert opinions',
      },
      {
        step: '5',
        title: 'Fight Denials',
        description: 'Appeal with psychiatric testimony',
      },
    ],

    urgencyTitle: '🆘 Get Help Now - Mental Health Is Health',
    urgencyMessage: 'Mental health conditions worsen without treatment. Don\'t suffer in silence. Workers comp must cover psychiatric care. We fight stigma and denials to get you help.',

    whyChooseTitle: 'Why Choose Vasquez Law for Mental Health Claims',
    whyChoosePoints: [
      'Understanding of mental health claim requirements',
      'Relationships with trauma psychiatrists',
      'First responder PTSD presumption expertise',
      'Fighting mental health stigma in claims',
      'Physical-mental claim experience',
      'Compassionate, confidential representation',
      'Bilingual support for all communities',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Qualifying Workplace Trauma Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Direct Trauma</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Being assaulted or attacked</li>
              <li>• Robbery at gunpoint</li>
              <li>• Sexual assault at work</li>
              <li>• Severe injury accidents</li>
              <li>• Hostage situations</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Witnessed Trauma</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Coworker fatalities</li>
              <li>• Severe accident scenes</li>
              <li>• Workplace shootings</li>
              <li>• Suicide at work</li>
              <li>• Multiple casualties</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">First Responder PTSD Presumptions (2025)</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">North Carolina</h3>
              <p className="text-gray-300 mb-3">First responders diagnosed with PTSD have presumed work-related coverage for:</p>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Witnessing death or maiming</li>
                <li>• Treating injured children</li>
                <li>• Mass casualty incidents</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Florida</h3>
              <p className="text-gray-300 mb-3">PTSD benefits without physical injury for:</p>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Law enforcement officers</li>
                <li>• Firefighters and EMTs</li>
                <li>• Qualifying traumatic events</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Mental Health & PTSD Claims"
      subtitle="Workers Comp for Psychological Injuries"
      description="Workplace trauma causes real psychological injuries. Our attorneys fight for mental health benefits, breaking through stigma and insurance denials."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
