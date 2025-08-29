'use client';

import { useState } from 'react';
import { format } from 'date-fns';


interface CalculatorInputs {
  medicalBills: number;
  futureMedialCare: number;
  lostWages: number;
  futureLostEarnings: number;
  propertyDamage: number;
  painMultiplier: number;
}

export function SettlementCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    medicalBills: 0,
    futureMedialCare: 0,
    lostWages: 0,
    futureLostEarnings: 0,
    propertyDamage: 0,
    painMultiplier: 2,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateSettlement = () => {
    const economicDamages =
      inputs.medicalBills +
      inputs.futureMedialCare +
      inputs.lostWages +
      inputs.futureLostEarnings +
      inputs.propertyDamage;

    const painAndSuffering = economicDamages * inputs.painMultiplier;
    const totalEstimate = economicDamages + painAndSuffering;

    return {
      economic: economicDamages,
      painAndSuffering: painAndSuffering,
      total: totalEstimate,
      lowRange: totalEstimate * 0.7,
      highRange: totalEstimate * 1.3,
    };
  };

  const results = calculateSettlement();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
        Personal Injury Settlement Calculator
      </h2>

      <p className="text-gray-600 mb-8">
        This calculator provides a rough estimate of your potential settlement value. Every case is
        unique - contact us for a personalized evaluation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medical Expenses */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Medical Bills
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.medicalBills} 
              onChange={e => setInputs({ ...inputs, medicalBills: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Future Medical Care */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estimated Future Medical Care
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.futureMedialCare} 
              onChange={e => setInputs({ ...inputs, futureMedialCare: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Lost Wages */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lost Wages to Date
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.lostWages} 
              onChange={e => setInputs({ ...inputs, lostWages: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Future Lost Earnings */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Future Lost Earnings
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.futureLostEarnings} 
              onChange={e => setInputs({ ...inputs, futureLostEarnings: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Property Damage */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Property Damage</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.propertyDamage} 
              onChange={e => setInputs({ ...inputs, propertyDamage: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Pain & Suffering Multiplier */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Injury Severity (1-5)
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={inputs.painMultiplier}
            onChange={e => setInputs({ ...inputs, painMultiplier: Number(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Minor</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowResults(true)}

                className="w-full mt-8 px-6 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-all"
      >
        Calculate Settlement Estimate
      </button>

      {showResults && (
        <div
className="mt-8 bg-gray-50 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">Estimated Settlement Range</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Economic Damages:</span>
              <span className="font-semibold">{formatCurrency(results.economic)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pain & Suffering:</span>
              <span className="font-semibold">{formatCurrency(results.painAndSuffering)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Estimate:</span>
                <span className="text-[#6B1F2E]">{formatCurrency(results.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[#C9974D] bg-current/10 rounded-lg p-4">
            <p className="text-sm font-semibold text-[#6B1F2E] mb-2">Potential Settlement Range:</p>
            <p className="text-2xl font-bold text-[#6B1F2E]">
              {formatCurrency(results.lowRange)} - {formatCurrency(results.highRange)}
            </p>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p className="font-semibold mb-2">Important Disclaimers:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>This is only an estimate based on general formulas</li>
              <li>Actual settlements vary based on many factors</li>
              <li>Insurance policy limits may cap recovery</li>
              <li>North Carolina's contributory negligence laws apply</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-[#6B1F2E] mb-4">Get a Free Case Evaluation</p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-all"
            >
              Contact an Attorney
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
