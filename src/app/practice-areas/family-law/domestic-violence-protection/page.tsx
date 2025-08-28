import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Violence Attorney Raleigh NC | Protection Order Lawyer Charlotte | DVPO Orlando',
  description: 'Emergency protection order attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. 24/7 help for abuse victims. Safe escape planning. 919-569-5882',
  keywords: 'domestic violence attorney Raleigh NC, protection order lawyer Charlotte, DVPO attorney Smithfield, restraining order Orlando FL, emergency protective order, 50B order North Carolina, injunction violence Florida, abuse victim lawyer, ex parte order Wake County, no contact order attorney',
  openGraph: {
    title: 'Domestic Violence Protection Attorney | Emergency Orders NC & FL | Vasquez Law',
    description: '24/7 emergency help for domestic violence victims. Protection orders, safety planning, divorce coordination.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function DomesticViolenceProtectionPage() {
  const services = [
    {
      title: 'Emergency Protection Orders',
      description: 'Immediate safety through court orders',
      icon: '🚨',
      features: [
        'Ex parte orders same day',
        'No contact provisions',
        'Residence exclusion',
        'Temporary custody included',
        'Weapon surrender orders',
        '24/7 emergency filing',
      ],
    },
    {
      title: 'Safety Planning',
      description: 'Comprehensive escape strategies',
      icon: '🛡️',
      features: [
        'Safe exit planning',
        'Document preservation',
        'Financial protection',
        'Children safety measures',
        'Shelter coordination',
        'Technology safety audit',
      ],
    },
    {
      title: 'Criminal Coordination',
      description: 'Work with prosecutors',
      icon: '⚖️',
      features: [
        'Criminal case monitoring',
        'Victim witness assistance',
        'No-drop prosecution support',
        'Restitution claims',
        'Sentencing advocacy',
        'Probation conditions input',
      ],
    },
    {
      title: 'Violation Enforcement',
      description: 'When orders are violated',
      icon: '🚔',
      features: [
        'Criminal contempt charges',
        'Civil contempt proceedings',
        'Bond condition violations',
        'Documentation assistance',
        'Law enforcement liaison',
        'Order modifications',
      ],
    },
    {
      title: 'Divorce Integration',
      description: 'DV impacts on family law',
      icon: '📑',
      features: [
        'Custody impact assessment',
        'Supervised visitation requests',
        'Alimony considerations',
        'Property award factors',
        'Protective provisions',
        'Long-term safety orders',
      ],
    },
    {
      title: 'Defense Against False Claims',
      description: 'Protecting the falsely accused',
      icon: '⚡',
      features: [
        'False allegation defense',
        'Evidence preservation',
        'Witness testimony',
        'Cross-examination strategy',
        'Mutual order prevention',
        'Record clearing',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I get an emergency protection order in Raleigh, Charlotte, or Orlando?',
      answer: 'Go immediately to courthouse or call police. NC: File for 50B Domestic Violence Protective Order (DVPO) at Wake County Courthouse (Raleigh) or Mecklenburg Courthouse (Charlotte). Ex parte orders granted same day without abuser present. FL: File for Injunction for Protection at Orange County Courthouse (Orlando). Both states offer 24/7 emergency orders through magistrates/judges. Free to file, no attorney required but strongly recommended.',
    },
    {
      question: 'What qualifies as domestic violence for a protective order?',
      answer: 'NC: Physical assault, sexual assault, threats of imminent harm, harassment causing substantial emotional distress, stalking. Must be from current/former spouse, dating partner, household member, or parent of your child. FL similar but includes dating violence, repeat violence. Verbal abuse alone usually insufficient unless includes credible threats. Document everything: photos, texts, medical records, witness statements.',
    },
    {
      question: 'How long do protection orders last in NC and FL?',
      answer: 'NC: Ex parte DVPO lasts 10 days until full hearing. After hearing, can be extended up to 1 year, renewable indefinitely if threat continues. FL: Temporary injunction lasts 15 days. Final injunction can be permanent or set duration. Both states allow modifications. Criminal no-contact orders last through criminal case. Violations are criminal offenses with immediate arrest.',
    },
    {
      question: 'What can a protection order include beyond no contact?',
      answer: 'Comprehensive relief available: Stay away from home/work/school, temporary child custody and support, possession of residence (kick abuser out), pet custody, vehicle possession, personal property retrieval with police, counseling requirements, weapon surrender, no alcohol/drugs, GPS monitoring. NC courts in Wake and Mecklenburg Counties regularly grant broad relief. FL similar provisions.',
    },
    {
      question: 'Can I drop or cancel a protection order once filed?',
      answer: 'Only judge can dismiss - not victim or prosecutor. Must file motion explaining why no longer needed. Judges scrutinize requests, may deny if coercion suspected. NC courts rarely dismiss within first 6 months. FL similar. Criminal charges separate - DA/State Attorney decides prosecution. Reconciliation doesn\'t automatically end order. Violating your own order can have consequences.',
    },
    {
      question: 'How does domestic violence affect custody in NC and FL?',
      answer: 'Major impact on custody decisions. Courts presume joint custody not in child\'s best interest with DV history. May order supervised visitation, exchange through third parties, completion of batterer\'s intervention program. NC statute specifically considers DV as custody factor. FL creates rebuttable presumption against custody for perpetrator. Document all incidents for custody case.',
    },
  ];

  const content = {
    introduction: `Domestic violence destroys lives, but you don\'t have to face it alone. Our compassionate attorneys provide immediate legal protection while helping you build a safer future. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we\'re available 24/7 for emergency protection orders and safety planning. We understand the courage it takes to seek help and the complexities of leaving an abusive situation. From securing immediate protection orders to navigating the intersection of criminal and family court proceedings, we stand with survivors every step of the way. You deserve safety, dignity, and justice.`,

    processTitle: 'Protection Order Process',
    process: [
      {
        step: '1',
        title: 'Emergency Filing',
        description: 'Get immediate ex parte protection',
      },
      {
        step: '2',
        title: 'Service on Abuser',
        description: 'Sheriff serves papers safely',
      },
      {
        step: '3',
        title: 'Full Hearing',
        description: 'Present evidence to judge',
      },
      {
        step: '4',
        title: 'Long-term Order',
        description: 'Extended protection granted',
      },
      {
        step: '5',
        title: 'Enforcement',
        description: 'Violations prosecuted criminally',
      },
    ],

    urgencyTitle: '🆘 Get Help Now - Your Safety Can\'t Wait',
    urgencyMessage: 'Violence often escalates. Evidence disappears. Children at risk. Free confidential consultation available 24/7.',

    whyChooseTitle: 'Why Choose Vasquez Law for Protection',
    whyChoosePoints: [
      '24/7 emergency availability',
      'Former domestic violence prosecutors',
      'Connections with local shelters and resources',
      'Coordinate with criminal proceedings',
      'Bilingual services - Se habla español',
      'Free consultations for DV victims',
      'Safety-first approach to all communications',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Protection Orders Available</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">North Carolina Orders</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li><strong>50B DVPO:</strong> Domestic Violence Protective Order</li>
              <li><strong>50C Order:</strong> Civil No-Contact (non-domestic)</li>
              <li><strong>Criminal Orders:</strong> Conditions of release</li>
              <li><strong>Emergency Orders:</strong> After hours through magistrate</li>
              <li><strong>Workplace Orders:</strong> Employer-sought protection</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Florida Injunctions</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li><strong>DV Injunction:</strong> Domestic violence protection</li>
              <li><strong>Dating Violence:</strong> Non-cohabitating partners</li>
              <li><strong>Repeat Violence:</strong> Two incidents required</li>
              <li><strong>Sexual Violence:</strong> Single incident sufficient</li>
              <li><strong>Stalking:</strong> Pattern of following/harassment</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Safety Resources by Location</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">North Carolina Resources</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-blue-400 font-bold">Wake County (Raleigh)</h4>
                  <ul className="text-gray-300">
                    <li>• InterAct: 919-828-7501 (24/7)</li>
                    <li>• Court: 316 Fayetteville St</li>
                    <li>• Safe Alliance Shelter</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-blue-400 font-bold">Mecklenburg (Charlotte)</h4>
                  <ul className="text-gray-300">
                    <li>• Safe Alliance: 980-771-4673</li>
                    <li>• Court: 832 E 4th St</li>
                    <li>• Victim Assistance Program</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Florida Resources</h3>
              <div className="text-sm">
                <h4 className="text-green-400 font-bold">Orange County (Orlando)</h4>
                <ul className="text-gray-300">
                  <li>• Harbor House: 407-886-2856</li>
                  <li>• Court: 425 N Orange Ave</li>
                  <li>• Victim Service Center</li>
                  <li>• Help Now of Osceola</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">🆘 National DV Hotline: 1-800-799-7233 (24/7 confidential)</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Warning Signs & Safety Planning</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Escalation Warning Signs</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Immediate Danger Signs</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>⚠️ Threats to kill you or children</li>
                <li>⚠️ Weapon access or threats</li>
                <li>⚠️ Strangulation history</li>
                <li>⚠️ Stalking or monitoring</li>
                <li>⚠️ Escalating violence</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Safety Planning Steps</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Pack emergency bag hidden</li>
                <li>✓ Copy important documents</li>
                <li>✓ Save money secretly</li>
                <li>✓ Plan escape route</li>
                <li>✓ Tell trusted friend/family</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Domestic Violence Protection Attorney NC & FL"
      subtitle="24/7 Emergency Protection Orders and Safety Planning"
      description="Compassionate DV attorneys in Raleigh, Charlotte, Smithfield & Orlando. Immediate protection orders, safety planning, coordination with criminal cases."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
