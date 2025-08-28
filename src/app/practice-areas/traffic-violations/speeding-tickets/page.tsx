import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Speeding Ticket Attorney NC & FL | Traffic Defense | Vasquez Law',
  description: 'Fight speeding tickets to save points, insurance, and license. Radar defense, PJC, reduction negotiations.',
  keywords: 'speeding ticket lawyer, traffic ticket attorney, radar defense, PJC',
};

export default function SpeedingTicketsPage() {
  const services = [
    {
      title: 'Basic Speeding',
      description: 'Standard speeding violations',
      icon: '🚗',
      features: [
        '1-9 mph over limit',
        '10-15 mph over limit', 
        '16-25 mph over limit',
        'School zone speeding',
        'Work zone violations',
        'Residential speeding',
      ],
    },
    {
      title: 'Serious Speeding',
      description: 'High-speed and criminal violations',
      icon: '🚨',
      features: [
        'Over 80 mph violations',
        '25+ mph over limit',
        'Reckless driving speeds',
        'Racing accusations',
        'Criminal speeding',
        'License suspension risk',
      ],
    },
    {
      title: 'Radar/Laser Defense',
      description: 'Challenging speed measurement',
      icon: '📡',
      features: [
        'Calibration challenges',
        'Training requirements',
        'Weather interference',
        'Multiple vehicle errors',
        'Pacing inaccuracies',
        'Equipment malfunctions',
      ],
    },
    {
      title: 'Point Avoidance',
      description: 'Protecting driving record',
      icon: '📉',
      features: [
        'Prayer for Judgment',
        'Improper equipment',
        'Defensive driving school',
        'Point calculation',
        'Insurance protection',
        'Record expungement',
      ],
    },
    {
      title: 'CDL Protection',
      description: 'Commercial driver defense',
      icon: '🚚',
      features: [
        'Serious violation defense',
        'CSA score protection',
        'Employment preservation',
        'Out-of-service orders',
        'Federal regulations',
        'Interstate issues',
      ],
    },
    {
      title: 'Court Representation',
      description: 'Complete traffic court handling',
      icon: '⚖️',
      features: [
        'Appear without you',
        'Plea negotiations',
        'Trial representation',
        'Continuance requests',
        'Fine reductions',
        'Payment plans',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Should I just pay my speeding ticket?',
      answer: 'No! Paying admits guilt, adds points to your license, and increases insurance for 3 years. Even minor tickets can cost thousands in increased premiums. Always explore options to reduce or dismiss charges first.',
    },
    {
      question: 'How many points for speeding in NC?',
      answer: 'Depends on speed and location: 10 mph or less in 55+ zone = 2 points, over 55 mph = 3 points, school/work zone = 3 points. 12 points in 3 years = license suspension. Insurance points differ and affect rates more.',
    },
    {
      question: 'What is a Prayer for Judgment Continued (PJC)?',
      answer: 'NC allows PJC where you plead guilty but judge doesn\'t enter judgment. No DMV points, but counts for insurance unless only one per household every 3 years. Limited uses - save for serious violations. Not available for 25+ over.',
    },
    {
      question: 'Can radar be wrong?',
      answer: 'Yes! Radar/laser errors occur from improper calibration, untrained operators, weather conditions, multiple vehicles, radio interference, and mechanical issues. We examine maintenance records, training certificates, and operation procedures.',
    },
    {
      question: 'How much do insurance rates increase?',
      answer: 'NC insurance points: 1 point = 30% increase, 2 points = 45%, 3 points = 60%, 4 points = 80%. One ticket can cost $300-500 extra per year for 3 years. Multiple tickets can make you uninsurable.',
    },
    {
      question: 'Do I have to appear in court?',
      answer: 'Usually no. We appear for you on most traffic matters, saving you time off work. You may need to appear for serious charges like reckless driving or if going to trial. We handle everything else.',
    },
  ];

  const content = {
    introduction: `Don't let a speeding ticket derail your life. What seems like a simple fine becomes thousands in insurance increases, license suspension risk, and employment problems. Our traffic attorneys fight every ticket, protecting your driving record, insurance rates, and livelihood. From basic speeding to serious violations, we know how to win.`,

    processTitle: 'Ticket Defense Process',
    process: [
      {
        step: '1',
        title: 'Ticket Analysis',
        description: 'Review charges and driving record',
      },
      {
        step: '2',
        title: 'Defense Strategy',
        description: 'Identify best approach for dismissal/reduction',
      },
      {
        step: '3',
        title: 'Court Appearance',
        description: "We appear so you don't have to",
      },
      {
        step: '4',
        title: 'Negotiation',
        description: 'Prosecutor discussions for best outcome',
      },
      {
        step: '5',
        title: 'Resolution',
        description: 'Dismissal, reduction, or trial victory',
      },
    ],

    urgencyTitle: '📅 Court Date Approaching Fast',
    urgencyMessage: 'Missing court means automatic guilt, license suspension, and arrest warrant. Even if planning to fight alone, get legal advice first.',

    whyChooseTitle: 'Why Choose Vasquez Law for Traffic Tickets',
    whyChoosePoints: [
      'Appear in court so you don\'t miss work',
      'Former prosecutors know the system',
      'Radar and laser defense expertise',
      'Relationships with prosecutors statewide',
      'Insurance impact minimization',
      'Payment plan arrangements',
      'Handle tickets statewide',
      'Transparent representation process',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Speeding Penalties</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Speed Over Limit</th>
                <th className="py-3 px-4">DMV Points</th>
                <th className="py-3 px-4">Insurance Points</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">10 mph or less (55+ zone)</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">1</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Over 55 mph (any)</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">1</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Over 75 mph (any)</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">2</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Over 80 mph (any)</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">3</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Over 55 + 15 mph over</td>
                <td className="py-3 px-4">Suspension</td>
                <td className="py-3 px-4">4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Insurance Cost Reality</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-2xl font-bold text-red-400 mb-4">One Ticket\'s True Cost</h3>
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div>
              <p className="text-3xl font-bold">$490</p>
              <p className="text-gray-300">Average yearly increase</p>
            </div>
            <div>
              <p className="text-3xl font-bold">3 Years</p>
              <p className="text-gray-300">Stays on insurance</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-400">$1,470</p>
              <p className="text-gray-300">Total insurance cost</p>
            </div>
          </div>
          <p className="text-gray-300 mt-6 text-sm">Plus court costs, fines, and attorney fees if you don\'t fight it properly</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Speeding Ticket Defense"
      subtitle="Protect Your Record & Wallet"
      description="Don\'t just pay that ticket! Our attorneys fight to dismiss or reduce charges, saving you points, insurance increases, and your license."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
