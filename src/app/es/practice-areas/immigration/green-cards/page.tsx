import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Green Card Abogados North Carolina | Permanent Residence - Vasquez Law Firm',
  description:
    'Expert green card attorneys in NC. Family-based, employment-based permanent residence. Marriage green cards, adjustment of status. Free consultation. Call 1-844-YO-PELEO',
  keywords:
    'green card lawyer, permanent residence attorney, marriage green card, employment green card, adjustment of status, I-485, consular processing, NC immigration lawyer',
  openGraph: {
    title: 'Green Card Abogados North Carolina | Permanent Residence - Vasquez Law Firm',
    description:
      'Expert green card attorneys in NC. Family-based, employment-based permanent residence. Marriage green cards, adjustment of status. Free consultation. Call 1-844-YO-PELEO',
    images: [
      {
        url: '../wp-content/uploads/2024/04/charlotte-nc-immigration-attorneys.jpg',
      },
    ],
  },
};

export default function GreenCardsPage() {
  const services = [
    {
      title: 'Marriage-Based Green Cards',
      description:
        'Fast-track permanent residence for spouses of U.S. citizens and permanent residents with expert guidance through the entire process',
      icon: '💒',
    },
    {
      title: 'Family-Based Green Cards',
      description:
        'Reunite with parents, children, and siblings through immediate relative and family preference categories',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      title: 'Employment-Based Green Cards',
      description:
        'EB-1, EB-2, EB-3 categories for workers, professionals, and individuals with extraordinary abilities',
      icon: '💼',
    },
    {
      title: 'Adjustment of Status',
      description:
        'Apply for your green card without leaving the U.S. with concurrent work permit and travel authorization',
      icon: '📋',
    },
    {
      title: 'Consular Processing',
      description:
        'Expert guidance through embassy interviews for applicants processing green cards from abroad',
      icon: '🏛️',
    },
    {
      title: 'Humanitarian Green Cards',
      description:
        'Permanent residence through asylum, refugee status, U-visa, VAWA, and other humanitarian programs',
      icon: '🛡️',
    },
    {
      title: 'National Interest Waiver',
      description:
        'Self-petition for highly qualified professionals without employer sponsorship through NIW',
      icon: '🌟',
    },
    {
      title: 'Green Card Renewal',
      description:
        'Replace lost, stolen, or expired green cards and remove conditions on residence',
      icon: '🔄',
    },
    {
      title: 'Priority Date Strategy',
      description:
        'Strategic filing and priority date retention to minimize wait times and maximize approval chances',
      icon: '⏰',
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to get a green card?',
      answer:
        'Processing times vary by category. Marriage-based cases for U.S. citizen spouses typically take 8-14 months. Family preference categories can take several years due to numerical limitations and country quotas.',
    },
    {
      question: 'Can I work while my green card application is pending?',
      answer:
        "If you're adjusting status from within the U.S., you can apply for work authorization (EAD) which typically allows you to work while your case is pending.",
    },
    {
      question: 'What happens if my green card application is denied?',
      answer:
        'Depending on your current status, you may face removal proceedings. We can help appeal the decision, file a motion to reopen, or explore alternative options.',
    },
    {
      question: 'Do I need to take an English test for a green card?',
      answer:
        "Generally no, but some categories may require basic English proficiency. Marriage-based applicants typically don't need to demonstrate English skills.",
    },
    {
      question: 'Can I travel while my green card is pending?',
      answer:
        "Yes, if you're adjusting status in the U.S., you can apply for advance parole (travel document) to travel internationally without abandoning your application.",
    },
    {
      question: "What's the difference between conditional and permanent green cards?",
      answer:
        'Marriage-based green cards issued within 2 years of marriage are conditional (2-year validity). You must file I-751 to remove conditions and get a 10-year card.',
    },
  ];

  const content = {
    introduction: `A green card provides you with permanent residence in the United States, opening doors to work opportunities, social benefits, and eventually U.S. citizenship. Our experienced immigration attorneys guide you through every step of the complex green card process. Whether you're seeking a green card through family, employment, or humanitarian protection, we have the knowledge and experience to help you succeed. We've helped thousands of clients obtain permanent residence and build new lives in America.`,

    processTitle: 'Green Card Process Steps',
    process: [
      {
        step: '1',
        title: 'Initial Consultation',
        description: 'We evaluate your case and determine the best path to permanent residence',
      },
      {
        step: '2',
        title: 'Petition Filing',
        description: 'We prepare and file all necessary forms and supporting documentation',
      },
      {
        step: '3',
        title: 'Priority Date & Waiting',
        description: 'We monitor your priority date and keep you informed of progress',
      },
      {
        step: '4',
        title: 'Adjustment or Consular Processing',
        description: 'We guide you through the final step to obtain your green card',
      },
    ],

    urgencyTitle: 'Ready to Apply for Your Green Card?',
    urgencyMessage:
      "Don't let complex immigration laws stand between you and permanent residence. Contact our experienced green card attorneys today.",

    successStats: [
      { number: '10,000+', label: 'Green Cards Approved' },
      { number: '98%', label: 'Success Rate' },
      { number: '8-14', label: 'Months Average Processing' },
      { number: '24/7', label: 'Client Support' },
    ],

    whyChooseTitle: 'Why Choose Our Green Card Abogados?',
    whyChoosePoints: [
      'Specialized experience in all types of green card applications',
      'High approval rates and successful case outcomes',
      'Bilingual support in English and Spanish',
      'Active case monitoring and priority date tracking',
      'Former immigration officers on staff',
      'Emergency consultation available 24/7',
    ],

    categoriesTitle: 'Types of Green Cards We Handle',
    categories: [
      {
        title: 'Marriage-Based Green Cards',
        description: 'For spouses of U.S. citizens and permanent residents',
        details: [
          'Immediate relative petitions (no waiting period for U.S. citizen spouses)',
          'Family preference category for permanent resident spouses',
          'K-3 visa options for faster processing',
          'Adjustment of status if already in the U.S.',
        ],
      },
      {
        title: 'Family-Based Green Cards',
        description: 'For parents, children, and siblings of U.S. citizens',
        details: [
          'Immediate relatives: parents, spouses, unmarried children under 21',
          'Family preference categories with waiting periods',
          'Derivative benefits for family members',
          'Consular processing for applicants abroad',
        ],
      },
      {
        title: 'Employment-Based Green Cards',
        description: 'For workers with job offers or exceptional abilities',
        details: [
          'EB-1: Priority workers, extraordinary ability',
          'EB-2: Advanced degree professionals, national interest waiver',
          'EB-3: Skilled workers, professionals, other workers',
          'PERM labor certification process',
        ],
      },
      {
        title: 'Humanitarian Green Cards',
        description: 'For asylum seekers, refugees, and crime victims',
        details: [
          'Asylum-based adjustment of status',
          'Refugee adjustments after one year',
          'U-visa to green card transitions',
          'VAWA self-petitions for abuse survivors',
        ],
      },
    ],
  };

  return (
    <ModernPracticeAreaTemplate
      title="Green Card Abogados North Carolina"
      subtitle="Expert Legal Help for Permanent Residence"
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
