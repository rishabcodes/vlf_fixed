import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lifting & Back Injury Workers Comp Attorney | Vasquez Law Firm',
  description: 'Back injury from lifting at work? Herniated discs, muscle strains, spinal injuries. Get workers comp benefits. Serving NC and FL.',
  keywords: 'lifting injury, back injury, herniated disc, workers compensation, spine injury',
};

export default function LiftingInjuriesPage() {
  const services = [
    {
      title: 'Back & Spine Injuries',
      description: 'Serious back injuries from workplace lifting',
      icon: '🦴',
      features: [
        'Herniated/bulging discs',
        'Lumbar strain injuries',
        'Spinal stenosis',
        'Degenerative disc disease',
        'Sciatica nerve pain',
        'Vertebrae fractures',
      ],
    },
    {
      title: 'Shoulder Injuries',
      description: 'Rotator cuff and shoulder damage from lifting',
      icon: '💪',
      features: [
        'Rotator cuff tears',
        'Shoulder impingement',
        'Labral tears',
        'Bicep tendon injuries',
        'Shoulder dislocation',
        'Frozen shoulder',
      ],
    },
    {
      title: 'Hernia Claims',
      description: 'Abdominal and groin hernias from heavy lifting',
      icon: '⛑️',
      features: [
        'Inguinal hernias',
        'Umbilical hernias',
        'Incisional hernias',
        'Hiatal hernias',
        'Emergency surgery claims',
        'Mesh complication cases',
      ],
    },
    {
      title: 'Knee & Hip Injuries',
      description: 'Lower body injuries from lifting and carrying',
      icon: '🧎',
      features: [
        'Torn meniscus',
        'ACL/MCL injuries',
        'Hip labral tears',
        'Bursitis',
        'Joint replacement needs',
        'Chronic pain syndrome',
      ],
    },
    {
      title: 'Muscle & Soft Tissue',
      description: 'Strains, sprains, and soft tissue damage',
      icon: '🤕',
      features: [
        'Muscle tears',
        'Ligament sprains',
        'Tendon injuries',
        'Myofascial pain',
        'Chronic strain patterns',
        'Fibromyalgia claims',
      ],
    },
    {
      title: 'Disputed Claims',
      description: 'Fighting denials and pre-existing condition arguments',
      icon: '⚖️',
      features: [
        'Gradual onset disputes',
        'Pre-existing conditions',
        'Aggravation claims',
        'Specific incident proof',
        'MRI evidence fights',
        'IME challenges',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What if I didn\'t report my lifting injury immediately?',
      answer: 'Many lifting injuries worsen over time. Report as soon as you realize you\'re injured. While immediate reporting is best, you have 30 days in NC and FL to notify your employer. We can help explain delayed reporting and still win your claim.',
    },
    {
      question: 'Can I get workers comp if I had back problems before?',
      answer: 'Yes! Work can aggravate pre-existing conditions, making them compensable. If lifting at work worsened your condition or caused new injury to an already weakened area, you\'re entitled to benefits. We fight "pre-existing condition" denials daily.',
    },
    {
      question: 'What are common lifting injury symptoms?',
      answer: 'Sharp or burning back pain, numbness/tingling in legs (sciatica), muscle spasms, limited range of motion, pain radiating to hips/legs, weakness, and difficulty standing/sitting. Document all symptoms for your claim.',
    },
    {
      question: 'How much are lifting injury claims worth?',
      answer: 'Value depends on injury severity, treatment needs, and disability rating. Herniated disc surgery cases often exceed $100,000. Permanent restrictions can add substantial value. We maximize every component of your claim.',
    },
    {
      question: 'What if my employer says I lifted incorrectly?',
      answer: 'Workers comp is "no-fault" - improper lifting technique doesn\'t bar benefits. Employers often blame workers to avoid claims. Your injury occurred at work, period. We\'ll fight any attempts to deny based on "improper lifting."',
    },
    {
      question: 'Should I accept light duty after a lifting injury?',
      answer: 'Consult us first. Light duty can affect your benefits and recovery. If you can\'t perform light duty due to your injuries, don\'t force it. We help navigate light duty offers while protecting your rights.',
    },
  ];

  const content = {
    introduction: `Lifting injuries are the leading cause of workplace disability. One wrong move can cause herniated discs, torn muscles, and permanent back damage. Insurance companies often deny these claims, arguing pre-existing conditions or improper lifting. Our attorneys prove your lifting injury is work-related and fight for maximum benefits including surgery approval, disability payments, and future medical care.`,

    processTitle: 'Lifting Injury Claim Process',
    process: [
      {
        step: '1',
        title: 'Medical Documentation',
        description: 'MRI/CT scans to prove injury extent',
      },
      {
        step: '2',
        title: 'Incident Analysis',
        description: 'Document lifting incident and job duties',
      },
      {
        step: '3',
        title: 'Claim Filing',
        description: 'Submit comprehensive workers comp claim',
      },
      {
        step: '4',
        title: 'Treatment Approval',
        description: 'Fight for surgery and therapy authorization',
      },
      {
        step: '5',
        title: 'Disability Benefits',
        description: 'Secure temporary and permanent benefits',
      },
    ],

    urgencyTitle: '🔴 Don\'t Delay - Back Injuries Worsen',
    urgencyMessage: 'Untreated lifting injuries lead to permanent damage. Insurance delays make injuries worse. Get immediate legal help to secure treatment and protect your spine.',

    whyChooseTitle: 'Why Choose Vasquez Law for Lifting Injuries',
    whyChoosePoints: [
      'Extensive experience with back injury claims',
      'Fighting pre-existing condition denials',
      'Relationships with spine specialists',
      'Proving work-related aggravations',
      'Maximum permanent disability ratings',
      'Surgery and treatment approvals',
      'Bilingual team for Hispanic workers',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Proper Lifting Limits by Industry</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">NIOSH Guidelines</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• 51 lbs maximum ideal</li>
              <li>• 35 lbs frequent lifting</li>
              <li>• Reduce for repetition</li>
              <li>• Consider reach distance</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Healthcare</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• 35 lbs patient handling</li>
              <li>• Use lift assists</li>
              <li>• Team lifting required</li>
              <li>• No manual lifting policy</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Warehouse</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• 50 lbs solo lifting</li>
              <li>• 100 lbs team lifting</li>
              <li>• Mechanical aids required</li>
              <li>• Rotation schedules</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">High-Risk Lifting Jobs</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Manual Labor</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Warehouse workers - packages/pallets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Construction - materials/equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Delivery drivers - packages/furniture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Movers - household goods</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Service Industries</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Nurses - patient lifting/repositioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Caregivers - resident transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Retail - stocking/inventory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Maintenance - equipment/supplies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Lifting & Back Injuries"
      subtitle="Workers Comp for Workplace Lifting Injuries"
      description="One lift can change your life forever. Our attorneys fight for workers suffering from herniated discs, back injuries, and other lifting-related workplace injuries."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
