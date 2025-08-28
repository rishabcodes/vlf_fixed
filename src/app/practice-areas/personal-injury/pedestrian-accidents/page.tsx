import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedestrian Accident Attorney NC & FL | Hit by Car Lawyer | Vasquez Law',
  description: 'Hit by a car while walking? Crosswalk injuries, hit-and-run, catastrophic damages. Maximum compensation for pedestrians.',
  keywords: 'pedestrian accident lawyer, hit by car attorney, crosswalk accident, pedestrian injury',
};

export default function PedestrianHitByCarPage() {
  const services = [
    {
      title: 'Crosswalk Accidents',
      description: 'Protected crossing injuries',
      icon: '🚸',
      features: [
        'Marked crosswalk violations',
        'Unmarked crosswalk rights',
        'Signal violations',
        'Right-turn collisions',
        'Left-turn failures',
        'School crossing zones',
      ],
    },
    {
      title: 'Sidewalk & Parking',
      description: 'Non-roadway pedestrian strikes',
      icon: '🚶',
      features: [
        'Sidewalk vehicle intrusions',
        'Parking lot accidents',
        'Driveway backover cases',
        'Bus stop injuries',
        'Construction zone strikes',
        'Private property incidents',
      ],
    },
    {
      title: 'Hit and Run',
      description: 'Fleeing driver cases',
      icon: '🚨',
      features: [
        'Driver identification',
        'Witness location',
        'Video evidence collection',
        'Uninsured motorist claims',
        'Crime victim compensation',
        'Police coordination',
      ],
    },
    {
      title: 'Child Pedestrians',
      description: 'Special protections for minors',
      icon: '👶',
      features: [
        'School zone accidents',
        'Ice cream truck cases',
        'Residential street strikes',
        'Playground adjacencies',
        'Halloween incidents',
        'Special duty of care',
      ],
    },
    {
      title: 'Catastrophic Injuries',
      description: 'Life-altering pedestrian trauma',
      icon: '🏥',
      features: [
        'Traumatic brain injuries',
        'Spinal cord damage',
        'Multiple fractures',
        'Internal organ damage',
        'Amputations',
        'Permanent disabilities',
      ],
    },
    {
      title: 'Wrongful Death',
      description: 'Fatal pedestrian accidents',
      icon: '⚫',
      features: [
        'Family compensation',
        'Funeral expenses',
        'Lost income recovery',
        'Pain and suffering',
        'Punitive damages',
        'Estate representation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Do pedestrians always have the right of way?',
      answer: 'Not always, but drivers must exercise extreme care around pedestrians. Pedestrians have right of way in crosswalks, but must also follow traffic signals. Even if pedestrian violated rules, drivers must try to avoid hitting them. We fight contributory negligence defenses.',
    },
    {
      question: 'What if I was hit outside a crosswalk?',
      answer: 'You may still have a case! Drivers must watch for pedestrians everywhere. Jaywalking doesn\'t eliminate driver responsibility, especially if they were speeding, distracted, or impaired. Many "unmarked crosswalks" exist at intersections.',
    },
    {
      question: 'How serious are pedestrian accident injuries?',
      answer: 'Extremely serious. Without vehicle protection, pedestrians suffer traumatic brain injuries, spinal damage, fractures, internal injuries, and death. Average hospital stay exceeds 10 days. Many victims never fully recover. Compensation must reflect lifetime impacts.',
    },
    {
      question: 'What compensation can pedestrians receive?',
      answer: 'Medical expenses (emergency, surgery, rehabilitation), lost wages, future earnings, pain and suffering, disability, disfigurement, loss of enjoyment, and sometimes punitive damages. Fatal cases include funeral costs and family losses. We pursue maximum recovery.',
    },
    {
      question: 'What if the driver fled the scene?',
      answer: 'Hit-and-run is common in pedestrian accidents. We investigate aggressively: canvas for witnesses, obtain surveillance video, check nearby damage reports, coordinate with police. Uninsured motorist coverage may apply. Crime victim funds available.',
    },
    {
      question: 'How long do I have to file a claim?',
      answer: 'Generally 3 years for injury in North Carolina and 4 years in Florida, but evidence disappears quickly. Surveillance video gets overwritten, witnesses forget, skid marks fade. Contact us immediately to preserve crucial evidence.',
    },
  ];

  const content = {
    introduction: `Pedestrian accidents are among the most devastating collisions, with walkers facing multi-ton vehicles without protection. A simple walk to the store, jog through the neighborhood, or crossing to your car can become life-changing tragedy. Drivers who fail to watch for pedestrians - whether distracted, speeding, or impaired - must be held accountable for the catastrophic injuries they cause.`,

    processTitle: 'Pedestrian Accident Case Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Medical care and scene preservation',
      },
      {
        step: '2',
        title: 'Evidence Collection',
        description: 'Video, witnesses, vehicle damage',
      },
      {
        step: '3',
        title: 'Liability Investigation',
        description: 'Driver conduct and road conditions',
      },
      {
        step: '4',
        title: 'Medical Documentation',
        description: 'Full injury and prognosis assessment',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Negotiate or litigate for full compensation',
      },
    ],

    urgencyTitle: '🚨 Evidence Disappears Fast',
    urgencyMessage: 'Surveillance footage overwrites in days. Witnesses disappear. Skid marks fade. The driver\'s insurance company is already investigating. You need representation NOW.',

    whyChooseTitle: 'Why Choose Vasquez Law for Pedestrian Accidents',
    whyChoosePoints: [
      'Catastrophic injury experience',
      'Accident reconstruction experts',
      'Medical professional network',
      'Aggressive evidence preservation',
      'Fighting contributory negligence defenses',
      'Maximum compensation focus',
      'No recovery, no fee',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Pedestrian Accident Statistics (2025)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <div className="text-4xl font-bold text-red-400 mb-2">7,500+</div>
            <div className="text-lg text-white mb-2">Annual Deaths</div>
            <p className="text-gray-400 text-sm">Pedestrians killed on U.S. roads</p>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <div className="text-4xl font-bold text-yellow-400 mb-2">76,000+</div>
            <div className="text-lg text-white mb-2">Injuries Yearly</div>
            <p className="text-gray-400 text-sm">Pedestrians requiring emergency care</p>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <div className="text-4xl font-bold text-blue-400 mb-2">75%</div>
            <div className="text-lg text-white mb-2">Night Accidents</div>
            <p className="text-gray-400 text-sm">Occur in dark conditions</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Driver Violations</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Failure to Yield</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Crosswalk violations</li>
                <li>• Turn conflicts</li>
                <li>• Signal disobedience</li>
                <li>• Right-of-way errors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Dangerous Driving</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Distracted driving</li>
                <li>• Excessive speed</li>
                <li>• Impaired operation</li>
                <li>• Aggressive behavior</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC & FL Pedestrian Laws</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-3">North Carolina</h3>
            <p className="text-gray-300 text-sm mb-3">Contributory negligence state - any fault can bar recovery</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Must use crosswalks when available</li>
              <li>• Yield to vehicles outside crosswalks</li>
              <li>• Follow traffic signals</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-3">Florida</h3>
            <p className="text-gray-300 text-sm mb-3">Comparative fault - recovery reduced by percentage of fault</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Crosswalk right-of-way</li>
              <li>• Sidewalk requirements</li>
              <li>• Increased penalties in school zones</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Pedestrian Accident Claims"
      subtitle="Fighting for Walkers Hit by Vehicles"
      description="Catastrophic injuries from pedestrian accidents demand aggressive representation. We fight for maximum compensation for victims."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
