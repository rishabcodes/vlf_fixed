import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Occupational Disease & Illness Attorney | Workers Comp | Vasquez Law Firm',
  description: 'Occupational disease from toxic exposure, repetitive work, or hazardous conditions. Get workers comp benefits. NC and FL.',
  keywords: 'occupational disease, occupational illness, toxic exposure, workers compensation, asbestos',
};

export default function OccupationalIllnessPage() {
  const services = [
    {
      title: 'Respiratory Diseases',
      description: 'Lung diseases from workplace exposures',
      icon: '🪬',
      features: [
        'Asbestosis and mesothelioma',
        'Silicosis from dust',
        'Chemical pneumonitis',
        'Occupational asthma',
        'COPD from fumes',
        'Black lung disease',
      ],
    },
    {
      title: 'Toxic Exposure',
      description: 'Illness from hazardous chemical contact',
      icon: '☢️',
      features: [
        'Lead poisoning',
        'Mercury exposure',
        'Benzene-related cancers',
        'Pesticide poisoning',
        'Solvent exposure',
        'Heavy metal toxicity',
      ],
    },
    {
      title: 'Cancers',
      description: 'Work-related cancer claims',
      icon: '🌀',
      features: [
        'Mesothelioma (asbestos)',
        'Lung cancer',
        'Bladder cancer',
        'Leukemia',
        'Skin cancer',
        'First responder cancers',
      ],
    },
    {
      title: 'Hearing Loss',
      description: 'Noise-induced hearing damage',
      icon: '👂',
      features: [
        'Industrial deafness',
        'Tinnitus claims',
        'Acoustic trauma',
        'Gradual hearing loss',
        'Hearing aid coverage',
        'Disability ratings',
      ],
    },
    {
      title: 'Skin Conditions',
      description: 'Dermatitis and skin diseases from work',
      icon: '🤘',
      features: [
        'Contact dermatitis',
        'Chemical burns',
        'Latex allergies',
        'Oil acne',
        'Chrome ulcers',
        'Radiation dermatitis',
      ],
    },
    {
      title: 'Infectious Diseases',
      description: 'Workplace-acquired infections',
      icon: '🧪',
      features: [
        'COVID-19 claims',
        'Hepatitis B/C',
        'Tuberculosis',
        'MRSA infections',
        'Healthcare worker exposures',
        'Bloodborne pathogens',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I prove an occupational disease is work-related?',
      answer: 'You need medical evidence linking your disease to workplace exposures. This includes exposure history, medical diagnosis, expert testimony, and often epidemiological studies showing increased risk in your occupation. Industrial hygiene testing and coworker cases strengthen claims.',
    },
    {
      question: 'What\'s the time limit for occupational disease claims?',
      answer: 'Complex timing rules apply. Generally, you have 2 years from when you knew or should have known the disease was work-related. For progressive diseases like asbestosis, the clock starts when you\'re disabled or diagnosed. Don\'t delay - evidence disappears.',
    },
    {
      question: 'Can I file a claim years after leaving the job?',
      answer: 'Yes! Many occupational diseases have long latency periods. Asbestos-related cancers may appear 20-40 years after exposure. The key is proving exposure during employment and that the disease resulted from that exposure.',
    },
    {
      question: 'What if multiple employers exposed me to hazards?',
      answer: 'All responsible employers/insurers may share liability. The last employer where injurious exposure occurred often bears primary responsibility. We identify all sources of exposure to maximize your recovery.',
    },
    {
      question: 'Are first responder cancers covered?',
      answer: 'Many states including Florida provide cancer presumptions for firefighters. Certain cancers are presumed work-related if you meet service requirements. North Carolina is expanding protections. We stay current on evolving laws.',
    },
    {
      question: 'What compensation is available for occupational disease?',
      answer: 'Full medical treatment, temporary disability during treatment, permanent disability ratings, death benefits for families. Some diseases like mesothelioma may also have third-party claims against manufacturers worth millions.',
    },
  ];

  const content = {
    introduction: `Occupational diseases develop slowly from workplace exposures but can be devastating. From asbestos-related cancers to chemical poisoning, these illnesses rob workers of their health and livelihood. Our attorneys understand the complex medical and legal issues in occupational disease claims. We fight to prove causation, overcome statute of limitations defenses, and secure maximum benefits for you and your family.`,

    processTitle: 'Occupational Disease Claim Process',
    process: [
      {
        step: '1',
        title: 'Exposure Documentation',
        description: 'Identify all hazardous exposures and employers',
      },
      {
        step: '2',
        title: 'Medical Diagnosis',
        description: 'Obtain specialist diagnosis linking to work',
      },
      {
        step: '3',
        title: 'Expert Support',
        description: 'Industrial hygienist and medical expert opinions',
      },
      {
        step: '4',
        title: 'Claim Filing',
        description: 'Submit comprehensive claim with evidence',
      },
      {
        step: '5',
        title: 'Litigation',
        description: 'Fight denials through hearings and appeals',
      },
    ],

    urgencyTitle: '⏰ Don\'t Wait - Evidence Disappears',
    urgencyMessage: 'Companies close, records vanish, witnesses scatter. The sooner we investigate your exposures, the stronger your claim. Contact us immediately after diagnosis.',

    whyChooseTitle: 'Why Choose Vasquez Law for Occupational Disease',
    whyChoosePoints: [
      'Decades of toxic exposure case experience',
      'Network of occupational medicine specialists',
      'Industrial hygienist partnerships',
      'Understanding of disease latency periods',
      'Success with difficult causation cases',
      'Multiple employer/insurer claims',
      'Third-party toxic tort experience',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Occupational Diseases by Industry</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Construction</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Asbestos diseases</li>
              <li>• Silicosis</li>
              <li>• Lead poisoning</li>
              <li>• Hearing loss</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Healthcare</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Infectious diseases</li>
              <li>• Latex allergies</li>
              <li>• Radiation exposure</li>
              <li>• Chemotherapy drugs</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Manufacturing</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Chemical exposures</li>
              <li>• Repetitive strain</li>
              <li>• Respiratory diseases</li>
              <li>• Skin conditions</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Exposure Limits & Your Rights</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <p className="text-gray-300 mb-6">
            OSHA sets Permissible Exposure Limits (PELs) for hazardous substances. Exceeding these limits strengthens your claim:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-3">Common PEL Violations</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Asbestos: 0.1 fiber/cc (8-hour)</li>
                <li>• Silica: 50 μg/m³</li>
                <li>• Lead: 50 μg/m³</li>
                <li>• Benzene: 1 ppm</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-3">Your Rights</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Request exposure records</li>
                <li>• Medical surveillance</li>
                <li>• Proper PPE provision</li>
                <li>• Hazard communication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Occupational Disease & Illness"
      subtitle="Workers Comp for Work-Related Diseases"
      description="Years of workplace exposure shouldn\'t cost you your health. Our attorneys prove occupational disease claims and fight for your right to treatment and compensation."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
