import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O-1 Visa Attorney NC & FL | Extraordinary Ability Visa | Vasquez Law',
  description: 'O-1 visa for individuals with extraordinary ability in sciences, arts, business, athletics, or entertainment. Expert representation.',
  keywords: 'O-1 visa attorney, extraordinary ability visa, O-1A O-1B visa, artist visa, athlete visa',
};

export default function O1VisaPage() {
  const services = [
    {
      title: 'O-1A Sciences/Business',
      description: 'Extraordinary ability in sciences, education, business',
      icon: '🔬',
      features: [
        'Research scientists',
        'Business executives',
        'Engineers and developers',
        'Medical professionals',
        'Educators and professors',
        'Tech entrepreneurs',
      ],
    },
    {
      title: 'O-1B Arts',
      description: 'Extraordinary ability in the arts',
      icon: '🎨',
      features: [
        'Visual artists',
        'Musicians and composers',
        'Actors and directors',
        'Writers and authors',
        'Photographers',
        'Culinary artists',
      ],
    },
    {
      title: 'O-1B Entertainment',
      description: 'Extraordinary achievement in film/TV',
      icon: '🎬',
      features: [
        'Film producers',
        'Television personalities',
        'Directors and editors',
        'Cinematographers',
        'Sound engineers',
        'Production designers',
      ],
    },
    {
      title: 'O-2 Support Staff',
      description: 'Essential support personnel',
      icon: '👥',
      features: [
        'Athletic trainers',
        'Tour managers',
        'Technical crew',
        'Makeup artists',
        'Personal assistants',
        'Specialized technicians',
      ],
    },
    {
      title: 'Evidence Portfolio',
      description: 'Building compelling documentation',
      icon: '📚',
      features: [
        'Awards and recognition',
        'Media coverage compilation',
        'Expert recommendation letters',
        'Salary documentation',
        'Membership evidence',
        'Published materials',
      ],
    },
    {
      title: 'Extension & Changes',
      description: 'Maintaining O-1 status',
      icon: '🔄',
      features: [
        'Extension applications',
        'Employer changes',
        'Adding new activities',
        'Agent representation',
        'Consular processing',
        'Green card transition',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What qualifies as extraordinary ability for O-1?',
      answer: 'O-1A requires sustained national/international acclaim in sciences, business, education, or athletics. Need 3 of 8 criteria: awards, membership in elite organizations, media coverage, judging others, original contributions, scholarly articles, critical role, high salary. O-1B arts requires distinction (high level of achievement). O-1B entertainment needs extraordinary achievement (Emmy, Grammy, or similar).',
    },
    {
      question: 'How long can I stay on O-1 visa?',
      answer: 'Initial period up to 3 years based on event/activity duration. Unlimited 1-year extensions possible if continuing same activities. No maximum stay limit unlike H-1B. Can maintain O-1 indefinitely while pursuing green card. Must maintain extraordinary ability and have ongoing projects.',
    },
    {
      question: 'Can O-1 lead to green card?',
      answer: 'Yes! O-1 allows dual intent - you can pursue permanent residence while on O-1. Natural progression to EB-1A (extraordinary ability) or EB-1B (outstanding researcher) green cards. Same evidence often works for both. Can also pursue EB-2 NIW or employer-sponsored categories.',
    },
    {
      question: 'Do I need a job offer for O-1?',
      answer: 'Yes, need U.S. employer or agent to petition. Can have multiple employers through agent. Itinerary required for multiple engagements. Freelancers use agents as petitioners. Must show specific events, activities, or employment. Cannot self-petition like EB-1A.',
    },
    {
      question: 'How fast is O-1 processing?',
      answer: 'Regular processing: 2-4 months. Premium processing: 15 calendar days for additional fee. Start early as evidence gathering takes time. Consular appointment needed if outside U.S. Extensions should be filed well before expiration.',
    },
    {
      question: 'Can my family come with me on O-1?',
      answer: 'Spouse and unmarried children under 21 get O-3 status. O-3 cannot work but can study. No separate application - included with O-1. Same duration as principal O-1 holder. Consider other options if spouse needs work authorization.',
    },
  ];

  const content = {
    introduction: `The O-1 visa recognizes individuals who have reached the pinnacle of their fields. Whether you're a Nobel laureate, Grammy winner, tech innovator, or rising star in the arts, the O-1 provides flexibility to work in the United States on prestigious projects. Our expertise spans all O-1 categories, helping extraordinary individuals showcase their achievements and secure approval for this elite visa classification.`,

    processTitle: 'O-1 Visa Process',
    process: [
      {
        step: '1',
        title: 'Portfolio Assessment',
        description: 'Evaluate eligibility and evidence',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Compile documentation and letters',
      },
      {
        step: '3',
        title: 'Petition Preparation',
        description: 'Draft compelling case narrative',
      },
      {
        step: '4',
        title: 'USCIS Filing',
        description: 'Submit with premium processing',
      },
      {
        step: '5',
        title: 'Visa Issuance',
        description: 'Consular processing or status change',
      },
    ],

    urgencyTitle: '🌟 Premium Processing Available',
    urgencyMessage: '15-day decision with premium processing. Start early to gather strong evidence. Project start dates approaching fast.',

    whyChooseTitle: 'Why Choose Vasquez Law for O-1',
    whyChoosePoints: [
      'Artists, athletes, and executives approved',
      'Evidence strategy development',
      'Recommendation letter guidance',
      'RFE response expertise',
      'Agent petition experience',
      'Green card transition planning',
      'Entertainment industry knowledge',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">O-1 Eligibility Criteria</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-xl font-bold text-purple-400 mb-4">O-1A Criteria (3 of 8)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Receipt of major awards</li>
              <li>• Membership in elite associations</li>
              <li>• Published material about you</li>
              <li>• Judging work of others</li>
              <li>• Original scientific/business contributions</li>
              <li>• Authorship of scholarly articles</li>
              <li>• Critical/essential capacity</li>
              <li>• High salary/remuneration</li>
            </ul>
          </div>
          <div className="bg-pink-900/20 p-6 rounded-lg border border-pink-500/30">
            <h3 className="text-xl font-bold text-pink-400 mb-4">O-1B Arts Criteria (3 of 6)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Lead/starring roles</li>
              <li>• Critical reviews/recognition</li>
              <li>• Lead role for distinguished organizations</li>
              <li>• Major commercial/critical success</li>
              <li>• Recognition from experts</li>
              <li>• High salary compared to others</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common O-1 Professions</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Sciences & Tech</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• AI/ML researchers</li>
                <li>• Biotech scientists</li>
                <li>• Software architects</li>
                <li>• Data scientists</li>
                <li>• Medical researchers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Business</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Startup founders</li>
                <li>• C-suite executives</li>
                <li>• Management consultants</li>
                <li>• Investment professionals</li>
                <li>• Marketing experts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Arts & Entertainment</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Fashion designers</li>
                <li>• Chefs and restaurateurs</li>
                <li>• Musicians and DJs</li>
                <li>• Film/TV professionals</li>
                <li>• Digital content creators</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">O-1 vs Other Work Visas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Aspect</th>
                <th className="py-3 px-4">O-1</th>
                <th className="py-3 px-4">H-1B</th>
                <th className="py-3 px-4">L-1</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Cap/Lottery</td>
                <td className="py-3 px-4">No cap</td>
                <td className="py-3 px-4">85,000 annual cap</td>
                <td className="py-3 px-4">No cap</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Duration</td>
                <td className="py-3 px-4">3 years + unlimited extensions</td>
                <td className="py-3 px-4">6 years maximum</td>
                <td className="py-3 px-4">5-7 years maximum</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Requirements</td>
                <td className="py-3 px-4">Extraordinary ability</td>
                <td className="py-3 px-4">Bachelor's + specialty</td>
                <td className="py-3 px-4">Company transfer</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Flexibility</td>
                <td className="py-3 px-4">Multiple employers/agent</td>
                <td className="py-3 px-4">Single employer</td>
                <td className="py-3 px-4">Same company only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="O-1 Extraordinary Ability Visa"
      subtitle="For Leaders in Their Fields"
      description="Elite visa classification for individuals with extraordinary achievements in sciences, arts, business, athletics, or entertainment."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
