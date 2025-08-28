import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VAWA Immigration Attorney NC & FL | Violence Against Women Act | Vasquez Law',
  description: 'VAWA self-petition for abuse victims. Green card without abuser knowledge. Confidential immigration relief.',
  keywords: 'VAWA attorney, violence against women act, abuse victim immigration, VAWA self-petition',
};

export default function VAWAViolenceAgainstWomenActPage() {
  const services = [
    {
      title: 'VAWA Self-Petition',
      description: 'Independent immigration path for abuse victims',
      icon: '🛡️',
      features: [
        'Spouse abuse cases',
        'Parent abuse cases',
        'Child abuse cases',
        'No abuser notification',
        'Work authorization included',
        'Path to green card',
      ],
    },
    {
      title: 'Eligible Relationships',
      description: 'Who can file under VAWA',
      icon: '👥',
      features: [
        'Abused spouses of citizens/LPRs',
        'Abused children of citizens/LPRs',
        'Abused parents of adult citizens',
        'Divorced spouses (2-year window)',
        'Widowed spouses',
        'Children of abused parents',
      ],
    },
    {
      title: 'Evidence Development',
      description: 'Building strong VAWA cases',
      icon: '📋',
      features: [
        'Police reports',
        'Protection orders',
        'Medical records',
        'Psychological evaluations',
        'Witness affidavits',
        'Photos and documentation',
      ],
    },
    {
      title: 'Confidentiality Protection',
      description: 'Your safety is paramount',
      icon: '🔒',
      features: [
        'Abuser not notified',
        'Address confidentiality',
        'Protected information',
        'Safe case handling',
        'Secure communications',
        'Privacy throughout process',
      ],
    },
    {
      title: 'Additional Benefits',
      description: 'Beyond immigration status',
      icon: '✨',
      features: [
        'Derivative children included',
        'Public benefits access',
        'Crime victim services',
        'Housing assistance',
        'Counseling resources',
        'Educational opportunities',
      ],
    },
    {
      title: 'Inadmissibility Waivers',
      description: 'Overcoming immigration barriers',
      icon: '🚪',
      features: [
        'Unlawful presence waiver',
        'Criminal issue waivers',
        'Misrepresentation forgiveness',
        'Prior removal waivers',
        'Good moral character',
        'Extreme hardship arguments',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What types of abuse qualify for VAWA?',
      answer: 'Physical violence, sexual abuse, emotional/psychological abuse, economic control, threats, intimidation, isolation, and coercive control all qualify. You don\'t need police reports or physical injuries. Pattern of abuse and power/control dynamics are key.',
    },
    {
      question: 'Will my abuser find out about my VAWA application?',
      answer: 'No! VAWA has strict confidentiality protections. USCIS cannot share information with your abuser. They won\'t be notified of your application. Your address stays confidential. This protection continues even after approval.',
    },
    {
      question: 'Can I file VAWA if I\'m divorced?',
      answer: 'Yes, if divorced within 2 years of filing AND can show divorce was connected to abuse. Also eligible if abuser lost citizenship/LPR status due to domestic violence incident. Marriage must have been entered in good faith.',
    },
    {
      question: 'What if I don\'t have police reports?',
      answer: 'Police reports help but aren\'t required. We use: your detailed declaration, counseling records, medical records, friend/family affidavits, photos, text messages, emails, shelter records. Any evidence showing abuse pattern works.',
    },
    {
      question: 'Can men file under VAWA?',
      answer: 'Absolutely! Despite the name, VAWA protects all genders. Men, women, and non-binary individuals can file. Sexual orientation doesn\'t matter. The law protects all abuse victims regardless of gender identity.',
    },
    {
      question: 'How long does VAWA take?',
      answer: 'Currently 16-24 months for initial decision (prima facie determination comes sooner for benefits). Work authorization available during wait. Green card process follows approval. We expedite when possible for safety reasons.',
    },
  ];

  const content = {
    introduction: `The Violence Against Women Act (VAWA) provides a lifeline for immigrant abuse victims trapped by their immigration status. You can petition for yourself without your abuser\'s knowledge, breaking free from control while securing your legal status. This confidential process protects victims of domestic violence, regardless of gender, offering hope and independence.`,

    processTitle: 'VAWA Self-Petition Process',
    process: [
      {
        step: '1',
        title: 'Confidential Consultation',
        description: 'Safe assessment of your case',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Build strong documentation',
      },
      {
        step: '3',
        title: 'I-360 Filing',
        description: 'Submit self-petition to USCIS',
      },
      {
        step: '4',
        title: 'Prima Facie',
        description: 'Initial determination for benefits',
      },
      {
        step: '5',
        title: 'Green Card Process',
        description: 'Adjustment or consular processing',
      },
    ],

    urgencyTitle: '🚨 Your Safety Comes First',
    urgencyMessage: 'If you\'re in immediate danger, call 911 or the National Domestic Violence Hotline: 1-800-799-7233. VAWA provides immigration relief, but your safety is paramount.',

    whyChooseTitle: 'Why Choose Vasquez Law for VAWA',
    whyChoosePoints: [
      'Trauma-informed approach',
      'Complete confidentiality',
      'Compassionate representation',
      'High VAWA approval rate',
      'Bilingual support',
      'Connection to support services',
      'Payment plans available',
      'Multiple safe office locations',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">VAWA Eligibility Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">You Must Show</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Qualifying relationship to abuser</li>
              <li>✓ Abuser is US citizen or LPR</li>
              <li>✓ Suffered battery or extreme cruelty</li>
              <li>✓ Lived with abuser at some point</li>
              <li>✓ Good moral character</li>
              <li>✓ Good faith marriage (if spouse)</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">You Don\'t Need</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Current relationship with abuser</li>
              <li>✓ Police reports or arrests</li>
              <li>✓ Physical injury proof</li>
              <li>✓ Abuser\'s cooperation</li>
              <li>✓ Legal immigration status</li>
              <li>✓ To remain married</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Abuse Covered</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Physical Abuse</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Hitting, slapping, pushing</li>
                <li>• Choking or restraining</li>
                <li>• Throwing objects</li>
                <li>• Denying medical care</li>
                <li>• Forced substance use</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Emotional Abuse</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Constant criticism</li>
                <li>• Threats of deportation</li>
                <li>• Isolation from family</li>
                <li>• Destroying documents</li>
                <li>• Humiliation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Economic Abuse</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Preventing work</li>
                <li>• Stealing wages</li>
                <li>• Destroying property</li>
                <li>• Denying basic needs</li>
                <li>• Financial control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">VAWA Timeline & Benefits</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Filing (Day 1)</h3>
                <p className="text-gray-300 text-sm">Protected from deportation, case confidential</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Prima Facie (3-6 months)</h3>
                <p className="text-gray-300 text-sm">Access to public benefits and services</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Approval (16-24 months)</h3>
                <p className="text-gray-300 text-sm">Deferred action and work authorization</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <div>
                <h3 className="font-bold text-white">Green Card Eligible</h3>
                <p className="text-gray-300 text-sm">Apply immediately after approval</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="VAWA Self-Petition"
      subtitle="Breaking Free Through Immigration Relief"
      description="Confidential immigration protection for abuse victims. No abuser cooperation needed. Your path to safety and legal status."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
