import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guardianship Attorney Raleigh NC | Charlotte Guardian Lawyer | Orlando Guardianship',
  description: 'Expert guardianship attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. Minor guardianships, adult incapacity, emergency petitions. 919-569-5882',
  keywords: 'guardianship attorney Raleigh NC, guardian lawyer Charlotte, minor guardianship Smithfield, adult guardianship Orlando FL, incompetent proceedings Wake County, emergency guardian petition, special needs guardianship, kinship guardian NC, guardian ad litem, conservatorship Florida',
  openGraph: {
    title: 'Guardianship Attorney | Minor & Adult Guardian | NC & FL | Vasquez Law',
    description: 'Protecting vulnerable loved ones through guardianship. Emergency petitions, special needs planning, kinship guardianships.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function GuardianshipPage() {
  const services = [
    {
      title: 'Minor Guardianship',
      description: 'Protect children when parents cannot',
      icon: '👶',
      features: [
        'Kinship guardianship priority',
        'Emergency temporary orders',
        'Educational decision authority',
        'Medical consent powers',
        'Financial management',
        'Court supervision requirements',
      ],
    },
    {
      title: 'Adult Guardianship',
      description: 'For incapacitated adults',
      icon: '🧑‍⚕️',
      features: [
        'Competency evaluations',
        'Limited vs general guardian',
        'Healthcare decisions',
        'Residential placement',
        'Financial protection',
        'Annual accountings required',
      ],
    },
    {
      title: 'Emergency Guardianship',
      description: 'Immediate protection needed',
      icon: '🚨',
      features: [
        'Same-day court filing',
        'Temporary restraining orders',
        'Medical emergency authority',
        'Asset freeze capabilities',
        'Elder abuse prevention',
        '30-day emergency period',
      ],
    },
    {
      title: 'Special Needs Planning',
      description: 'Disabled adult children',
      icon: '♿',
      features: [
        'SSI/SSDI preservation',
        'Special needs trusts',
        'ABLE account coordination',
        'Transition at age 18',
        'Educational advocacy',
        'Lifetime care planning',
      ],
    },
    {
      title: 'Guardian Accountability',
      description: 'Court oversight compliance',
      icon: '📊',
      features: [
        'Initial inventory filing',
        'Annual status reports',
        'Financial accountings',
        'Bond requirements',
        'Court approval for sales',
        'Guardian removal defense',
      ],
    },
    {
      title: 'Alternatives to Guardianship',
      description: 'Less restrictive options',
      icon: '🔄',
      features: [
        'Power of attorney drafting',
        'Healthcare proxy creation',
        'Representative payee setup',
        'Supported decision-making',
        'Trust administration',
        'Family agreements',
      ],
    },
  ];

  const faqs = [
    {
      question: 'When is guardianship necessary in North Carolina and Florida?',
      answer: 'Guardianship needed when person cannot make decisions due to minority, incapacity, or disability. NC: Minor guardianship when parents deceased, unfit, or consent. Adult when declared incompetent by clerk of court. FL: Similar but called "guardian" for person, "conservator" for property. Must prove incapacity by clear and convincing evidence. Courts prefer less restrictive alternatives like POA if available. Wake and Orange Counties have guardian ad litem programs for evaluation.',
    },
    {
      question: 'How much does guardianship cost in Raleigh, Charlotte, and Orlando?',
      answer: 'Initial guardianship proceedings: $3,000-7,500 attorney fees plus court costs ($200-400), competency evaluation ($500-2,000), guardian ad litem fees ($1,000-3,000), bond premium if required (1% of estate annually). Ongoing: annual reports ($500-1,500), accountings ($1,000-3,000). Emergency guardianship higher due to urgency. Kinship guardianships for minors may qualify for subsidies. Public guardian available for indigent cases.',
    },
    {
      question: 'What powers does a guardian have over ward in NC and FL?',
      answer: 'Guardian of person controls: residence, medical care, education, daily activities, visitors. Guardian of estate manages: finances, property, investments, contracts, benefits. Limited guardianship restricts to specific areas. Cannot: change will, vote for ward, consent to marriage/divorce, sterilization (without court). NC requires bond for estate over $10,000. FL similar with annual plan requirement. Courts monitor all major decisions.',
    },
    {
      question: 'How long does guardianship process take?',
      answer: 'Standard guardianship: NC 30-60 days from filing to appointment. FL similar timeline. Emergency guardianship: 24-72 hours for temporary order lasting 30-60 days. Minor guardianship faster if parents consent. Contested cases 3-6 months with trial. Wake County has expedited docket for emergencies. Mecklenburg and Orange Counties offer mediation to resolve disputes faster. Annual reports keep guardianship active indefinitely.',
    },
    {
      question: 'Can guardianship be challenged or terminated?',
      answer: 'Yes, ward or interested party can petition for modification/termination. Must prove: restoration of capacity, guardian misconduct, better alternative available, or changed circumstances. NC: Clerk of court hearing with medical evidence. FL: Similar process with examining committee. Guardian removal for: abuse, neglect, exploitation, failure to file reports, conflict of interest. Minor guardianships end at 18 unless extended for incapacity. Success rate higher with attorney representation.',
    },
    {
      question: 'What is difference between guardianship and power of attorney?',
      answer: 'Power of Attorney (POA): Voluntary, person must have capacity when signing, can revoke anytime, no court supervision, immediate effect, less expensive. Guardianship: Involuntary, for incapacitated persons, court ordered and supervised, cannot be revoked by ward, expensive and time-consuming. POA preferred when possible. Guardianship last resort when POA insufficient or person lacks capacity to execute. Many families wrongly pursue guardianship when POA would suffice.',
    },
  ];

  const content = {
    introduction: `When loved ones cannot care for themselves due to age, disability, or incapacity, guardianship provides legal protection and decision-making authority. Our compassionate guardianship attorneys in Raleigh, Charlotte, Smithfield, and Orlando guide families through this emotional process while ensuring vulnerable individuals receive proper care and protection. Whether seeking guardianship of a minor child, elderly parent with dementia, or adult child with disabilities, we balance autonomy with necessary protection. We also defend against unnecessary or abusive guardianships, explore less restrictive alternatives, and help existing guardians comply with complex court requirements. Your loved one's dignity and well-being drive every decision.`,

    processTitle: 'Guardianship Process',
    process: [
      {
        step: '1',
        title: 'Assessment & Filing',
        description: 'Evaluate need and file petition',
      },
      {
        step: '2',
        title: 'Notice & Service',
        description: 'Notify ward and interested parties',
      },
      {
        step: '3',
        title: 'Evaluation',
        description: 'Medical/psychological assessment',
      },
      {
        step: '4',
        title: 'Hearing',
        description: 'Present evidence to court',
      },
      {
        step: '5',
        title: 'Ongoing Compliance',
        description: 'Annual reports and accountings',
      },
    ],

    urgencyTitle: '⚠️ Act Quickly - Protection Cannot Wait',
    urgencyMessage: 'Vulnerable adults at risk daily. Minor children need immediate care. Assets being depleted. Medical decisions pending.',

    whyChooseTitle: 'Why Choose Vasquez Law for Guardianship',
    whyChoosePoints: [
      'Elder law and special needs expertise',
      'Emergency filing capabilities',
      'Mediation to avoid contested hearings',
      'Guardian training and compliance support',
      'Alternatives to guardianship explored first',
      'Bilingual services - Se habla español',
      'Flat fees for uncontested cases',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Guardianship in NC & FL</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">North Carolina Guardianships</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li><strong>Guardian of Person:</strong> Healthcare, residence, daily needs</li>
              <li><strong>Guardian of Estate:</strong> Financial management only</li>
              <li><strong>General Guardian:</strong> Both person and estate</li>
              <li><strong>Guardian ad Litem:</strong> Court appointed for litigation</li>
              <li><strong>Standby Guardian:</strong> Designated for future need</li>
              <li><strong>Emergency Guardian:</strong> Immediate 60-day appointment</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Florida Guardianships</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li><strong>Plenary Guardian:</strong> Complete authority over ward</li>
              <li><strong>Limited Guardian:</strong> Specific delegated rights only</li>
              <li><strong>Temporary Guardian:</strong> 90-day emergency appointment</li>
              <li><strong>Standby Guardian:</strong> Pre-designated for incapacity</li>
              <li><strong>Preneed Guardian:</strong> Chosen before incapacity</li>
              <li><strong>Guardian Advocate:</strong> For developmentally disabled</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Determining Incapacity - Medical Requirements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Condition</th>
                <th className="py-3 px-4">Common Diagnoses</th>
                <th className="py-3 px-4">Evidence Needed</th>
                <th className="py-3 px-4">Guardian Type</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Dementia/Alzheimer's</td>
                <td className="py-3 px-4">Progressive decline</td>
                <td className="py-3 px-4">Neurological evaluation</td>
                <td className="py-3 px-4">Usually plenary</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Intellectual Disability</td>
                <td className="py-3 px-4">IQ below 70</td>
                <td className="py-3 px-4">Psychological testing</td>
                <td className="py-3 px-4">Often limited</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Mental Illness</td>
                <td className="py-3 px-4">Severe bipolar, schizophrenia</td>
                <td className="py-3 px-4">Psychiatric assessment</td>
                <td className="py-3 px-4">May be temporary</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Traumatic Brain Injury</td>
                <td className="py-3 px-4">Accident, stroke</td>
                <td className="py-3 px-4">Medical documentation</td>
                <td className="py-3 px-4">Varies by severity</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Substance Abuse</td>
                <td className="py-3 px-4">Chronic addiction</td>
                <td className="py-3 px-4">Treatment records</td>
                <td className="py-3 px-4">Usually temporary</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Two physician affidavits typically required in NC, examining committee in FL</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Guardian Duties & Annual Reporting Requirements</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Mandatory Guardian Responsibilities</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-bold mb-2">Initial Requirements (90 days)</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ File inventory of ward's assets</li>
                <li>✓ Establish separate accounts</li>
                <li>✓ Obtain guardian bond if required</li>
                <li>✓ Create care plan for ward</li>
                <li>✓ Notify creditors and agencies</li>
                <li>✓ Secure property and valuables</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Annual Requirements</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>📋 Status report on ward's condition</li>
                <li>📋 Detailed financial accounting</li>
                <li>📋 Receipts for all expenses</li>
                <li>📋 Medical update from physician</li>
                <li>📋 Residential placement review</li>
                <li>📋 Request for continued need</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">⚠️ Failure to file reports = removal as guardian + potential liability</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Alternatives to Avoid Guardianship</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <h3 className="text-xl font-bold text-white mb-4">Less Restrictive Options to Consider First</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-green-400 font-bold">Advance Planning Documents</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>• Durable Power of Attorney - financial decisions</li>
                <li>• Healthcare Power of Attorney - medical choices</li>
                <li>• Living Will - end-of-life wishes</li>
                <li>• HIPAA releases - information access</li>
                <li>• Revocable Trust - asset management</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-blue-400 font-bold">Support Services</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>• Representative Payee - Social Security management</li>
                <li>• VA Fiduciary - veterans benefits</li>
                <li>• Supported Decision-Making agreements</li>
                <li>• Money management programs</li>
                <li>• Care coordination services</li>
              </ul>
            </div>
          </div>
          <p className="text-white mt-4">💡 Courts must consider alternatives before appointing guardian</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Emergency Resources by Location</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">North Carolina</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-900/20 p-4 rounded">
                <h4 className="text-blue-400 font-bold">Wake County (Raleigh)</h4>
                <ul className="text-gray-300 mt-2">
                  <li>• Adult Protective Services: 919-212-7990</li>
                  <li>• Clerk of Court: 919-792-4000</li>
                  <li>• Legal Aid NC: 919-828-4647</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 p-4 rounded">
                <h4 className="text-blue-400 font-bold">Mecklenburg (Charlotte)</h4>
                <ul className="text-gray-300 mt-2">
                  <li>• APS: 704-336-2273</li>
                  <li>• Clerk: 704-686-0400</li>
                  <li>• Council on Aging: 704-432-1111</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Florida</h3>
            <div className="bg-green-900/20 p-4 rounded">
              <h4 className="text-green-400 font-bold">Orange County (Orlando)</h4>
              <ul className="text-gray-300 mt-2 text-sm">
                <li>• Adult Protective Services: 1-800-962-2873</li>
                <li>• Probate Court: 407-836-2000</li>
                <li>• Senior Resource Alliance: 407-514-1800</li>
                <li>• Public Guardian: 407-836-7650</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Guardianship Attorney NC & FL"
      subtitle="Protecting Vulnerable Loved Ones Through Legal Guardianship"
      description="Compassionate guardianship lawyers in Raleigh, Charlotte, Smithfield & Orlando. Minor guardianships, adult incapacity, emergency petitions."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
