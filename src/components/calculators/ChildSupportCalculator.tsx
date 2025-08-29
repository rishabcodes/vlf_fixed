'use client';

import { useState } from 'react';
import { format } from 'date-fns';


interface ChildSupportInputs {
  custodialIncome: number;
  nonCustodialIncome: number;
  numberOfChildren: number;
  overnightsWithNonCustodial: number;
  healthInsurance: number;
  childcare: number;
  extraordinaryExpenses: number;
}

export function ChildSupportCalculator() {
  const [inputs, setInputs] = useState<ChildSupportInputs>({
    custodialIncome: 0,
    nonCustodialIncome: 0,
    numberOfChildren: 1,
    overnightsWithNonCustodial: 0,
    healthInsurance: 0,
    childcare: 0,
    extraordinaryExpenses: 0,
  });

  const [showResults, setShowResults] = useState(false);

  // NC Child Support Guidelines percentages
  const getBasicObligationPercentage = (children: number) => {
    switch (children) {
      case 1:
        return 0.17;
      case 2:
        return 0.25;
      case 3:
        return 0.29;
      case 4:
        return 0.31;
      case 5:
        return 0.33;
      default:
        return 0.35;
        }
};

  const calculateSupport = () => {
    // Combined monthly income
    const combinedIncome = inputs.custodialIncome + inputs.nonCustodialIncome;

    // Income shares
    const nonCustodialShare = inputs.nonCustodialIncome / combinedIncome;
    const custodialShare = inputs.custodialIncome / combinedIncome;

    // Basic child support obligation
    const basicPercentage = getBasicObligationPercentage(inputs.numberOfChildren);
    const basicObligation = combinedIncome * basicPercentage;

    // Additional expenses
    const totalAdditional =
      inputs.healthInsurance + inputs.childcare + inputs.extraordinaryExpenses;

    // Non-custodial parent's share
    const nonCustodialBasic = basicObligation * nonCustodialShare;
    const nonCustodialAdditional = totalAdditional * nonCustodialShare;

    // Parenting time adjustment (simplified)
    const overnightPercentage = inputs.overnightsWithNonCustodial / 365;
    const parentingTimeCredit = overnightPercentage > 0.25 ? nonCustodialBasic * 0.1 : 0;

    // Total monthly obligation
    const totalMonthly = Math.max(
      0,
      nonCustodialBasic + nonCustodialAdditional - parentingTimeCredit
    );

    return {
      basicObligation,
      nonCustodialShare: nonCustodialShare * 100,
      custodialShare: custodialShare * 100,
      nonCustodialBasic,
      nonCustodialAdditional,
      parentingTimeCredit,
      totalMonthly,
      totalAnnual: totalMonthly * 12,
    };
  };

  const results = calculateSupport();

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
        North Carolina Child Support Calculator
      </h2>

      <p className="text-gray-600 mb-8">
        This calculator provides an estimate based on NC Child Support Guidelines. Actual amounts
        may vary based on specific circumstances.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Custodial Parent Income */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Custodial Parent Monthly Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.custodialIncome}
              onChange={e => setInputs({ ...inputs, custodialIncome: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Non-Custodial Parent Income */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Non-Custodial Parent Monthly Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.nonCustodialIncome}
              onChange={e => setInputs({ ...inputs, nonCustodialIncome: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Number of Children */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Children
          </label>
          <select
            value={inputs.numberOfChildren}
            onChange={e => setInputs({ ...inputs, numberOfChildren: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n}

                value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Overnights with Non-Custodial */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Annual Overnights with Non-Custodial Parent
          </label>
          <input
            type="number"
            value={inputs.overnightsWithNonCustodial}
            onChange={e => setInputs({ ...inputs, overnightsWithNonCustodial: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
            placeholder="0"
            max="365"
          />
          <p className="text-xs text-gray-500 mt-1">
            Standard visitation is typically 80-100 overnights/year
          </p>
        </div>

        {/* Health Insurance */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Health Insurance for Children
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.healthInsurance}
              onChange={e => setInputs({ ...inputs, healthInsurance: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        {/* Childcare Costs */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Childcare Costs
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={inputs.childcare}
              onChange={e => setInputs({ ...inputs, childcare: Number(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9974D] focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowResults(true)}
        className="w-full mt-8 px-6 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-all"
      >
        Calculate Child Support
      </button>

      {showResults && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">
            Estimated Child Support Obligation
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Basic Support Obligation:</span>
              <span className="font-semibold">{formatCurrency(results.basicObligation)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Non-Custodial Parent Share:</span>
              <span className="font-semibold">{results.nonCustodialShare.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Additional Expenses Share:</span>
              <span className="font-semibold">
                {formatCurrency(results.nonCustodialAdditional)}
              </span>
            </div>
            {results.parentingTimeCredit > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Parenting Time Credit:</span>
                <span className="font-semibold text-green-600">
                  -{formatCurrency(results.parentingTimeCredit)}
                </span>
              </div>
            )}
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Monthly Child Support:</span>
                <span className="text-[#6B1F2E]">{formatCurrency(results.totalMonthly)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Annual Total:</span>
                <span>{formatCurrency(results.totalAnnual)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[#C9974D] bg-current/10 rounded-lg p-4">
            <p className="text-sm font-semibold text-[#6B1F2E] mb-2">Payment Schedule:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Weekly:</span>
                <span className="font-semibold ml-2">
                  {formatCurrency(results.totalMonthly / 4.33)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Bi-Weekly:</span>
                <span className="font-semibold ml-2">
                  {formatCurrency(results.totalMonthly / 2.17)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p className="font-semibold mb-2">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>This is an estimate only - courts have discretion</li>
              <li>Special circumstances may affect the amount</li>
              <li>Support can be modified when circumstances change</li>
              <li>Both parents must provide financial affidavits</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-[#6B1F2E] mb-4">
              Need Help with Child Support?
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-all"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
