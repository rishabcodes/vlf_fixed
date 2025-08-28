import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Juvenile Defense Lawyer Raleigh NC | Teen Criminal Attorney Charlotte | Youth Court Orlando',
  description: 'Top juvenile defense attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. School fights, drugs, theft. Keep record clean. Parents call 919-569-5882',
  keywords: 'juvenile defense attorney Raleigh NC, teen criminal lawyer Charlotte, youth court attorney Smithfield, juvenile delinquency Orlando FL, school suspension lawyer, teen drug charges NC, underage drinking attorney, sexting defense lawyer, school resource officer arrest, juvenile record sealing NC',
  openGraph: {
    title: 'Juvenile Criminal Defense Attorney | Teen Court Lawyer NC & FL | Vasquez Law',
    description: "Protecting your child's future. Former prosecutors defending teens. Keep records clean.",
    type: 'website',
    locale: 'en_US',
  },
};

export default function JuvenileDefensePage() {
  const services = [
    {
      title: 'School-Based Offenses',
      description: 'Campus incidents and discipline',
      icon: '🎓',
      features: [
        'Fighting/assault at school',
        'Drug possession on campus',
        'Weapon charges backpack',
        'Threats social media posts',
        'Vaping/tobacco violations',
        'School resource officer arrests',
      ],
    },
    {
      title: 'Teen Drug & Alcohol',
      description: 'Substance-related charges',
      icon: '⚠️',
      features: [
        'Marijuana possession under 21',
        'Underage drinking parties',
        'Fake ID possession',
        'Drug paraphernalia',
        'DWI under 21 zero tolerance',
        'Prescription pill sharing',
      ],
    },
    {
      title: 'Technology Crimes',
      description: 'Digital and online offenses',
      icon: '📱',
      features: [
        'Sexting between minors',
        'Cyberbullying charges',
        'Social media threats',
        'Computer crimes hacking',
        'Online harassment',
        'Inappropriate images',
      ],
    },
    {
      title: 'Property Crimes',
      description: 'Theft and damage charges',
      icon: '🏪',
      features: [
        'Shoplifting retail theft',
        'Vandalism graffiti',
        'Car break-ins',
        'School property damage',
        'Joyriding unauthorized use',
        'Breaking and entering',
      ],
    },
    {
      title: 'Violent Offenses',
      description: 'Assault and serious charges',
      icon: '⚡',
      features: [
        'Simple assault fights',
        'Gang-related activity',
        'Robbery allegations',
        'Weapons at school',
        'Domestic violence dating',
        'Sexual offense accusations',
      ],
    },
    {
      title: 'Juvenile Court Process',
      description: 'Navigate the system',
      icon: '⚖️',
      features: [
        'Intake conferences',
        'Diversion programs',
        'Detention hearings',
        'Adjudication defense',
        'Disposition advocacy',
        'Transfer to adult court',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What happens when a minor is arrested in Raleigh, Charlotte, or Orlando?',
      answer: 'Juveniles under 16 (NC) or 18 (FL) go through different system than adults. Police must notify parents immediately. Wake County has Juvenile Detention Center. Mecklenburg uses Jail North for older teens. Most released to parents same day unless serious felony. First appearance within 24-72 hours. Court in Raleigh at 220 E. Martin St, Charlotte at 800 E. Trade St. Goal is rehabilitation not punishment.',
    },
    {
      question: 'Can juvenile charges affect college admissions and scholarships?',
      answer: 'Yes, significantly. College applications ask about criminal history including juvenile. Disciplinary records shared by schools. Drug/alcohol charges lose federal financial aid eligibility. Athletic scholarships revoked for arrests. Some charges require sex offender registration affecting campus housing. However, many juvenile records can be sealed/expunged after completion. Early intervention critical for protecting educational future.',
    },
    {
      question: 'What is Teen Court diversion in North Carolina and Florida?',
      answer: 'First-time offenders avoid formal charges through diversion. NC Teen Court: peer jury decides consequences like community service, essays, apologies. Wake and Mecklenburg Counties have active programs. FL has similar youth court in Orange County. Successful completion = no record. Eligibility: misdemeanors, no violence, admission of responsibility. Must complete within 90 days typically.',
    },
    {
      question: 'When can juveniles be tried as adults in NC and FL?',
      answer: 'NC: Automatic transfer at 16 for Class A-E felonies (murder, rape, armed robbery). Discretionary transfer 13+ for serious felonies. Once transferred, always adult court. FL: Direct file by prosecutor for 14+ serious felonies, 16+ any felony. Mandatory for certain crimes. Adult conviction means adult prison, permanent record. Critical to fight transfer - we\'ve kept hundreds in juvenile court.',
    },
    {
      question: 'What are parents\' rights in juvenile cases?',
      answer: 'Parents have right to be present at all proceedings, hire attorney, access records. Must be notified of arrest immediately. Can refuse police questioning without attorney. Responsible for restitution, court costs in NC. May face contributing to delinquency charges if enabled behavior. Schools must notify of suspensions/expulsions. Confidential proceedings but parents fully involved.',
    },
    {
      question: 'Can juvenile records be sealed or expunged in NC and FL?',
      answer: 'Yes! NC: Can expunge juvenile records at 18 or after 2 years from case close. Multiple adjudications harder but possible. Automatic expungement some misdemeanors at 18. FL: Sealing available after completion, expungement if dismissed. We handle sealing with college applications approaching. Clean slate for employment, education, military, immigration purposes.',
    },
  ];

  const content = {
    introduction: `When your child faces criminal charges, their entire future hangs in the balance. One mistake shouldn't derail college dreams, career aspirations, or lifetime opportunities. Our experienced juvenile defense attorneys in Raleigh, Charlotte, Smithfield, and Orlando understand the unique challenges teens face and the critical importance of protecting their records. We work with families through this difficult time, fighting for alternatives to formal charges, advocating for rehabilitation over punishment, and ensuring your child gets a second chance. From school incidents to serious felonies, we're here to protect your child's tomorrow.`,

    processTitle: 'Juvenile Defense Strategy',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Immediate intervention at arrest/school',
      },
      {
        step: '2',
        title: 'Diversion Evaluation',
        description: 'Pursue alternatives to prosecution',
      },
      {
        step: '3',
        title: 'Family Planning',
        description: 'Coordinate defense with parents',
      },
      {
        step: '4',
        title: 'Court Advocacy',
        description: 'Aggressive defense if charged',
      },
      {
        step: '5',
        title: 'Future Protection',
        description: 'Seal/expunge records when possible',
      },
    ],

    urgencyTitle: '🚨 Act Fast - Your Child\'s Future at Risk',
    urgencyMessage: 'Early intervention prevents adult charges. Diversion deadlines short. School disciplinary hearings immediate. College applications pending.',

    whyChooseTitle: 'Why Choose Vasquez Law for Juvenile Defense',
    whyChoosePoints: [
      'Former juvenile prosecutors know the system',
      'Relationships with school administrators',
      'Teen Court certified attorneys',
      'Diversion program expertise',
      'Mental health and substance abuse resources',
      'Family-centered approach',
      'Bilingual services for Hispanic families',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Juvenile vs Adult Court - Critical Differences</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Aspect</th>
                <th className="py-3 px-4">Juvenile Court</th>
                <th className="py-3 px-4">Adult Court</th>
                <th className="py-3 px-4">Impact on Future</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Age Range</td>
                <td className="py-3 px-4">Under 16 (NC) / 18 (FL)</td>
                <td className="py-3 px-4">16+ (NC) / 18+ (FL)</td>
                <td className="py-3 px-4">Determines court jurisdiction</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Proceedings</td>
                <td className="py-3 px-4">Confidential/Closed</td>
                <td className="py-3 px-4">Public Record</td>
                <td className="py-3 px-4">Privacy protection</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Terminology</td>
                <td className="py-3 px-4">Adjudicated delinquent</td>
                <td className="py-3 px-4">Convicted guilty</td>
                <td className="py-3 px-4">Not a "conviction"</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Focus</td>
                <td className="py-3 px-4">Rehabilitation</td>
                <td className="py-3 px-4">Punishment</td>
                <td className="py-3 px-4">Better outcomes</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Detention</td>
                <td className="py-3 px-4">Youth facilities</td>
                <td className="py-3 px-4">Jail/Prison</td>
                <td className="py-3 px-4">Safer environment</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Records</td>
                <td className="py-3 px-4">Can be sealed/expunged</td>
                <td className="py-3 px-4">Permanent public</td>
                <td className="py-3 px-4">Clean slate possible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common School Disciplinary Issues - Legal Implications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">School Discipline Only</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Dress code violations</li>
              <li>• Class disruption</li>
              <li>• Insubordination</li>
              <li>• Academic dishonesty</li>
              <li>• Truancy/skipping</li>
              <li>• Minor rule violations</li>
              <li>→ Suspension/Expulsion possible</li>
              <li>→ No criminal charges typically</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">Criminal Charges Likely</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Assault/Fighting</li>
              <li>• Drug possession/sales</li>
              <li>• Weapons on campus</li>
              <li>• Threats of violence</li>
              <li>• Sexual offenses</li>
              <li>• Property damage/theft</li>
              <li>→ SRO arrest probable</li>
              <li>→ Juvenile court involvement</li>
            </ul>
          </div>
        </div>
        <p className="text-yellow-400 mt-4 text-sm">⚠️ School Resource Officers in Wake, Mecklenburg, Johnston, and Orange Counties have discretion to arrest or refer to counseling</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Diversion Programs by County</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">North Carolina Programs</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-bold">Wake County (Raleigh)</h4>
                  <ul className="text-gray-300 text-sm">
                    <li>• Teen Court - First offenders</li>
                    <li>• FIRST Program - Misdemeanors</li>
                    <li>• Drug Court - Substance abuse</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold">Mecklenburg (Charlotte)</h4>
                  <ul className="text-gray-300 text-sm">
                    <li>• Project CHALLENGE</li>
                    <li>• Race Matters for Juvenile Justice</li>
                    <li>• Restorative Justice programs</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Florida Programs</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-bold">Orange County (Orlando)</h4>
                  <ul className="text-gray-300 text-sm">
                    <li>• Teen Court/Youth Court</li>
                    <li>• Civil Citation Program</li>
                    <li>• Walker Grant Program</li>
                    <li>• Juvenile Drug Court</li>
                  </ul>
                </div>
              </div>
              <p className="text-yellow-300 text-sm mt-3">✓ Successful completion = No formal charges filed</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Protecting Your Child's Future - Action Steps</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">1.</span>
              <div>
                <h3 className="font-bold text-white">Don't Let Police Question Without Attorney</h3>
                <p className="text-gray-300 text-sm">Invoke right to remain silent and request lawyer immediately. Juveniles often confess without understanding consequences.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">2.</span>
              <div>
                <h3 className="font-bold text-white">Document Everything</h3>
                <p className="text-gray-300 text-sm">Save texts, social media, witness info. School incidents often misreported.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">3.</span>
              <div>
                <h3 className="font-bold text-white">Get Mental Health/Substance Evaluation</h3>
                <p className="text-gray-300 text-sm">Shows taking responsibility. Courts favor treatment over detention.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">4.</span>
              <div>
                <h3 className="font-bold text-white">Consider School Transfer</h3>
                <p className="text-gray-300 text-sm">Sometimes fresh start needed. We help with enrollment issues.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">5.</span>
              <div>
                <h3 className="font-bold text-white">Plan for College Applications</h3>
                <p className="text-gray-300 text-sm">Strategy for explaining incidents. Sealed records still may need disclosure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Juvenile Criminal Defense Attorney NC & FL"
      subtitle="Protecting Your Child's Future Since 1993"
      description="Expert juvenile defense in Raleigh, Charlotte, Smithfield & Orlando. School charges, teen court, diversion programs."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
