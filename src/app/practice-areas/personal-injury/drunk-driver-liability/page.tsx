import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drunk Driver Accident Attorney | DUI Crash Lawyer | Vasquez Law Firm',
  description: 'Hit by drunk driver? Get maximum compensation including punitive damages. Dram shop liability, criminal restitution. NC and FL.',
  keywords: 'drunk driver accident, DUI crash lawyer, impaired driver attorney, dram shop liability',
};

export default function DrunkDriverLiabilityPage() {
  const services = [
    {
      title: 'DUI/DWI Crash Claims',
      description: 'Full compensation from drunk driver accidents',
      icon: '🚫',
      features: [
        'Alcohol-impaired drivers',
        'Drug-impaired crashes',
        'Prescription medication DUI',
        'Marijuana impairment',
        'Combined substance cases',
        'Commercial driver DUI',
      ],
    },
    {
      title: 'Punitive Damages',
      description: 'Enhanced damages for drunk driving',
      icon: '⚖️',
      features: [
        'Punishment for reckless conduct',
        'Deterrent to future behavior',
        'Multiple prior DUIs',
        'Extreme intoxication levels',
        'Hit and run while drunk',
        'Aggravated circumstances',
      ],
    },
    {
      title: 'Dram Shop Liability',
      description: 'Claims against bars and restaurants',
      icon: '🍻',
      features: [
        'Over-serving intoxicated patrons',
        'Serving minors',
        'Visible intoxication ignored',
        'Happy hour violations',
        'Server training failures',
        'Corporate liability',
      ],
    },
    {
      title: 'Social Host Liability',
      description: 'Claims against party hosts',
      icon: '🏠',
      features: [
        'House party liability',
        'Underage drinking provision',
        'Corporate event liability',
        'Wedding reception claims',
        'Tailgating accidents',
        'Holiday party crashes',
      ],
    },
    {
      title: 'Criminal Coordination',
      description: 'Working with criminal prosecution',
      icon: '👮',
      features: [
        'Criminal restitution orders',
        'Victim impact statements',
        'Evidence preservation',
        'BAC test results',
        'Police report coordination',
        'Conviction as evidence',
      ],
    },
    {
      title: 'Catastrophic Injuries',
      description: 'Severe injury compensation',
      icon: '🚑',
      features: [
        'Traumatic brain injuries',
        'Spinal cord damage',
        'Multiple trauma cases',
        'Permanent disability',
        'Wrongful death claims',
        'Family impact damages',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Can I get punitive damages from a drunk driver?',
      answer: 'Yes! Drunk driving shows gross negligence qualifying for punitive damages. These damages punish the drunk driver and can significantly increase your recovery. We\'ve secured punitive awards exceeding compensatory damages.',
    },
    {
      question: 'Can I sue the bar that served the drunk driver?',
      answer: 'Often yes. Dram shop laws hold bars, restaurants, and stores liable for serving obviously intoxicated patrons or minors who cause accidents. We investigate where the driver drank and pursue all liable parties.',
    },
    {
      question: 'What if the drunk driver has minimal insurance?',
      answer: 'We pursue multiple sources: the driver\'s assets, dram shop claims against establishments, social host liability, your uninsured/underinsured motorist coverage, and criminal restitution. We maximize recovery from all available sources.',
    },
    {
      question: 'How does the criminal DUI case affect my civil claim?',
      answer: 'A DUI conviction helps prove liability in your civil case. We coordinate with prosecutors, obtain evidence from criminal proceedings, and use conviction as powerful evidence. Criminal restitution can supplement civil recovery.',
    },
    {
      question: 'What damages can I recover from a drunk driver?',
      answer: 'All economic damages (medical, lost wages, property), non-economic damages (pain, suffering, emotional distress), and punitive damages. Drunk driving cases often result in higher settlements due to jury anger at impaired drivers.',
    },
    {
      question: 'Should I wait for the criminal case to finish?',
      answer: 'No! Evidence disappears, witnesses forget, and statutes of limitations run. We can proceed with civil claims while criminal case pending. Early action often produces better results and preserves all options.',
    },
  ];

  const content = {
    introduction: `Drunk drivers destroy innocent lives through their reckless choices. If you\'ve been hit by an impaired driver, you deserve maximum compensation - not just for your injuries, but punitive damages to punish their dangerous behavior. Our attorneys aggressively pursue drunk drivers, bars that over-served them, and all responsible parties to secure justice and full compensation for victims.`,

    processTitle: 'Drunk Driver Claim Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Immediate investigation and evidence preservation',
      },
      {
        step: '2',
        title: 'Criminal Coordination',
        description: 'Work with prosecutors, obtain BAC evidence',
      },
      {
        step: '3',
        title: 'Liability Investigation',
        description: 'Identify all parties: driver, bars, hosts',
      },
      {
        step: '4',
        title: 'Damage Documentation',
        description: 'Full accounting of injuries and losses',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Pursue all sources including punitive damages',
      },
    ],

    urgencyTitle: '🚨 Act Fast - Evidence Disappears',
    urgencyMessage: 'Bar surveillance footage, credit card records, and witness memories fade quickly. Immediate action preserves crucial evidence of intoxication and service.',

    whyChooseTitle: 'Why Choose Vasquez Law for Drunk Driver Cases',
    whyChoosePoints: [
      'Aggressive pursuit of punitive damages',
      'Dram shop liability expertise',
      'Criminal case coordination',
      'Maximum recovery from all sources',
      'Wrongful death experience',
      'Trial ready for maximum verdicts',
      'No fees unless we win',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Drunk Driving Statistics (2025)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <div className="text-4xl font-bold text-red-400 mb-2">28%</div>
            <div className="text-lg text-white mb-2">Of Traffic Deaths</div>
            <p className="text-gray-400 text-sm">Involve drunk drivers nationwide</p>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <div className="text-4xl font-bold text-yellow-400 mb-2">32</div>
            <div className="text-lg text-white mb-2">People Daily</div>
            <p className="text-gray-400 text-sm">Killed by drunk drivers in US</p>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <div className="text-4xl font-bold text-green-400 mb-2">3x</div>
            <div className="text-lg text-white mb-2">Higher Settlements</div>
            <p className="text-gray-400 text-sm">Average for drunk driving cases</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Dram Shop Liability Requirements</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <p className="text-gray-300 mb-6">To hold a bar or restaurant liable:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">North Carolina</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Served while obviously intoxicated</li>
                <li>• Served minor under 21</li>
                <li>• Knew patron would drive</li>
                <li>• Proximate cause of injuries</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Florida</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Served person habitually addicted</li>
                <li>• Served minor under 21</li>
                <li>• Willful and unlawful service</li>
                <li>• Direct cause of damages</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Drunk Driver Accident Claims"
      subtitle="Maximum Justice for DUI Crash Victims"
      description="Hit by a drunk driver? We fight for full compensation including punitive damages, pursuing the driver and establishments that served them."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
