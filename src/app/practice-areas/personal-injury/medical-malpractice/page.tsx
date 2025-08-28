import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Malpractice Lawyers NC & FL | Hospital Negligence | Vasquez Law Firm',
  description:
    'Expert medical malpractice attorneys. Millions recovered. Surgical errors, misdiagnosis, birth injuries. Free consultation. Results-based structure.',
  keywords: [
    'medical malpractice lawyer',
    'hospital negligence',
    'surgical error',
    'misdiagnosis',
    'birth injury',
    'medication error',
    'medical mistake attorney',
  ],
};

export default function MedicalMalpracticePage() {
  const services = [
    {
      title: 'Surgical Errors',
      description: 'Devastating mistakes during surgery causing permanent injury or death',
      icon: '⚕️',
      features: [
        'Wrong-site surgery cases',
        'Anesthesia errors and overdoses',
        'Surgical instruments left inside',
        'Nerve damage during surgery',
        'Post-operative infections',
        'Unnecessary surgery claims',
      ],
    },
    {
      title: 'Misdiagnosis & Delayed Diagnosis',
      description: 'Failure to diagnose serious conditions leading to worsened outcomes',
      icon: '🔬',
      features: [
        'Cancer misdiagnosis',
        'Heart attack/stroke missed',
        'Infection diagnosis delays',
        'Appendicitis misdiagnosis',
        'Pulmonary embolism missed',
        'Meningitis diagnosis failure',
      ],
    },
    {
      title: 'Birth Injuries',
      description: 'Medical negligence during pregnancy, labor, and delivery',
      icon: '👶',
      features: [
        'Cerebral palsy from oxygen loss',
        'Brachial plexus injuries',
        'Failure to perform C-section',
        'Medication errors during pregnancy',
        'Failure to monitor fetal distress',
        'Forceps/vacuum extraction injuries',
      ],
    },
    {
      title: 'Medication Errors',
      description: 'Dangerous prescription mistakes causing severe harm',
      icon: '💊',
      features: [
        'Wrong medication prescribed',
        'Incorrect dosage errors',
        'Drug interaction failures',
        'Allergic reaction negligence',
        'Pharmacy dispensing errors',
        'IV medication mistakes',
      ],
    },
    {
      title: 'Emergency Room Errors',
      description: 'Critical mistakes in emergency medical situations',
      icon: '🚨',
      features: [
        'Failure to order proper tests',
        'Misreading test results',
        'Premature discharge',
        'Triage errors and delays',
        'Failure to consult specialists',
        'Documentation errors',
      ],
    },
    {
      title: 'Hospital Negligence',
      description: 'Systemic failures in hospital care and safety',
      icon: '🏥',
      features: [
        'Hospital-acquired infections',
        'Falls due to inadequate care',
        'Bedsores/pressure ulcers',
        'Understaffing negligence',
        'Equipment failure injuries',
        'Patient monitoring failures',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I know if I have a medical malpractice case?',
      answer: 'You may have a case if: (1) A healthcare provider violated the standard of care, (2) You suffered significant harm, and (3) The negligence directly caused your injury. Medical experts must confirm the provider\'s actions fell below accepted medical standards. We provide free case evaluations.',
    },
    {
      question: 'What is the statute of limitations for medical malpractice in North Carolina?',
      answer: 'In NC, you have 3 years from the date of injury OR 1 year from discovering the injury (but no more than 4 years total). For children under 10, the deadline extends to their 10th birthday. Florida has a 2-year limit with some exceptions. Act quickly to preserve your rights.',
    },
    {
      question: 'How much is my medical malpractice case worth?',
      answer: 'Case values vary based on severity of injury, medical costs, lost wages, and pain/suffering. NC caps non-economic damages at a substantial amount that adjusts annually for inflation. We\'ve recovered millions for clients, with significant settlements for surgical errors and birth injuries across our practice areas.',
    },
    {
      question: 'Do I need medical experts for my case?',
      answer: 'Yes, medical malpractice cases require expert testimony to prove the standard of care was breached. We work with nationally recognized medical experts in every specialty to build strong cases. Expert costs are advanced by our firm.',
    },
    {
      question: 'What if the doctor admits they made a mistake?',
      answer: 'Not all medical mistakes constitute malpractice. The error must represent a deviation from accepted medical standards that caused harm. However, admissions can strengthen your case. Document everything and contact us immediately.',
    },
    {
      question: 'How long does a medical malpractice case take?',
      answer: 'Most cases resolve in 18-24 months, though complex cases may take 3+ years. Timeline includes: investigation (3-6 months), filing lawsuit, discovery (12-18 months), mediation/trial. We push for quick resolution while maximizing your recovery.',
    },
  ];

  const content = {
    introduction: `Medical malpractice devastates lives. When healthcare providers fail to meet the standard of care, patients suffer catastrophic injuries, permanent disabilities, or death. Our medical malpractice attorneys have recovered millions for victims of medical negligence. With deep medical knowledge and access to top experts, we hold hospitals and doctors accountable for preventable medical errors.`,

    processTitle: 'Medical Malpractice Case Process',
    process: [
      {
        step: '1',
        title: 'Medical Record Review',
        description: 'Comprehensive analysis of all medical records and documentation',
      },
      {
        step: '2',
        title: 'Expert Consultation',
        description: 'Top medical experts evaluate standard of care violations',
      },
      {
        step: '3',
        title: 'Case Filing',
        description: 'File lawsuit with required expert affidavit',
      },
      {
        step: '4',
        title: 'Discovery & Depositions',
        description: 'Gather evidence, depose witnesses and medical staff',
      },
      {
        step: '5',
        title: 'Settlement or Trial',
        description: 'Negotiate maximum settlement or present to jury',
      },
    ],

    urgencyTitle: '⚠️ Evidence Disappears Fast',
    urgencyMessage: 'Medical records get altered, witnesses forget details, and statutes of limitations expire. Contact us immediately to preserve crucial evidence and protect your rights.',

    successStats: [
      { number: 'Millions', label: 'Recovered' },
      { number: '94%', label: 'Success Rate' },
      { number: '500+', label: 'Cases Won' },
      { number: 'Substantial', label: 'Avg. Settlement' },
    ],

    whyChooseTitle: 'Why Choose Vasquez Law for Medical Malpractice',
    whyChoosePoints: [
      'Millions recovered for medical malpractice victims',
      'Board-certified medical malpractice trial specialists',
      'In-house medical professionals on staff',
      'Relationships with top medical experts nationwide',
      'Advanced case funding - no upfront costs',
      'Maximum damage caps recovery in NC (amount adjusts annually)',
      'Proven trial experience with complex medical cases',
      'Results-based fee structure',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      {/* Common Types of Malpractice */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">2025 Medical Malpractice Statistics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-red-400 mb-2">251,000+</div>
            <div className="text-lg text-white mb-2">Deaths Annually</div>
            <p className="text-gray-400 text-sm">Medical errors are the 3rd leading cause of death in the U.S.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-yellow-400 mb-2">Billions</div>
            <div className="text-lg text-white mb-2">Annual Payouts</div>
            <p className="text-gray-400 text-sm">Total medical malpractice settlements and verdicts in 2024</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-green-400 mb-2">29.7%</div>
            <div className="text-lg text-white mb-2">Diagnosis Errors</div>
            <p className="text-gray-400 text-sm">Most common type of medical malpractice claim</p>
          </div>
        </div>
      </section>

      {/* NC Damage Caps */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">North Carolina Damage Caps (2025)</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Non-Economic Damages Cap</h3>
              <div className="text-3xl font-bold text-secondary mb-2">Substantial Cap</div>
              <p className="text-gray-300 text-sm">Maximum for pain, suffering, and emotional distress (adjusted annually for inflation based on state guidelines)</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">No Caps On:</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Medical expenses (past and future)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Lost wages and earning capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Disfigurement or permanent injury</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Signs You May Have a Malpractice Case</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">🚨 Red Flags</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Unexpected surgical complications</li>
              <li>• Condition worsened after treatment</li>
              <li>• Different diagnosis from second opinion</li>
              <li>• Medication caused severe reaction</li>
              <li>• Informed consent not obtained</li>
              <li>• Medical records altered or missing</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">✅ Strong Case Indicators</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Clear violation of medical standards</li>
              <li>• Significant permanent injury</li>
              <li>• Multiple medical professionals agree</li>
              <li>• Well-documented medical records</li>
              <li>• Economic damages are substantial</li>
              <li>• Hospital incident reports filed</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Medical Malpractice"
      subtitle="Fighting for Victims of Medical Negligence"
      description="When medical professionals fail in their duty of care, we hold them accountable. Our experienced medical malpractice attorneys have recovered millions for victims of hospital errors, surgical mistakes, and misdiagnosis."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
