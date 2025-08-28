import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'White Collar Crime Attorney Raleigh NC | Federal Fraud Lawyer Charlotte | Financial Crime Defense',
  description: 'Top white collar crime defense attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. Federal fraud, embezzlement, tax crimes. Former prosecutors. 919-569-5882',
  keywords: 'white collar crime attorney Raleigh, federal fraud lawyer Charlotte NC, embezzlement defense Smithfield, tax fraud attorney Orlando, wire fraud defense lawyer, securities fraud attorney NC, PPP loan fraud defense, healthcare fraud lawyer, money laundering attorney near me, federal criminal defense Raleigh Charlotte',
  openGraph: {
    title: 'White Collar Crime Defense | Federal Criminal Attorney NC & FL | Vasquez Law',
    description: 'Former federal prosecutors defending financial crimes. Fraud, embezzlement, tax charges. Top-rated defense team.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function WhiteCollarCrimesPage() {
  const services = [
    {
      title: 'Federal Fraud Defense',
      description: 'Wire, mail, bank fraud charges',
      icon: '🏛️',
      features: [
        'Wire fraud 18 USC 1343',
        'Mail fraud investigations',
        'Bank fraud allegations',
        'PPP/EIDL loan fraud',
        'COVID relief fraud cases',
        'Federal sentencing guidelines',
      ],
    },
    {
      title: 'Healthcare Fraud',
      description: 'Medicare, Medicaid, insurance fraud',
      icon: '⚕️',
      features: [
        'Medicare/Medicaid fraud',
        'Billing fraud allegations',
        'Kickback violations',
        'False Claims Act defense',
        'OIG investigations',
        'Medical license protection',
      ],
    },
    {
      title: 'Tax Crimes Defense',
      description: 'IRS criminal investigations',
      icon: '💰',
      features: [
        'Tax evasion charges',
        'Failure to file returns',
        'False return allegations',
        'Payroll tax violations',
        'IRS Criminal Investigation',
        'Voluntary disclosure programs',
      ],
    },
    {
      title: 'Corporate Fraud',
      description: 'Business and securities violations',
      icon: '🏢',
      features: [
        'Securities fraud SEC',
        'Insider trading defense',
        'Accounting fraud',
        'Corporate embezzlement',
        'FCPA violations',
        'Sarbanes-Oxley compliance',
      ],
    },
    {
      title: 'Money Laundering',
      description: 'Financial transaction crimes',
      icon: '🔄',
      features: [
        'Money laundering conspiracy',
        'Structuring transactions',
        'Currency reporting violations',
        'Asset forfeiture defense',
        'International transfers',
        'Cryptocurrency cases',
      ],
    },
    {
      title: 'Government Investigations',
      description: 'Pre-indictment representation',
      icon: '🔍',
      features: [
        'Grand jury subpoenas',
        'Target letters response',
        'FBI/IRS raid defense',
        'Document preservation',
        'Proffer sessions',
        'Cooperation agreements',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the penalties for white collar crimes in federal court?',
      answer: 'Federal white collar crimes carry severe penalties. Wire/mail fraud: lengthy prison terms (extended if affecting financial institutions). Tax evasion: substantial prison time. Healthcare fraud: significant sentences. Money laundering: lengthy terms. Securities fraud: major sentences. Plus substantial fines, restitution, asset forfeiture. Federal sentencing guidelines consider loss amount, number of victims, sophistication. Eastern District NC and Middle District FL courts impose tough sentences.',
    },
    {
      question: 'When should I hire a white collar crime attorney in Raleigh or Charlotte?',
      answer: 'Immediately upon learning of investigation - before charges filed. Warning signs: subpoena received, FBI/IRS contact, employer investigation, audit notice, target letter. Early intervention in Raleigh, Charlotte, or Orlando can prevent charges, negotiate immunity, limit exposure. Never speak to investigators without counsel. Our former federal prosecutors know how government builds cases.',
    },
    {
      question: 'What\'s the difference between state and federal white collar charges?',
      answer: 'Federal charges more serious with harsher penalties. Federal: crosses state lines, involves federal programs (Medicare, PPP), banks, mail/wire systems, large dollar amounts. Prosecuted by US Attorney\'s Office in Eastern/Middle/Western District NC or Middle District FL. State charges in Wake County or Mecklenburg County courts typically smaller scale. We defend both.',
    },
    {
      question: 'Can white collar convictions be avoided through plea agreements?',
      answer: 'Often yes. Options include: deferred prosecution agreements (DPA), non-prosecution agreements, pretrial diversion, cooperation/substantial assistance, plea to lesser charges. Factors: first offense, cooperation, restitution ability, acceptance of responsibility. Charlotte and Raleigh US Attorney offices consider alternatives. Early representation crucial for negotiations.',
    },
    {
      question: 'How do federal sentencing guidelines work for financial crimes?',
      answer: 'Guidelines calculate offense level based on loss amount, victim numbers, sophisticated means, leadership role. Base level increases significantly with higher loss amounts across a wide range of thresholds. Enhancements for vulnerable victims, abuse of trust. Reductions for acceptance, minor role, cooperation. Judges in NC and FL have discretion but guidelines influential.',
    },
    {
      question: 'Will white collar charges affect my professional licenses in NC or FL?',
      answer: 'Yes, convictions trigger licensing board reviews. Medical, legal, accounting, real estate, securities licenses at risk. NC Medical Board, NC State Bar, FL Department of Health act on convictions. Even arrests require disclosure. We coordinate criminal defense with license protection. Some plea agreements minimize professional consequences.',
    },
  ];

  const content = {
    introduction: `White collar crime allegations can destroy careers, reputations, and freedom overnight. Federal prosecutors in the Eastern, Middle, and Western Districts of North Carolina and the Middle District of Florida aggressively pursue financial crimes with sophisticated investigative resources. Whether you're facing FBI investigation in Raleigh's Research Triangle, SEC charges in Charlotte's banking sector, or healthcare fraud allegations in Orlando, our former federal prosecutors provide the experienced defense needed against these complex charges. We understand how the government builds cases and know how to dismantle them.`,

    processTitle: 'White Collar Defense Strategy',
    process: [
      {
        step: '1',
        title: 'Investigation Response',
        description: 'Immediate intervention upon contact',
      },
      {
        step: '2',
        title: 'Evidence Analysis',
        description: 'Financial records and digital forensics',
      },
      {
        step: '3',
        title: 'Pre-Indictment Negotiations',
        description: 'Preventing or limiting charges',
      },
      {
        step: '4',
        title: 'Litigation Preparation',
        description: 'Expert witnesses and defense strategy',
      },
      {
        step: '5',
        title: 'Trial or Resolution',
        description: 'Aggressive defense or favorable plea',
      },
    ],

    urgencyTitle: '🚨 Under Investigation? Act Now',
    urgencyMessage: 'Federal investigations move fast. Evidence preservation critical. Early intervention can prevent charges. Target letters have deadlines.',

    whyChooseTitle: 'Why Choose Vasquez Law for White Collar Defense',
    whyChoosePoints: [
      'Former federal prosecutors from DOJ',
      'Financial crimes expertise in NC and FL',
      'Grand jury and trial experience',
      'Federal sentencing guideline mastery',
      'Asset forfeiture defense',
      'Professional license protection',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
      'Immediate response to federal investigations',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Federal Sentencing Guidelines - Severity Categories</h2>
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Sentencing Severity Factors</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-red-400 font-bold mb-3">Loss Amount Categories</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• <strong>Minor:</strong> Smaller amounts, probation possible</li>
                <li>• <strong>Moderate:</strong> Mid-range losses, short prison terms</li>
                <li>• <strong>Significant:</strong> Large losses, substantial sentences</li>
                <li>• <strong>Major:</strong> Massive schemes, lengthy prison terms</li>
                <li>• <strong>Catastrophic:</strong> Extreme losses, decades in prison</li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-400 font-bold mb-3">Enhancement Factors</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• <strong>Victim Impact:</strong> Number of people harmed</li>
                <li>• <strong>Sophistication:</strong> Complex schemes get more time</li>
                <li>• <strong>Leadership Role:</strong> Organizers face harsher sentences</li>
                <li>• <strong>Vulnerable Victims:</strong> Elderly, disabled increase penalties</li>
                <li>• <strong>Trust Abuse:</strong> Professional positions add time</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
            <p className="text-yellow-200 text-sm"><strong>Important:</strong> Federal sentencing guidelines are complex and fact-specific. Experienced defense counsel can argue for downward departures and variances to minimize sentences.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common White Collar Crimes in NC & FL</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Raleigh/RTP Area</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Healthcare/Medicare fraud</li>
              <li>• Research grant fraud</li>
              <li>• PPP/EIDL loan fraud</li>
              <li>• Tech company IP theft</li>
              <li>• Government contract fraud</li>
              <li>• University embezzlement</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Charlotte Banking</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Bank fraud schemes</li>
              <li>• Securities violations</li>
              <li>• Wire fraud operations</li>
              <li>• Mortgage fraud</li>
              <li>• Investment advisor fraud</li>
              <li>• Money laundering</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Orlando/Central FL</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Tourism industry fraud</li>
              <li>• Real estate fraud</li>
              <li>• Insurance fraud</li>
              <li>• Timeshare scams</li>
              <li>• Construction fraud</li>
              <li>• Tax evasion schemes</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Federal Agencies Investigating in NC & FL</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">Primary Agencies</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• FBI - Charlotte & Raleigh Field Offices</li>
                <li>• IRS Criminal Investigation - Greensboro</li>
                <li>• DEA Financial Investigations</li>
                <li>• Secret Service - Electronic crimes</li>
                <li>• HHS-OIG - Healthcare fraud</li>
                <li>• SEC - Atlanta Regional Office</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">US Attorney Offices</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• EDNC - Raleigh (Eastern District)</li>
                <li>• MDNC - Greensboro (Middle)</li>
                <li>• WDNC - Charlotte (Western)</li>
                <li>• MDFL - Orlando (Middle Florida)</li>
                <li>• Task forces: Healthcare, Tax, Securities</li>
                <li>• Joint investigations common</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Immediate Steps If Under Investigation</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl font-bold">1.</span>
              <div>
                <h3 className="font-bold text-white">Don't Talk to Investigators</h3>
                <p className="text-gray-300 text-sm">FBI, IRS, SEC agents are trained to elicit incriminating statements. Politely decline and call attorney.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl font-bold">2.</span>
              <div>
                <h3 className="font-bold text-white">Preserve All Documents</h3>
                <p className="text-gray-300 text-sm">Don't destroy anything - that's obstruction. Preserve emails, texts, financial records.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl font-bold">3.</span>
              <div>
                <h3 className="font-bold text-white">Hire Federal Defense Counsel</h3>
                <p className="text-gray-300 text-sm">Not all criminal lawyers handle federal cases. You need white collar expertise.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl font-bold">4.</span>
              <div>
                <h3 className="font-bold text-white">Review Exposure Quietly</h3>
                <p className="text-gray-300 text-sm">Don't discuss with colleagues, friends, or family. They can become witnesses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="White Collar Crime Defense Attorney NC & FL"
      subtitle="Former Federal Prosecutors Defending Financial Crimes"
      description="Top-rated white collar defense in Raleigh, Charlotte, Smithfield & Orlando. Fraud, embezzlement, tax crimes. Federal court expertise."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
