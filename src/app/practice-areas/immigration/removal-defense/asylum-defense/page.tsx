import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asylum Defense Attorney NC & FL | Immigration Court Asylum | Vasquez Law',
  description: 'Defending asylum seekers in removal proceedings. Persecution claims, withholding, CAT protection. Fighting deportation.',
  keywords: 'asylum defense attorney, immigration court asylum, defensive asylum, persecution claims',
};

export default function AsylumDefensePage() {
  const services = [
    {
      title: 'Defensive Asylum',
      description: 'Asylum claims in removal proceedings',
      icon: '🏛️',
      features: [
        'Immigration court representation',
        'Persecution evidence development',
        'Country conditions research',
        'Expert witness coordination',
        'Appeals to BIA',
        'Federal court review',
      ],
    },
    {
      title: 'Protected Grounds',
      description: 'Persecution basis categories',
      icon: '⚖️',
      features: [
        'Political opinion',
        'Religion',
        'Race',
        'Nationality',
        'Particular social group',
        'Mixed motive cases',
      ],
    },
    {
      title: 'Withholding of Removal',
      description: 'Higher burden, no bars protection',
      icon: '🚫',
      features: [
        'More likely than not standard',
        'No one-year deadline',
        'Criminal bar analysis',
        'Mandatory protection',
        'Cannot return to country',
        'Work authorization',
      ],
    },
    {
      title: 'CAT Protection',
      description: 'Convention Against Torture relief',
      icon: '🔒',
      features: [
        'Government torture cases',
        'Criminal conviction waivers',
        'Deferral of removal',
        'No time limits',
        'Country-specific evidence',
        'Medical documentation',
      ],
    },
    {
      title: 'Evidence Building',
      description: 'Comprehensive case development',
      icon: '📚',
      features: [
        'Personal testimony preparation',
        'Corroborating documents',
        'Country expert reports',
        'Medical/psychological evaluations',
        'Witness affidavits',
        'Government reports',
      ],
    },
    {
      title: 'Procedural Defense',
      description: 'Technical immigration court strategies',
      icon: '🛡️',
      features: [
        'Termination motions',
        'Administrative closure',
        'Continuances for relief',
        'Change of venue',
        'Suppression motions',
        'Due process violations',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What\'s the difference between affirmative and defensive asylum?',
      answer: 'Affirmative asylum is filed with USCIS when not in removal proceedings. Defensive asylum is filed in Immigration Court to prevent deportation. Both require proving persecution, but defensive cases face an adversarial government attorney and immigration judge.',
    },
    {
      question: 'What if I missed the one-year deadline?',
      answer: 'Exceptions exist for changed or extraordinary circumstances. Changed country conditions, changes in US law, serious illness, legal disability, or ineffective prior counsel may excuse late filing. Withholding and CAT have no deadline.',
    },
    {
      question: 'What constitutes persecution?',
      answer: 'Persecution means serious harm or threats beyond discrimination: violence, torture, imprisonment, economic persecution, forced medical treatment. Must be by government or groups government cannot/will not control. Past persecution creates presumption of future persecution.',
    },
    {
      question: 'Can I get asylum with a criminal record?',
      answer: 'Depends on the conviction. Particularly serious crimes and aggravated felonies bar asylum. Some crimes bar withholding too. CAT protection remains available even with serious crimes if torture likely. We analyze criminal bars carefully.',
    },
    {
      question: 'What if my country is generally dangerous?',
      answer: 'General violence or crime isn\'t enough. Persecution must be targeted based on protected ground (race, religion, nationality, political opinion, social group). However, we can show you\'re specifically targeted within general violence.',
    },
    {
      question: 'What happens if asylum is granted?',
      answer: 'You can stay permanently, work legally, petition for family, travel with refugee document, and apply for green card after one year. Spouse and unmarried children under 21 can be included. Path to citizenship available.',
    },
  ];

  const content = {
    introduction: `Facing deportation with fear of returning home requires aggressive defense and compelling evidence. Asylum in immigration court means proving persecution while fighting a government attorney trying to deport you. Our experienced team builds powerful cases combining legal expertise, country condition research, and persuasive advocacy to win protection for those fleeing persecution.`,

    processTitle: 'Defensive Asylum Process',
    process: [
      {
        step: '1',
        title: 'Master Calendar',
        description: 'Initial hearing and pleadings',
      },
      {
        step: '2',
        title: 'Case Development',
        description: 'Evidence gathering and documentation',
      },
      {
        step: '3',
        title: 'Individual Hearing',
        description: 'Testimony and cross-examination',
      },
      {
        step: '4',
        title: 'Judge Decision',
        description: 'Oral or written decision',
      },
      {
        step: '5',
        title: 'Appeals if Needed',
        description: 'BIA and federal court review',
      },
    ],

    urgencyTitle: '🚨 Removal Proceedings Move Fast',
    urgencyMessage: 'Immigration court deadlines are strict. Missing them waives rights. You need experienced counsel immediately to preserve all defenses and relief options.',

    whyChooseTitle: 'Why Choose Vasquez Law for Asylum Defense',
    whyChoosePoints: [
      'Immigration court trial experience',
      'Country condition expertise',
      'Expert witness network',
      'Trauma-informed representation',
      'Federal court appeals',
      'Multi-lingual team',
      'Aggressive advocacy',
      'High success rate',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Protection Available</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">Asylum</h3>
            <p className="text-gray-300 text-sm mb-3">Path to green card and citizenship</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• 10% persecution probability</li>
              <li>• One-year deadline (with exceptions)</li>
              <li>• Some criminal bars</li>
              <li>• Family included</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Withholding</h3>
            <p className="text-gray-300 text-sm mb-3">Cannot be returned to country</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• 51% persecution probability</li>
              <li>• No deadline</li>
              <li>• Fewer criminal bars</li>
              <li>• No path to green card</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">CAT Protection</h3>
            <p className="text-gray-300 text-sm mb-3">Protection from torture</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• 51% torture probability</li>
              <li>• No deadline</li>
              <li>• No criminal bars</li>
              <li>• Government involvement required</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Building Your Asylum Case</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">1.</span>
              <div>
                <h3 className="font-bold text-white">Detailed Declaration</h3>
                <p className="text-gray-300 text-sm">Your persecution story with specific dates, places, people</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">2.</span>
              <div>
                <h3 className="font-bold text-white">Country Evidence</h3>
                <p className="text-gray-300 text-sm">State Department reports, human rights documentation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">3.</span>
              <div>
                <h3 className="font-bold text-white">Identity Documents</h3>
                <p className="text-gray-300 text-sm">Proof of nationality and group membership</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">4.</span>
              <div>
                <h3 className="font-bold text-white">Corroboration</h3>
                <p className="text-gray-300 text-sm">Medical records, photos, witness statements, news articles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">5.</span>
              <div>
                <h3 className="font-bold text-white">Expert Testimony</h3>
                <p className="text-gray-300 text-sm">Country experts, medical evaluations, psychological assessments</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Asylum Defense in Immigration Court"
      subtitle="Fighting Deportation for Persecution Victims"
      description="Aggressive representation for asylum seekers facing removal. We build compelling cases that win protection."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
