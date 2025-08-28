import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Shield, AlertCircle, FileText, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Accident Lawyers NC | Auto Injury Attorneys | FREE Consultation',
  description:
    "Injured in a car accident? NC's top-rated auto accident attorneys. No fees unless we win. 98% success rate. Available 24/7. Call 1-844-YO-PELEO.",
  keywords:
    'car accident lawyer NC, auto accident attorney, personal injury lawyer, car crash attorney, accident injury lawyer',
};

const services = [
  {
    title: 'Accident Investigation',
    description: 'Thorough investigation to prove liability and maximize your compensation.',
    icon: <Shield className="w-6 h-6" />,
    features: [
      'Police report analysis',
      'Witness interviews',
      'Accident reconstruction',
      'Photo/video evidence collection',
      'Expert testimony coordination',
    ],
  },
  {
    title: 'Insurance Negotiations',
    description: 'Aggressive negotiation with insurance companies to get you fair compensation.',
    icon: <FileText className="w-6 h-6" />,
    features: [
      'Dealing with adjusters',
      'Demand letter preparation',
      'Settlement negotiations',
      'Bad faith claims',
      'Uninsured motorist claims',
    ],
  },
  {
    title: 'Medical Support',
    description: 'Connect you with top medical providers and handle all medical documentation.',
    icon: <AlertCircle className="w-6 h-6" />,
    features: [
      'Medical referrals',
      'Treatment coordination',
      'Medical record collection',
      'Future care planning',
      'Expert medical opinions',
    ],
  },
  {
    title: 'Maximum Compensation',
    description: 'Fight for every dollar you deserve for your injuries and losses.',
    icon: <DollarSign className="w-6 h-6" />,
    features: [
      'Medical expenses',
      'Lost wages',
      'Pain and suffering',
      'Property damage',
      'Future damages',
    ],
  },
];

const faqs = [
  {
    question: 'What should I do immediately after a car accident?',
    answer:
      'First, check for injuries and call 911. Move to safety if possible. Exchange information with other drivers, take photos, and get witness contact information. Seek medical attention even if you feel fine. Contact a lawyer before speaking to insurance companies.',
  },
  {
    question: 'How much does a car accident lawyer cost?',
    answer:
      'We work on a results-based structure - you pay nothing unless we win your case. We only get paid when you receive compensation. Initial consultations are always free.',
  },
  {
    question: 'How long do I have to file a car accident claim in NC?',
    answer:
      'In North Carolina, you generally have 3 years from the date of the accident to file a personal injury lawsuit. However, some circumstances can shorten this deadline. Contact us immediately to protect your rights.',
  },
  {
    question: "What if the other driver doesn't have insurance?",
    answer:
      "We can help you file an uninsured/underinsured motorist claim with your own insurance company. North Carolina requires these coverages, and we'll fight to get you compensated even if the at-fault driver has no insurance.",
  },
  {
    question: 'How much is my car accident case worth?',
    answer:
      "Case value depends on factors like injury severity, medical costs, lost wages, and impact on your life. We offer free case evaluations to estimate your claim's potential value.",
  },
];

const attorneys = [
  {
    name: 'William Vasquez',
    role: 'Senior Personal Injury Attorney',
    experience: '15+ years fighting for accident victims',
    specializations: [
      'Catastrophic injuries',
      'Wrongful death cases',
      'Multi-vehicle accidents',
      'Commercial vehicle crashes',
    ],
  },
  {
    name: 'Maria Rodriguez',
    role: 'Lead Trial Attorney',
    experience: '12+ years courtroom experience',
    specializations: [
      'Insurance bad faith',
      'Complex liability cases',
      'Brain and spinal injuries',
      'Motorcycle accidents',
    ],
  },
];

