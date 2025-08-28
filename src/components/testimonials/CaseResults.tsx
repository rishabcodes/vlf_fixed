import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Scale, Shield } from 'lucide-react';

interface CaseResult {
  id: string;
  type: string;
  amount?: string;
  outcome: string;
  description: string;
  icon: React.ReactNode;
  practiceArea: string;
}

const caseResults: CaseResult[] = [
  {
    id: '1',
    type: 'Personal Injury Settlement',
    amount: '$1.2 Million',
    outcome: 'Settled',
    description:
      'Car accident resulting in permanent injuries. Client received full compensation for medical bills, lost wages, and pain & suffering.',
    icon: <TrendingUp className="w-6 h-6" />,
    practiceArea: 'Personal Injury',
  },
  {
    id: '2',
    type: 'Deportation Defense',
    outcome: 'Case Dismissed',
    description:
      'Successfully defended client facing deportation. All removal proceedings terminated, client granted permanent residence.',
    icon: <Shield className="w-6 h-6" />,
    practiceArea: 'Immigration',
  },
  {
    id: '3',
    type: 'Workers Compensation',
    amount: '$850,000',
    outcome: 'Won at Trial',
    description:
      'Construction worker suffered severe back injury. Secured lifetime medical benefits and disability compensation.',
    icon: <Scale className="w-6 h-6" />,
    practiceArea: 'Workers Comp',
  },
  {
    id: '4',
    type: 'Family-Based Immigration',
    outcome: '15 Green Cards Approved',
    description:
      'Successfully reunited extended family through multiple petition processes. All family members now permanent residents.',
    icon: <Users className="w-6 h-6" />,
    practiceArea: 'Immigration',
  },
  {
    id: '5',
    type: 'Criminal Defense',
    outcome: 'Not Guilty',
    description:
      'Client facing serious felony charges. After thorough investigation and trial, jury returned not guilty verdict on all counts.',
    icon: <Scale className="w-6 h-6" />,
    practiceArea: 'Criminal Defense',
  },
  {
    id: '6',
    type: 'Medical Malpractice',
    amount: '$2.5 Million',
    outcome: 'Settled',
    description:
      'Surgical error resulted in permanent disability. Negotiated substantial settlement covering lifetime care needs.',
    icon: <TrendingUp className="w-6 h-6" />,
    practiceArea: 'Personal Injury',
  },
];

export default function CaseResults() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-charcoal mb-4">Notable Case Results</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While past results don't guarantee future outcomes, our track record demonstrates
              our commitment to fighting for our clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {caseResults.map(result => (
              <Card key={result.id}

                className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                className="p-3 bg-brand-skyblue/10 rounded-lg text-brand-skyblue">
                      {result.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500">{result.practiceArea}</span>
                  </div>

                  <h3 className="font-bold text-lg text-brand-charcoal mb-2">{result.type}</h3>

                  {result.amount && (
                    <p className="text-2xl font-bold text-brand-crimson mb-2">{result.amount}</p>
                  )}

                  <p className="text-brand-skyblue font-semibold mb-3">{result.outcome}</p>

                  <p className="text-gray-600 text-sm leading-relaxed">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistics Summary */}
          <div className="bg-brand-charcoal rounded-lg p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-brand-gold">$50M+</p>
                <p className="text-sm mt-2">Total Recovered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-gold">95%</p>
                <p className="text-sm mt-2">Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-gold">10,000+</p>
                <p className="text-sm mt-2">Cases Won</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-gold">30+</p>
                <p className="text-sm mt-2">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Disclaimer:</strong> The case results presented here are meant to provide
              information about the cases handled by our firm. These results do not guarantee or
              predict a similar outcome in any future case. Each case is unique and must be
              evaluated on its own merits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
