import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Repetitive Stress & Carpal Tunnel Lawyers | Workers Comp | Vasquez Law Firm',
  description: 'Repetitive strain injury attorneys for carpal tunnel, tendonitis, back injuries. Get workers comp benefits. Serving NC and FL.',
  keywords: 'carpal tunnel syndrome, repetitive stress injury, RSI attorney, workers compensation',
};

export default function RepetitiveStressCarpalTunnelPage() {
  const services = [
    {
      title: 'Carpal Tunnel Syndrome',
      description: 'Comprehensive representation for wrist and hand injuries',
      icon: '✋',
      features: [
        'Keyboard and mouse injuries',
        'Assembly line carpal tunnel',
        'Cashier repetitive strain',
        'Construction tool vibration',
        'Nerve conduction studies',
        'Surgery authorization',
      ],
    },
    {
      title: 'Back & Spine Injuries',
      description: 'Repetitive lifting, bending, and twisting injuries',
      icon: '🦴',
      features: [
        'Herniated disc claims',
        'Chronic lower back pain',
        'Warehouse lifting injuries',
        'Delivery driver back strain',
        'Healthcare worker injuries',
        'Degenerative disc disease',
      ],
    },
    {
      title: 'Shoulder & Rotator Cuff',
      description: 'Overhead work and repetitive motion shoulder injuries',
      icon: '💪',
      features: [
        'Rotator cuff tears',
        'Frozen shoulder syndrome',
        'Bursitis and tendonitis',
        'Impingement syndrome',
        'Labral tears',
        'Joint replacement needs',
      ],
    },
    {
      title: 'Tendonitis & Joint Disorders',
      description: 'Inflammation and joint damage from repetitive use',
      icon: '🦵',
      features: [
        'Tennis/golfer elbow',
        'Trigger finger',
        'De Quervain syndrome',
        'Knee bursitis',
        'Hip disorders',
        'Ankle tendonitis',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I prove a repetitive stress injury is work-related?',
      answer: 'Document your job duties, repetitive motions, and when symptoms began. Medical records linking the condition to work activities are crucial. We help establish the connection through ergonomic assessments, job analysis, and medical expert testimony.',
    },
    {
      question: 'Can I get workers comp for carpal tunnel syndrome?',
      answer: 'Yes, if your job duties caused or significantly contributed to the condition. Common qualifying jobs include office workers, assembly line workers, cashiers, and construction workers. Medical evidence and work history documentation are essential.',
    },
    {
      question: 'What if my employer says it\'s arthritis, not work-related?',
      answer: 'Employers often blame age or arthritis to deny claims. However, work can aggravate pre-existing conditions, making them compensable. Our medical experts distinguish between natural aging and work-accelerated conditions.',
    },
    {
      question: 'How long do repetitive stress injury claims take?',
      answer: 'These claims often take longer because causation is disputed. Expect 6-12 months for resolution, though urgent medical treatment can be approved sooner. Strong medical evidence speeds up the process.',
    },
    {
      question: 'What benefits can I receive for RSI?',
      answer: 'Benefits include medical treatment, surgery if needed, physical therapy, temporary disability during recovery, permanent disability ratings, and vocational rehabilitation if you can\'t return to your job.',
    },
    {
      question: 'Should I report gradual onset pain to my employer?',
      answer: 'Yes, report symptoms as soon as they affect your work. Document the report in writing. Delayed reporting is a common reason for denial, even though RSI develops gradually.',
    },
  ];

  const content = {
    introduction: `Repetitive stress injuries (RSI) develop slowly but can end careers. From carpal tunnel to chronic back pain, these workplace injuries affect millions of workers. Our attorneys understand the unique challenges of RSI claims and fight to get you the treatment and compensation you deserve. We prove the work connection that insurance companies try to deny.`,

    processTitle: 'RSI Claim Process',
    process: [
      {
        step: '1',
        title: 'Medical Documentation',
        description: 'Establish diagnosis and work connection',
      },
      {
        step: '2',
        title: 'Work History Analysis',
        description: 'Document repetitive job duties and timeline',
      },
      {
        step: '3',
        title: 'File Claim',
        description: 'Submit comprehensive workers comp claim',
      },
      {
        step: '4',
        title: 'Fight Denials',
        description: 'Appeal if disputed, gather expert support',
      },
      {
        step: '5',
        title: 'Secure Benefits',
        description: 'Obtain treatment and disability compensation',
      },
    ],

    urgencyTitle: '⏰ Early Treatment Prevents Permanent Damage',
    urgencyMessage: 'Untreated RSI can cause permanent disability. Get medical treatment and legal help immediately to protect your health and rights.',

    whyChooseTitle: 'Why Choose Vasquez Law for RSI Claims',
    whyChoosePoints: [
      'Extensive experience with disputed RSI claims',
      'Relationships with occupational medicine specialists',
      'Ergonomic experts to prove work causation',
      'Success with "gradual onset" injury claims',
      'Fighting pre-existing condition denials',
      'Maximum permanent disability ratings',
      'Offices throughout North Carolina and Florida',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">High-Risk Jobs for RSI</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Office Workers</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Data entry clerks</li>
              <li>• Administrative assistants</li>
              <li>• Accountants</li>
              <li>• Customer service reps</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Industrial Workers</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Assembly line workers</li>
              <li>• Warehouse workers</li>
              <li>• Meat processors</li>
              <li>• Manufacturing employees</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Service Workers</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Healthcare workers</li>
              <li>• Cashiers</li>
              <li>• Hair stylists</li>
              <li>• Construction workers</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Repetitive Stress Injuries"
      subtitle="Carpal Tunnel & RSI Claims"
      description="Repetitive motions at work cause serious injuries. Our attorneys prove work causation and secure benefits for carpal tunnel, back injuries, and all repetitive stress conditions."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
