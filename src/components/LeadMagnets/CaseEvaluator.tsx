'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Calculator, AlertCircle } from 'lucide-react';

interface CaseEvaluatorProps {
  onComplete?: (data: Record<string, unknown>) => void;
}

export default function CaseEvaluator({ onComplete }: CaseEvaluatorProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    caseType: '',
    severity: '',
    timeline: '',
    hasEvidence: '',
    previousAttempts: '',
    email: '',
    phone: '',
  });
  const [result, setResult] = useState<{
    successProbability: number;
    estimatedValue: string;
    estimatedTime: string;
    nextSteps: string[];
  } | null>(null);

  const steps = [
    {
      title: 'What type of case do you have?',
      field: 'caseType',
      options: [
        { value: 'personal-injury', label: 'Personal Injury', icon: '🚗', desc: undefined },
        { value: 'immigration', label: 'Immigration', icon: '🌎', desc: undefined },
        { value: 'criminal-defense', label: 'Criminal Defense', icon: '⚖️', desc: undefined },
        { value: 'family-law', label: 'Family Law', icon: '👨‍👩‍👧‍👦', desc: undefined },
        { value: 'workers-comp', label: "Workers' Compensation", icon: '🏗️', desc: undefined },
      ],
    },
    {
      title: 'How would you rate the severity?',
      field: 'severity',
      options: [
        { value: 'minor', label: 'Minor', desc: 'Minimal impact on daily life', icon: undefined },
        {
          value: 'moderate',
          label: 'Moderate',
          desc: 'Some disruption to normal activities',
          icon: undefined,
        },
        {
          value: 'severe',
          label: 'Severe',
          desc: 'Significant impact on life/work',
          icon: undefined,
        },
        {
          value: 'critical',
          label: 'Critical',
          desc: 'Life-changing consequences',
          icon: undefined,
        },
      ],
    },
    {
      title: 'When did this occur?',
      field: 'timeline',
      options: [
        { value: 'recent', label: 'Less than 30 days ago', icon: undefined, desc: undefined },
        { value: 'months', label: '1-6 months ago', icon: undefined, desc: undefined },
        { value: 'year', label: '6-12 months ago', icon: undefined, desc: undefined },
        { value: 'older', label: 'More than 1 year ago', icon: undefined, desc: undefined },
      ],
    },
    {
      title: 'Do you have documentation/evidence?',
      field: 'hasEvidence',
      options: [
        {
          value: 'extensive',
          label: 'Yes, extensive documentation',
          icon: undefined,
          desc: undefined,
        },
        { value: 'some', label: 'Yes, some documentation', icon: undefined, desc: undefined },
        { value: 'minimal', label: 'Very little documentation', icon: undefined, desc: undefined },
        { value: 'none', label: 'No documentation yet', icon: undefined, desc: undefined },
      ],
    },
  ];

  const calculateResult = () => {
    // Simulated case evaluation logic
    const scores = {
      'personal-injury': { base: 85, multiplier: 1.2 },
      immigration: { base: 80, multiplier: 1.1 },
      'criminal-defense': { base: 75, multiplier: 1.3 },
      'family-law': { base: 82, multiplier: 1.0 },
      'workers-comp': { base: 88, multiplier: 1.15 },
    };

    const severityMultipliers = {
      minor: 0.7,
      moderate: 1.0,
      severe: 1.3,
      critical: 1.5,
    };

    const evidenceBonus = {
      extensive: 15,
      some: 10,
      minimal: 5,
      none: 0,
    };

    const caseScore = scores[formData.caseType as keyof typeof scores] || scores['personal-injury'];
    const severityMult =
      severityMultipliers[formData.severity as keyof typeof severityMultipliers] || 1;
    const evidencePoints = evidenceBonus[formData.hasEvidence as keyof typeof evidenceBonus] || 0;

    const successProbability = Math.min(95, (caseScore.base + evidencePoints) * severityMult);

    // Use a deterministic value based on form data instead of Math.random()
    const baseValue = formData.hasPriorCase === 'yes' ? 500000 : 250000;
    const severityMultiplier = formData.severity === 'very-serious' ? 2 : 1;
    const calculatedValue = baseValue * severityMultiplier;
    
    const estimatedValue =
      formData.caseType === 'personal-injury'
        ? `$${calculatedValue.toLocaleString()}`
        : 'Case-specific outcome';

    const estimatedTime = formData.caseType === 'immigration' ? '3-18 months' : '2-12 months';

    setResult({
      successProbability: Math.round(successProbability),
      estimatedValue,
      estimatedTime,
      nextSteps: [
        'Schedule a free consultation',
        'Gather all relevant documentation',
        'Avoid discussing case on social media',
        'Keep detailed records of all expenses',
      ],
    });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult();
        }
};

  const handleSelect = (value: string) => {
    const currentStep = steps[step];
    if (!currentStep) return;
    
    setFormData({ ...formData, [currentStep.field]: value });
    setTimeout(handleNext, 300);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8 text-gold-500" />
          Free Case Evaluation
        </CardTitle>
        <CardDescription className="text-lg">
          Get an instant assessment of your case in under 2 minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!result ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Step {step + 1} of {steps.length}
                </span>
                <span>{Math.round(((step + 1) / steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-burgundy-600 to-gold-500 h-2 rounded-full"
                 }
                 %` }}
                />
              </div>
            </div>

            {/* Question */}
            <>
              <div
                key={step}}
               }
               }
              >
                <h3 className="text-2xl font-bold mb-6">{steps[step]?.title || ''}</h3>
                <div className="space-y-3">
                  {(steps[step]?.options || []).map(option => (
                    <button
                      key={option.value}

                onClick={() => handleSelect(option.value)}

                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-burgundy-500 hover:bg-burgundy-50 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {option.icon && <span className="text-2xl">{option.icon}</span>}
                          <div>
                            <p className="font-semibold">{option.label}</p>
                            {option.desc && <p className="text-sm text-gray-600">{option.desc}</p>}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          </>
        ) : (
          /* Results */
          <div
className="text-center"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Your Case Evaluation Results</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {result.successProbability}%
                  </div>
                  <p className="text-gray-700">Success Probability</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {result.estimatedValue}
                  </div>
                  <p className="text-gray-700">Potential Value</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {result.estimatedTime}
                  </div>
                  <p className="text-gray-700">Estimated Timeline</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-yellow-800">Important Note</p>
                    <p className="text-sm text-yellow-700">
                      This is a preliminary assessment. A consultation with our attorneys will
                      provide a more accurate evaluation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Recommended Next Steps:</h4>
                <ul className="space-y-2">
                  {result.nextSteps.map((step: string, index: number) => (
                    <li key={index}

                className="flex items-start gap-2">
                      <span
                className="text-burgundy-600 font-bold">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-burgundy-700 hover:bg-burgundy-800"
                onClick={() => onComplete?.(result)}
              >
                Schedule Free Consultation Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setStep(0);
                  setResult(null);
                  setFormData({
                    caseType: '',
                    severity: '',
                    timeline: '',
                    hasEvidence: '',
                    previousAttempts: '',
                    email: '',
                    phone: '',
                  });
                }}
              >
                Start New Evaluation
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
