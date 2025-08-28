import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return to Work Rights Attorney | Light Duty | Vasquez Law Firm',
  description: 'Protecting your rights when returning to work after injury. Light duty disputes, accommodations, retaliation. NC and FL.',
  keywords: 'return to work, light duty, work restrictions, workers compensation, accommodations',
};

export default function ReturntoWorkPage() {
  const services = [
    {
      title: 'Light Duty Disputes',
      description: 'Fighting inappropriate or unsafe light duty assignments',
      icon: '⚠️',
      features: [
        'Work exceeding restrictions',
        'Fake job offers',
        'Unsuitable positions',
        'Travel distance issues',
        'Shift change disputes',
        'Wage reduction fights',
      ],
    },
    {
      title: 'Medical Restrictions',
      description: 'Ensuring employers honor doctor-ordered limitations',
      icon: '🏿',
      features: [
        'Weight lifting limits',
        'Standing/sitting restrictions',
        'No repetitive motion',
        'Equipment operation limits',
        'Hour restrictions',
        'Environmental limitations',
      ],
    },
    {
      title: 'Reasonable Accommodations',
      description: 'Securing workplace modifications for safe return',
      icon: '♿',
      features: [
        'Ergonomic equipment',
        'Schedule modifications',
        'Job restructuring',
        'Assistive devices',
        'Work from home options',
        'Gradual return plans',
      ],
    },
    {
      title: 'Retaliation Protection',
      description: 'Fighting discrimination after injury claims',
      icon: '🛡️',
      features: [
        'Wrongful termination',
        'Demotion or pay cuts',
        'Harassment claims',
        'Schedule manipulation',
        'Benefits reduction',
        'Hostile work environment',
      ],
    },
    {
      title: 'Vocational Rehabilitation',
      description: "Job retraining when you can't return to old position",
      icon: '🎓',
      features: [
        'Skills assessment',
        'Job retraining programs',
        'Educational benefits',
        'Job placement assistance',
        'Career counseling',
        'New career paths',
      ],
    },
    {
      title: 'Permanent Restrictions',
      description: 'Long-term disability and work capacity evaluations',
      icon: '📊',
      features: [
        'Functional capacity exams',
        'Permanent work restrictions',
        'Disability ratings',
        'Job modification negotiations',
        'ADA compliance',
        'Long-term planning',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Can my employer force me back to work before I\'m ready?',
      answer: 'No. You can only return when your doctor clears you. If pressured to return early or work beyond restrictions, document everything and contact us. Employers who violate medical restrictions face serious liability.',
    },
    {
      question: 'What if the light duty job is degrading or fake?',
      answer: 'Employers sometimes create meaningless jobs to cut benefits. If light duty is substantially different from any real position, unsafe, or designed to humiliate you into quitting, we can challenge it and protect your benefits.',
    },
    {
      question: 'Can I refuse light duty work?',
      answer: 'Be careful - refusing suitable light duty can stop your benefits. However, you can refuse if: work exceeds medical restrictions, travel is unreasonable, or the job is clearly unsuitable. Always consult us before refusing.',
    },
    {
      question: 'What if I try to return but can\'t do the work?',
      answer: 'Failed work attempts due to your injury don\'t disqualify you from benefits. Document your limitations, communicate with your doctor, and notify your employer in writing. We help protect benefits during work trials.',
    },
    {
      question: 'Can I be fired while on workers comp?',
      answer: 'Employers cannot fire you for filing workers comp, but may terminate for legitimate business reasons. If fired shortly after injury or claim, it may be illegal retaliation. We investigate terminations and fight back.',
    },
    {
      question: 'What if I can never return to my old job?',
      answer: 'You may qualify for vocational rehabilitation to train for new work. If you can\'t work at all, permanent total disability provides lifetime benefits. We maximize compensation for career-ending injuries.',
    },
  ];

  const content = {
    introduction: `Returning to work after an injury requires careful navigation of medical restrictions, employer obligations, and your legal rights. Many workers face pressure to return too soon, inappropriate job assignments, or even retaliation. Our attorneys ensure your return to work is safe, appropriate, and protects both your health and your benefits.`,

    processTitle: 'Safe Return to Work Process',
    process: [
      {
        step: '1',
        title: 'Medical Clearance',
        description: 'Doctor determines work capacity and restrictions',
      },
      {
        step: '2',
        title: 'Job Analysis',
        description: 'Evaluate if work offered meets restrictions',
      },
      {
        step: '3',
        title: 'Accommodation Request',
        description: 'Secure necessary workplace modifications',
      },
      {
        step: '4',
        title: 'Trial Return',
        description: 'Monitor and document work attempt',
      },
      {
        step: '5',
        title: 'Protect Rights',
        description: 'Fight retaliation and ensure compliance',
      },
    ],

    urgencyTitle: '🔴 Know Your Rights Before Returning',
    urgencyMessage: 'Returning to work too soon or without proper protections can worsen injuries and jeopardize benefits. Get legal guidance before accepting any return-to-work offer.',

    whyChooseTitle: 'Why Choose Vasquez Law for Return to Work Issues',
    whyChoosePoints: [
      'Protecting workers from unsafe return-to-work demands',
      'Fighting discriminatory light duty assignments',
      'Ensuring ADA accommodations',
      'Challenging retaliatory terminations',
      'Maximizing vocational rehabilitation benefits',
      'Coordinating with treating physicians',
      'Bilingual support for all workers',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Your Return to Work Rights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">You Have the Right To:</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Follow doctor\'s restrictions</li>
              <li>• Reasonable accommodations</li>
              <li>• Same position if able</li>
              <li>• Refuse unsafe work</li>
              <li>• Continued medical treatment</li>
              <li>• Protection from retaliation</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Employer Cannot:</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Ignore medical restrictions</li>
              <li>• Create fake jobs</li>
              <li>• Force early return</li>
              <li>• Retaliate for claims</li>
              <li>• Deny accommodations</li>
              <li>• Harass or discriminate</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Light Duty Red Flags</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <p className="text-gray-300 mb-6">
            Watch for these signs of inappropriate light duty assignments:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-3">Fake Jobs</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Watching safety videos all day</li>
                <li>• Counting paper clips</li>
                <li>• Sitting in corner doing nothing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-3">Violations</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Work exceeds restrictions</li>
                <li>• No actual position exists</li>
                <li>• Dangerous conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-3">Retaliation</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Humiliating assignments</li>
                <li>• Impossible travel distance</li>
                <li>• Major pay reduction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Return to Work Rights"
      subtitle="Protecting Your Job After Injury"
      description="Returning to work after injury requires careful protection of your rights. Our attorneys ensure safe, appropriate return while preventing retaliation and protecting benefits."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
