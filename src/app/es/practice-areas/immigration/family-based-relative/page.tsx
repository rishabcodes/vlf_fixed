import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Family Inmigración Abogado NC | Reunite Families Fast | Vasquez Law Firm',
  description:
    'Expert family-based immigration attorneys in NC. Spouse visas, parent petitions, child immigration. 96% approval rate. Same-day consultations. Call 1-844-YO-PELEO',
  keywords:
    'family immigration lawyer, family-based immigration, spouse visa, parent petition, child immigration, I-130 petition, immediate relative, family preference visa, NC immigration attorney',
  openGraph: {
    title: 'Family Inmigración Abogados | Reuniting Families - Vasquez Law Firm',
    description:
      'Expert family-based immigration attorneys with 96% approval rate. Free consultation.',
    images: [{ url: '/images/family-immigration-hero.jpg' }],
  },
};

export default function FamilyBasedInmigraciónPage() {
  const services = [
    {
      title: 'Immediate Relative Petitions',
      description:
        'Fast-track immigration for spouses, parents, and unmarried children under 21 of U.S. citizens with no waiting period',
      icon: '💑',
    },
    {
      title: 'Family Preference Categories',
      description:
        'Expert guidance through F1-F4 preference categories for adult children, siblings, and families of green card holders',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      title: 'Spouse & Fiancé Visas',
      description:
        'CR-1, IR-1, K-1, and K-3 visas for foreign spouses and fiancés with expedited processing strategies',
      icon: '💍',
    },
    {
      title: 'Child Inmigración',
      description:
        'Comprehensive services for biological, adopted, and stepchildren including CSPA age-out protection',
      icon: '👶',
    },
    {
      title: 'Parent Inmigración',
      description:
        'IR-5 immediate relative petitions for parents of U.S. citizens over 21 years old',
      icon: '👵',
    },
    {
      title: 'Adjustment of Status',
      description:
        'Green card applications for family members already in the U.S. with work permit assistance',
      icon: '📋',
    },
    {
      title: 'Consular Processing',
      description:
        'Expert guidance through embassy interviews and document preparation for relatives abroad',
      icon: '🏛️',
    },
    {
      title: 'Priority Date Monitoring',
      description:
        'Active tracking of visa bulletin changes and strategic filing to maximize approval speed',
      icon: '⏰',
    },
    {
      title: 'Waiver Applications',
      description:
        'I-601 and I-601A waivers for inadmissibility issues including unlawful presence',
      icon: '🛡️',
    },
  ];

  const faqs = [
    {
      question: 'How long does family-based immigration take?',
      answer:
        'Processing times vary significantly. Immediate relatives (spouses, parents, unmarried children under 21 of U.S. citizens) have no waiting period and typically complete the process in 8-14 months. Family preference categories can take 2-20+ years depending on the relationship and country of birth.',
    },
    {
      question: 'Can I work while my family petition is pending?',
      answer:
        "If you're in the U.S. and eligible to adjust status, you can apply for employment authorization (EAD) after filing Form I-485. Work permits are typically approved within 90 days.",
    },
    {
      question: 'What if my family member entered illegally?',
      answer:
        "Immediate relatives who entered without inspection may still adjust status if they're married to a U.S. citizen. Others may need to apply for waivers or consular process with an I-601A provisional waiver.",
    },
    {
      question: 'Can I petition for my same-sex spouse?',
      answer:
        'Yes, since 2013, same-sex marriages are fully recognized for immigration purposes. We help LGBTQ+ couples navigate the family immigration process with sensitivity and expertise.',
    },
    {
      question: 'What documents are needed for family petitions?',
      answer:
        'Essential documents include proof of relationship (marriage/birth certificates), proof of U.S. citizenship or permanent residence, financial support documents (I-864), and supporting evidence of bona fide relationships.',
    },
    {
      question: 'Can stepchildren immigrate through marriage?',
      answer:
        'Yes, stepchildren can immigrate if the marriage creating the relationship occurred before the child turned 18. The process is the same as for biological children.',
    },
  ];

  const content = {
    introduction: `Family separation is one of the most heartbreaking consequences of immigration challenges. At Vasquez Law Firm, we understand the urgency of reuniting families and work tirelessly to help U.S. citizens and permanent residents bring their loved ones to the United States. Our experienced family immigration attorneys have successfully reunited over 5,000 families through the family-based immigration process.`,

    processTitle: 'Our Family Inmigración Process',
    process: [
      {
        step: '1',
        title: 'Determine Eligibility',
        description: 'We assess your relationship and identify the fastest path to reunification',
      },
      {
        step: '2',
        title: 'File I-130 Petition',
        description: 'We prepare and submit a comprehensive petition package to USCIS',
      },
      {
        step: '3',
        title: 'Priority Date Monitoring',
        description: 'We actively track visa bulletin movements and notify you of progress',
      },
      {
        step: '4',
        title: 'Adjustment or Consular Processing',
        description: 'We guide you through green card application either in the U.S. or abroad',
      },
      {
        step: '5',
        title: 'Interview Preparation & Approval',
        description: 'We prepare you thoroughly and attend interviews when permitted',
      },
    ],

    urgencyTitle: "Don't Wait - File Your Family Petition Today",
    urgencyMessage:
      'Processing times continue to increase. The sooner you file your family petition, the sooner your loved ones can join you. Priority dates matter - every day counts.',

    successStats: [
      { number: '5,000+', label: 'Families Reunited' },
      { number: '96%', label: 'Approval Rate' },
      { number: '8-14', label: 'Months Average for Immediate Relatives' },
      { number: '24/7', label: 'Emergency Support' },
    ],

    whyChooseTitle: 'Why Choose Our Family Inmigración Team?',
    whyChoosePoints: [
      'Former immigration officers on staff who know the system',
      'Bilingual team providing services in English and Spanish',
      'Priority date tracking and strategic filing',
      'Embassy interview preparation and support',
      'Waiver expertise for complex cases',
      'Same-day emergency consultations available',
    ],

    categoriesTitle: 'Family-Based Inmigración Categories',
    categories: [
      {
        title: 'Immediate Relatives',
        description: 'Spouses, unmarried children under 21, and parents of U.S. citizens',
        waitTime: 'No waiting period',
        priority: 'Highest Priority',
      },
      {
        title: 'First Preference (F1)',
        description: 'Unmarried adult children of U.S. citizens',
        waitTime: 'Several years',
        priority: 'First Preference',
      },
      {
        title: 'Second Preference (F2)',
        description: 'Spouses and children of green card holders',
        waitTime: '2-3 years',
        priority: 'Second Preference',
      },
      {
        title: 'Third & Fourth Preference',
        description: 'Married children and siblings of U.S. citizens',
        waitTime: '10+ years',
        priority: 'Lower Priority',
      },
    ],
  };

  return (
    <ModernPracticeAreaTemplate
      title="Family-Based Inmigración Abogados"
      subtitle="Reuniting Families Through Expert Legal Guidance"
      services={services}
      faqs={faqs}
      content={content}
    />
  );
}