const relatedServices = [
  {
    title: 'Truck Accidents',
    description: 'Specialized representation for commercial truck accident victims.',
    link: '/practice-areas/personal-injury/truck-accidents',
    urgency: 'high' as const,
  },
  {
    title: 'Motorcycle Accidents',
    description: 'Protecting the rights of injured motorcyclists.',
    link: '/practice-areas/personal-injury/motorcycle-accidents',
  },
  {
    title: 'Wrongful Death',
    description: 'Compassionate support for families who have lost loved ones.',
    link: '/practice-areas/personal-injury/wrongful-death',
  },
];

const additionalContent = (
  <div className="space-y-12">
    {/* NC Car Accident Statistics */}
    <section>
      <h2 className="text-3xl font-bold mb-6 text-primary">
        North Carolina Car Accident Statistics
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-lg border border-primary/20">
          <h3 className="text-xl font-bold text-primary mb-3">Annual Statistics</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Over 247,000 crashes reported annually</li>
            <li>• 1,400+ fatal accidents per year</li>
            <li>• 130,000+ injuries from car accidents</li>
            <li>• $4.5 billion in economic losses</li>
          </ul>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-primary/20">
          <h3 className="text-xl font-bold text-primary mb-3">Common Causes</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Distracted driving (31%)</li>
            <li>• Speeding (27%)</li>
            <li>• Drunk driving (15%)</li>
            <li>• Failure to yield (12%)</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Types of Injuries */}
    <section>
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Common Car Accident Injuries We Handle
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          'Traumatic brain injuries',
          'Spinal cord injuries',
          'Broken bones and fractures',
          'Whiplash and neck injuries',
          'Back injuries',
          'Internal organ damage',
          'Burn injuries',
          'Psychological trauma',
          'Wrongful death',
        ].map((injury, index) => (
          <div key={index}

                className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span
                className="text-gray-300">{injury}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Why Choose Us */}
    <section>
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Why Choose Vasquez Law Firm for Your Car Accident Case?
      </h2>
      <div className="bg-primary/10 p-8 rounded-lg border border-primary/30">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-primary mb-3">Our Track Record</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ 98% success rate in car accident cases</li>
              <li>✓ $50+ million recovered for clients</li>
              <li>✓ 5,000+ accident victims helped</li>
              <li>✓ Average settlement 3x initial offers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary mb-3">Our Commitment</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ No fees unless we win</li>
              <li>✓ 24/7 availability for emergencies</li>
              <li>✓ Bilingual support (English/Spanish)</li>
              <li>✓ Free case evaluation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default function CarAccidentsPage() {
  return (
    <StandardizedPracticeAreaTemplate
      title="North Carolina Car Accident Lawyers"
      subtitle="Fighting for Maximum Compensation Since 1993"
      description="If you've been injured in a car accident, you need aggressive legal representation. Our experienced attorneys have recovered millions for accident victims across North Carolina."
      overview={{
        title: 'Expert Car Accident Representation',
        content:
          "Car accidents can change your life in an instant. Medical bills pile up, you can't work, and insurance companies pressure you to settle for less than you deserve. At Vasquez Law Firm, we level the playing field. Our experienced car accident attorneys fight tirelessly to get you the compensation you need to rebuild your life.",
        highlights: [
          'Free consultation and case evaluation',
          'No fees unless we win your case',
          '98% success rate in car accident claims',
          'Available 24/7 for accident emergencies',
          'Bilingual attorneys and staff',
          'Serving all 100 NC counties',
        ],
      }}
      services={services}
      faqs={faqs}
      attorneys={attorneys}
      relatedServices={relatedServices}
      additionalContent={additionalContent}
      cta={{
        primary: {
          text: 'Get Free Case Review',
          link: '/contact',
        },
        secondary: {
          text: '1-844-YO-PELEO',
          link: 'tel:1-844-967-3536',
        },
      }}
      metadata={{
        title: 'Car Accident Lawyers NC | Auto Injury Attorneys',
        description:
          'Top-rated car accident attorneys in North Carolina. No fees unless we win. 98% success rate.',
        keywords: 'car accident lawyer, auto accident attorney, personal injury, North Carolina',
      }}
    />
  );
}
