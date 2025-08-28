'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CalculatorForm from '@/components/calculators/calculator-form';
import CalculatorResults from '@/components/calculators/calculator-results';

interface CalculatorResult {
  calculatorType: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  recommendations: string[];
  disclaimer: string;
  timestamp: Date;
  estimatedAccuracy: number;
  followUpActions: {
    action: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    timeframe?: string;
  }[];
}
import {
  Calculator,
  Car,
  Globe,
  Hammer,
  Gavel,
  Heart,
  DollarSign,
  Clock,
  Users,
  Building,
  Phone,
  ArrowRight,
} from 'lucide-react';

const calculatorTypes = [
  {
    id: 'personal-injury',
    name: 'Personal Injury Calculator',
    description: 'Estimate potential compensation for your personal injury case',
    icon: Car,
    color: 'blue',
    features: [
      'Settlement estimation',
      'Pain & suffering calculation',
      'Economic damages',
      'Comparative negligence',
    ],
    practiceArea: 'Personal Injury',
    estimatedTime: '2-4 years',
  },
  {
    id: 'immigration',
    name: 'Immigration Assessment',
    description: 'Assess your immigration case timeline, costs, and success probability',
    icon: Globe,
    color: 'green',
    features: [
      'Processing times',
      'Success probability',
      'Cost estimation',
      'Requirements checklist',
    ],
    practiceArea: 'Immigration',
    estimatedTime: '6 months - 10+ years',
  },
  {
    id: 'workers-compensation',
    name: "Workers' Compensation Calculator",
    description: "Calculate potential workers' compensation benefits",
    icon: Hammer,
    color: 'orange',
    features: ['Weekly benefits', 'Medical coverage', 'Disability ratings', 'Vocational rehab'],
    practiceArea: "Workers' Compensation",
    estimatedTime: '6 months - 2 years',
  },
  {
    id: 'criminal-defense',
    name: 'Criminal Sentencing Estimator',
    description: 'Estimate potential sentences and costs for criminal charges',
    icon: Gavel,
    color: 'red',
    features: ['Sentence estimation', 'Probation likelihood', 'Cost analysis', 'Outcome scenarios'],
    practiceArea: 'Criminal Defense',
    estimatedTime: '3 months - 2 years',
  },
  {
    id: 'family-law',
    name: 'Family Law Calculator',
    description: 'Calculate child support, spousal support, and property division',
    icon: Heart,
    color: 'purple',
    features: ['Child support', 'Spousal support', 'Property division', 'Custody factors'],
    practiceArea: 'Family Law',
    estimatedTime: '6 months - 2 years',
  },
];

export default function CalculatorsPage() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculatorResult | null>(null);

  const handleCalculatorSelect = (calculatorId: string) => {
    setSelectedCalculator(calculatorId);
    setCalculationResult(null);
  };

  const handleResultGenerated = (result: CalculatorResult) => {
    setCalculationResult(result);
  };

  const handleNewCalculation = () => {
    setCalculationResult(null);
  };

  const handleScheduleConsultation = () => {
    // Scroll to contact form or open modal
    window.location.href = '/contact?ref=calculator';
  };

  const handleBackToSelection = () => {
    setSelectedCalculator(null);
    setCalculationResult(null);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        icon: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700',
      },
      green: {
        icon: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        button: 'bg-green-600 hover:bg-green-700',
      },
      orange: {
        icon: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        button: 'bg-orange-600 hover:bg-orange-700',
      },
      red: {
        icon: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        button: 'bg-red-600 hover:bg-red-700',
      },
      purple: {
        icon: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700',
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (calculationResult) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBackToSelection} className="mb-4">
            ← Back to Calculators
          </Button>
        </div>

        <CalculatorResults
          result={calculationResult}
                onNewCalculation={handleNewCalculation}
                onScheduleConsultation={handleScheduleConsultation}
        />
      </div>
    );
  }

  if (selectedCalculator) {
    const calculator = calculatorTypes.find(c => c.id === selectedCalculator);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBackToSelection} className="mb-4">
            ← Back to Calculators
          </Button>

          {calculator && (
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{calculator.name}</h1>
              <p className="text-gray-600">{calculator.description}</p>
            </div>
          )}
        </div>

        <CalculatorForm calculatorType={selectedCalculator} onResult={handleResultGenerated} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Legal Calculators & Assessment Tools</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get instant estimates for your legal case. Our calculators provide personalized
          assessments based on North Carolina law and current legal standards.
        </p>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Instant Results</h3>
          <p className="text-sm text-gray-600">
            Get immediate estimates tailored to your situation
          </p>
        </div>

        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Free to Use</h3>
          <p className="text-sm text-gray-600">No cost, no obligation assessments</p>
        </div>

        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Expert Guidance</h3>
          <p className="text-sm text-gray-600">Based on decades of legal experience</p>
        </div>

        <div className="text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="font-semibold mb-2">Local Law</h3>
          <p className="text-sm text-gray-600">Calculations based on NC state law</p>
        </div>
      </div>

      {/* Calculator Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {calculatorTypes.map(calculator => {
          const Icon = calculator.icon;
          const colors = getColorClasses(calculator.color);

          return (
            <Card
              key={calculator.id}
              className={`hover:shadow-lg transition-shadow ${colors.border}`}
            >
              <CardHeader className={colors.bg}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-white rounded-lg">
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{calculator.name}</CardTitle>
                    <p className="text-sm text-gray-600">{calculator.practiceArea}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600">{calculator.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Features:</h4>
                  <ul className="text-sm space-y-1">
                    {calculator.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Typical timeline: {calculator.estimatedTime}</span>
                </div>

                <Button
                  onClick={() => handleCalculatorSelect(calculator.id)}
                  className={`w-full ${colors.button}`}
                >
                  Start Calculator
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Expert Legal Advice?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            While our calculators provide valuable estimates, every case is unique. Schedule a free
            consultation to discuss your specific situation with our experienced attorneys.
          </p>
          <Button
            onClick={handleScheduleConsultation}
            variant="secondary"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Phone className="h-4 w-4 mr-2" />
            Schedule Free Consultation
          </Button>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Important Disclaimer</h3>
        <p className="text-sm text-gray-600">
          These calculators provide estimates based on general legal principles and typical case
          outcomes. Actual results may vary significantly based on specific facts, jurisdiction,
          applicable law changes, and many other factors. The results should not be considered legal
          advice. For accurate assessment of your case, please consult with a qualified attorney.
        </p>
      </div>
    </div>
  );
}
