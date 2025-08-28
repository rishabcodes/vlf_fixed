import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adoption Attorney Raleigh NC | Charlotte Adoption Lawyer | Family Law Orlando FL',
  description: 'Experienced adoption attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. Stepparent, relative, private adoptions. Home studies, finalization. 919-569-5882',
  keywords: 'adoption attorney Raleigh NC, adoption lawyer Charlotte, stepparent adoption Smithfield, Orlando adoption attorney, private adoption NC, foster care adoption, international adoption lawyer, adult adoption attorney, relative adoption Wake County, adoption home study NC',
  openGraph: {
    title: 'Adoption Attorney | NC & FL Family Law | Vasquez Law Firm',
    description: 'Compassionate adoption lawyers guiding families through every step. Stepparent, private, foster adoptions.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function AdoptionPage() {
  const services = [
    {
      title: 'Stepparent Adoption',
      description: 'Most common adoption type',
      icon: '👨‍👩‍👧',
      features: [
        'Spouse adopts stepchild',
        'Consent or termination required',
        'Home study often waived',
        'Name change included',
        'New birth certificate issued',
        'Inheritance rights established',
      ],
    },
    {
      title: 'Relative/Kinship Adoption',
      description: 'Grandparents, aunts, uncles',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Grandparent adoptions common',
        'Sibling adoption cases',
        'Aunt/uncle placements',
        'Simplified procedures NC',
        'Maintains family connections',
        'Subsidy may be available',
      ],
    },
    {
      title: 'Private/Independent Adoption',
      description: 'Direct placement adoptions',
      icon: '👶',
      features: [
        'Birth parent selection',
        'Attorney matching services',
        'Open adoption agreements',
        'Interstate compact ICPC',
        'Birth parent counseling',
        'Post-placement supervision',
      ],
    },
    {
      title: 'Foster Care Adoption',
      description: 'DSS/DCF involved cases',
      icon: '🏠',
      features: [
        'Foster-to-adopt programs',
        'Special needs adoptions',
        'Adoption assistance available',
        'Sibling group placements',
        'Post-adoption support',
        'Federal tax credits apply',
      ],
    },
    {
      title: 'Adult Adoption',
      description: 'Adopting adults 18+',
      icon: '👨‍⚖️',
      features: [
        'Stepchild formalization',
        'Inheritance purposes',
        'No home study required',
        'Simpler court process',
        'Name change options',
        'Establishes legal relationship',
      ],
    },
    {
      title: 'Interstate & International',
      description: 'Cross-border adoptions',
      icon: '✈️',
      features: [
        'ICPC compliance NC-FL',
        'Hague Convention countries',
        'Immigration processing',
        'Foreign decree recognition',
        'Re-adoption in NC/FL',
        'Citizenship assistance',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does adoption take in North Carolina and Florida?',
      answer: 'Timeline varies by type. Stepparent adoption: 2-4 months if consent given, 6-9 months if contested. Private adoption: 6-12 months including waiting period. Foster adoption: 6-18 months after TPR. Adult adoption: 1-2 months. Wake County and Mecklenburg County process faster than rural counties. Orlando typically 3-6 months. Interstate adoptions add 2-3 months for ICPC approval.',
    },
    {
      question: 'What are adoption costs in Raleigh, Charlotte, and Orlando?',
      answer: 'Costs vary significantly based on adoption type and complexity. Stepparent and relative adoptions are generally the most affordable options. Private infant adoptions involve more comprehensive expenses including agency coordination and birth parent support. Foster care adoptions often have minimal costs as the state provides assistance. International adoptions require additional documentation and travel expenses. Federal tax credits help offset adoption expenses. NC and FL offer adoption assistance programs for special needs children. Payment plans available to make adoption accessible for all families.',
    },
    {
      question: 'Do birth parents have rights after adoption in NC and FL?',
      answer: 'After finalization, birth parents have no legal rights - adoption is permanent and irrevocable. NC: Birth parents can consent after baby is born, revocation period varies. FL: 48-hour wait after birth, consent irrevocable once signed. Open adoptions allow agreed contact but not enforceable in court. Birth fathers must be notified/consent unless rights terminated. Indian Child Welfare Act provides additional protections.',
    },
    {
      question: 'What is required for a home study in North Carolina?',
      answer: 'NC home studies required for non-relative adoptions. Process includes: criminal background checks (FBI, SBI, child abuse registry), financial verification, medical exams, home safety inspection, references (3-5 non-relatives), autobiographies, parenting classes. Takes 2-4 months, costs vary by agency and location. Valid 1 year, update needed if expired. Stepparent adoptions often exempt. Wake and Mecklenburg Counties have approved agencies list.',
    },
    {
      question: 'Can same-sex couples adopt in North Carolina and Florida?',
      answer: 'Yes, absolutely. Same-sex couples have full adoption rights in both NC and FL since 2015 Supreme Court ruling. Joint adoption, second-parent adoption, stepparent adoption all available. No discrimination allowed by agencies receiving public funds. Some private religious agencies may refer elsewhere. We work with LGBTQ+ families throughout Raleigh, Charlotte, and Orlando ensuring equal treatment.',
    },
    {
      question: 'What if biological parent won\'t consent to stepparent adoption?',
      answer: 'Can proceed without consent if grounds exist. NC grounds: abandonment (6 months no contact/support), failure to support, failure to establish paternity. FL similar plus abuse/neglect. Must prove by clear and convincing evidence. Court terminates parental rights first, then grants adoption. Process takes 6-12 months. Strategic filing in Wake or Mecklenburg Counties may be advantageous.',
    },
  ];

  const content = {
    introduction: `Adoption creates forever families, transforming lives through the legal process of establishing permanent parent-child relationships. Whether you're a stepparent seeking to formalize your bond, relatives providing permanency for a child in need, or hopeful parents pursuing private or international adoption, our compassionate attorneys guide you through every step. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we understand the adoption laws, procedures, and courts in both North Carolina and Florida. From home studies to finalization hearings, we make the adoption journey as smooth as possible while protecting your growing family's interests.`,

    processTitle: 'Adoption Process Steps',
    process: [
      {
        step: '1',
        title: 'Initial Consultation',
        description: 'Determine adoption type and requirements',
      },
      {
        step: '2',
        title: 'Home Study/Preparation',
        description: 'Complete assessments and documentation',
      },
      {
        step: '3',
        title: 'Petition Filing',
        description: 'Submit adoption petition to court',
      },
      {
        step: '4',
        title: 'Consent/Termination',
        description: 'Obtain necessary legal clearances',
      },
      {
        step: '5',
        title: 'Finalization Hearing',
        description: 'Court approval and celebration',
      },
    ],

    urgencyTitle: '💝 Start Your Adoption Journey Today',
    urgencyMessage: 'Children need permanency now. Birth parent consents time-sensitive. Tax credits have deadlines. Home studies expire.',

    whyChooseTitle: 'Why Choose Vasquez Law for Adoption',
    whyChoosePoints: [
      '500+ successful adoptions completed',
      'Licensed in both NC and FL',
      'ICPC interstate expertise',
      'Birth parent counseling network',
      'Same-day document preparation',
      'Bilingual services - Se habla español',
      'Payment plans for all adoption types',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Adoption Types & Requirements Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Adoption Type</th>
                <th className="py-3 px-4">Home Study</th>
                <th className="py-3 px-4">Consent Needed</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Complexity Level</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Stepparent</td>
                <td className="py-3 px-4">Usually No</td>
                <td className="py-3 px-4">Other parent</td>
                <td className="py-3 px-4">2-6 months</td>
                <td className="py-3 px-4">Low</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Relative</td>
                <td className="py-3 px-4">Sometimes</td>
                <td className="py-3 px-4">Both parents</td>
                <td className="py-3 px-4">3-6 months</td>
                <td className="py-3 px-4">Low-Moderate</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Private Infant</td>
                <td className="py-3 px-4">Always</td>
                <td className="py-3 px-4">Birth parents</td>
                <td className="py-3 px-4">6-24 months</td>
                <td className="py-3 px-4">High</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Foster Care</td>
                <td className="py-3 px-4">Always</td>
                <td className="py-3 px-4">TPR complete</td>
                <td className="py-3 px-4">6-18 months</td>
                <td className="py-3 px-4">Moderate</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Adult</td>
                <td className="py-3 px-4">Never</td>
                <td className="py-3 px-4">Adult only</td>
                <td className="py-3 px-4">1-2 months</td>
                <td className="py-3 px-4">Very Low</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">International</td>
                <td className="py-3 px-4">Always</td>
                <td className="py-3 px-4">Foreign court</td>
                <td className="py-3 px-4">1-3 years</td>
                <td className="py-3 px-4">Very High</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">County-Specific Adoption Courts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">North Carolina Courts</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-bold">Wake County (Raleigh)</h4>
                <ul className="text-gray-300 text-sm">
                  <li>📍 Family Court: 316 Fayetteville St</li>
                  <li>📞 Adoptions Clerk: 919-792-4000</li>
                  <li>⏰ Hearings: Tuesday/Thursday mornings</li>
                  <li>📋 Special proceedings division</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold">Mecklenburg (Charlotte)</h4>
                <ul className="text-gray-300 text-sm">
                  <li>📍 Family Court: 832 E 4th St</li>
                  <li>📞 Clerk: 704-686-0400</li>
                  <li>⏰ Adoption calendar Fridays</li>
                  <li>🎉 Adoption Day events November</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold">Johnston (Smithfield)</h4>
                <ul className="text-gray-300 text-sm">
                  <li>📍 207 E Johnston Street</li>
                  <li>📞 919-989-5160</li>
                  <li>⏰ By appointment</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Florida Courts</h3>
            <div>
              <h4 className="text-white font-bold">Orange County (Orlando)</h4>
              <ul className="text-gray-300 text-sm">
                <li>📍 Family Division: 425 N Orange Ave</li>
                <li>📞 407-836-2000</li>
                <li>⏰ Adoption hearings Wednesdays</li>
                <li>🎊 National Adoption Day celebrations</li>
                <li>📹 Virtual hearings available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Adoption Financial Assistance & Tax Benefits</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-green-400 mb-4">Available Financial Help (2025)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Federal Benefits</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>💰 Tax Credit: Significant federal credit per child</li>
                <li>💰 Employer benefits: Many companies offer adoption assistance</li>
                <li>💰 Military: Special adoption benefits available</li>
                <li>💰 FMLA: Job-protected leave</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">State Assistance</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>🏥 NC: Medicaid for special needs</li>
                <li>🏥 FL: Adoption subsidy program</li>
                <li>🏥 Monthly assistance: Based on child's needs</li>
                <li>🏥 College tuition waivers</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">💡 Most families qualify for some financial assistance - we help you maximize benefits</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Birth Parent Rights & Consent Process</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Critical Consent Requirements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">North Carolina</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Birth mother: Anytime after birth</li>
                <li>• Revocation: 7 days after signing</li>
                <li>• Birth father: Must establish paternity</li>
                <li>• Unknown father: Publication required</li>
                <li>• Direct placement allowed</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Florida</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Birth mother: 48 hours after birth</li>
                <li>• Revocation: Consent irrevocable</li>
                <li>• Birth father: Registry check required</li>
                <li>• Counseling: 28 days before signing</li>
                <li>• Living expenses allowed</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ Improper consent = adoption reversal risk. Always use experienced adoption attorney.</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Adoption Attorney NC & FL"
      subtitle="Building Forever Families Through Legal Adoption"
      description="Compassionate adoption lawyers in Raleigh, Charlotte, Smithfield & Orlando. All adoption types handled with care."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
