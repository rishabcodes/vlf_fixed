'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  DollarSign,
  Users,
  Home,
  School,
  Heart,
  AlertCircle,
  Download,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';


interface ChildSupportResult {
  baseSupport: number;
  healthInsurance: number;
  childcare: number;
  extraordinaryExpenses: number;
  totalMonthly: number;
  totalYearly: number;
  custodialPercentage: number;
  nonCustodialPercentage: number;
}

export default function ChildSupportCalculator() {
  // Parent incomes
  const [custodialIncome, setCustodialIncome] = useState<string>('');
  const [nonCustodialIncome, setNonCustodialIncome] = useState<string>('');

  // Number of children
  const [numberOfChildren, setNumberOfChildren] = useState<number>(1);

  // Additional expenses
  const [healthInsuranceCost, setHealthInsuranceCost] = useState<string>('');
  const [childcareCost, setChildcareCost] = useState<string>('');
  const [extraordinaryExpenses, setExtraordinaryExpenses] = useState<string>('');

  // Custody arrangement
  const [overnightsWithNonCustodial, setOvernightsWithNonCustodial] = useState<number>(104); // Every other weekend default

  // Results
  const [results, setResults] = useState<ChildSupportResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  // NC Child Support Guidelines percentages (simplified)
  const supportPercentages = {
    1: 0.17, // 17% for 1 child
    2: 0.25, // 25% for 2 children
    3: 0.29, // 29% for 3 children
    4: 0.31, // 31% for 4 children
    5: 0.33, // 33% for 5+ children
  };

  // Calculate child support
  const calculateSupport = () => {
    // Parse inputs
    const custodial = parseFloat(custodialIncome) || 0;
    const nonCustodial = parseFloat(nonCustodialIncome) || 0;
    const healthIns = parseFloat(healthInsuranceCost) || 0;
    const childcare = parseFloat(childcareCost) || 0;
    const extraordinary = parseFloat(extraordinaryExpenses) || 0;

    // Combined monthly income
    const combinedIncome = custodial + nonCustodial;

    // Income shares
    const custodialShare = combinedIncome > 0 ? custodial / combinedIncome : 0.5;
    const nonCustodialShare = combinedIncome > 0 ? nonCustodial / combinedIncome : 0.5;

    // Base child support (using NC guidelines percentages)
    const percentage =
      supportPercentages[Math.min(numberOfChildren, 5) as keyof typeof supportPercentages];
    const basicChildSupport = combinedIncome * percentage;

    // Adjust for custody time (simplified calculation)
    const custodyAdjustment = overnightsWithNonCustodial > 123 ? 0.85 : 1; // Reduction for substantial custody time

    // Calculate each parent's obligation
    const nonCustodialBaseObligation = basicChildSupport * nonCustodialShare * custodyAdjustment;

    // Add additional expenses (proportional share)
    const totalAdditionalExpenses = healthIns + childcare + extraordinary;
    const nonCustodialAdditionalShare = totalAdditionalExpenses * nonCustodialShare;

    // Total monthly obligation
    const totalMonthly = nonCustodialBaseObligation + nonCustodialAdditionalShare;

    setResults({
      baseSupport: nonCustodialBaseObligation,
      healthInsurance: healthIns * nonCustodialShare,
      childcare: childcare * nonCustodialShare,
      extraordinaryExpenses: extraordinary * nonCustodialShare,
      totalMonthly: totalMonthly,
      totalYearly: totalMonthly * 12,
      custodialPercentage: custodialShare * 100,
      nonCustodialPercentage: nonCustodialShare * 100,
    });

    setShowResults(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Generate PDF report
  const generateReport = () => {
    if (!results) return;

    // In a real implementation, this would generate a PDF
    // For now, we\'ll create a downloadable text report
    const report = `
NORTH CAROLINA CHILD SUPPORT CALCULATION REPORT
Generated: ${new Date().toLocaleDateString()}

CASE INFORMATION
Number of Children: ${numberOfChildren}
Overnight Visits with Non-Custodial Parent: ${overnightsWithNonCustodial} nights/year

INCOME INFORMATION
Custodial Parent Monthly Income: ${formatCurrency(parseFloat(custodialIncome) || 0)}
Non-Custodial Parent Monthly Income: ${formatCurrency(parseFloat(nonCustodialIncome) || 0)}
Combined Monthly Income: ${formatCurrency((parseFloat(custodialIncome) || 0) + (parseFloat(nonCustodialIncome) || 0))}

Income Share Percentages:
- Custodial Parent: ${results.custodialPercentage.toFixed(1)}%
- Non-Custodial Parent: ${results.nonCustodialPercentage.toFixed(1)}%

ADDITIONAL EXPENSES
Health Insurance: ${formatCurrency(parseFloat(healthInsuranceCost) || 0)}/month
Childcare: ${formatCurrency(parseFloat(childcareCost) || 0)}/month
Extraordinary Expenses: ${formatCurrency(parseFloat(extraordinaryExpenses) || 0)}/month

CHILD SUPPORT CALCULATION
Base Child Support: ${formatCurrency(results.baseSupport)}/month
Health Insurance Share: ${formatCurrency(results.healthInsurance)}/month
Childcare Share: ${formatCurrency(results.childcare)}/month
Extraordinary Expenses Share: ${formatCurrency(results.extraordinaryExpenses)}/month

TOTAL MONTHLY OBLIGATION: ${formatCurrency(results.totalMonthly)}
TOTAL YEARLY OBLIGATION: ${formatCurrency(results.totalYearly)}

DISCLAIMER: This calculation is an estimate based on simplified North Carolina child support guidelines. 
Actual child support orders may vary based on numerous factors not included in this calculator. 
Please consult with a qualified family law attorney for accurate calculations specific to your case.

Vasquez Law Firm, PLLC
1-866-302-3427
www.vasquezlawnc.com
    `;

    // Create download
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `child-support-calculation-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    // Use safe removal to prevent null reference errors
    if (a.parentNode) {
      a.parentNode.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Calculator className="w-10 h-10" />
            <h1 className="text-3xl font-bold">North Carolina Child Support Calculator</h1>
          </div>
          <p className="text-white/90">
            Estimate child support payments based on North Carolina guidelines. This calculator
            provides approximate amounts for informational purposes only.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="p-8">
          {/* Income Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-[#6B1F2E]" />
              Parent Income Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custodial Parent Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={custodialIncome}
                    onChange={e => setCustodialIncome(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Gross monthly income before taxes</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Non-Custodial Parent Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={nonCustodialIncome}
                    onChange={e => setNonCustodialIncome(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Gross monthly income before taxes</p>
              </div>
            </div>
          </div>

          {/* Children and Custody */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#6B1F2E]" />
              Children & Custody Arrangement
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Children
                </label>
                <select
                  value={numberOfChildren}
      onChange={e => setNumberOfChildren(parseInt(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num}

                value={num}>
                      {num} {num === 1 ? 'child' : 'children'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Overnights with Non-Custodial Parent
                </label>
                <input
                  type="number"
                  value={overnightsWithNonCustodial}
                  onChange={e => setOvernightsWithNonCustodial(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  placeholder="104"
                  min="0"
                  max="365"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Standard: 104 (every other weekend), Extended: 123+
                </p>
              </div>
            </div>
          </div>

          {/* Additional Expenses */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#6B1F2E]" />
              Additional Monthly Expenses
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Insurance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={healthInsuranceCost}
                    onChange={e => setHealthInsuranceCost(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="50"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Children's portion only</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Childcare Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={childcareCost}
                    onChange={e => setChildcareCost(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="50"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Work-related childcare</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extraordinary Expenses
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={extraordinaryExpenses}
                    onChange={e => setExtraordinaryExpenses(e.target.value)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="50"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Special needs, tutoring, etc.</p>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center mb-8">
            <button onClick={calculateSupport} className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate Child Support
            </button>
          </div>

          {/* Results Section */}
          {showResults && results && (
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Estimated Child Support Calculation
              </h2>

              {/* Income Shares */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Income Share Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Custodial Parent Share:</span>
                    <span className="font-semibold">{results.custodialPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Non-Custodial Parent Share:</span>
                    <span className="font-semibold">
                      {results.nonCustodialPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Monthly Obligation Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Child Support:</span>
                    <span className="font-semibold">{formatCurrency(results.baseSupport)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health Insurance Share:</span>
                    <span className="font-semibold">{formatCurrency(results.healthInsurance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Childcare Share:</span>
                    <span className="font-semibold">{formatCurrency(results.childcare)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Extraordinary Expenses Share:</span>
                    <span className="font-semibold">
                      {formatCurrency(results.extraordinaryExpenses)}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-gray-900">Total Monthly Payment:</span>
                      <span className="font-bold text-[#6B1F2E]">
                        {formatCurrency(results.totalMonthly)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Total Yearly Payment:</span>
                      <span>{formatCurrency(results.totalYearly)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={generateReport} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Report
                </button>
                <button
                  onClick={() => window.print()}

                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Print Results
                </button>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This calculator provides estimates based on simplified North Carolina child
                  support guidelines. Actual child support orders are determined by the court and
                  may vary significantly based on factors not included in this calculator, such as:
                </p>
                <ul className="mt-2 ml-4 text-sm text-gray-700 list-disc space-y-1">
                  <li>Deviations from guidelines for special circumstances</li>
                  <li>Self-employment income calculations</li>
                  <li>Imputed income considerations</li>
                  <li>Multiple family obligations</li>
                  <li>High or low income adjustments</li>
                </ul>
                <p className="mt-3 text-sm font-semibold text-gray-900">
                  For accurate calculations specific to your case, please consult with a qualified
                  family law attorney.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gray-100 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Need Help with Child Support Matters?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our experienced family law attorneys can help you understand your rights and
            obligations, negotiate fair agreements, and represent you in court if necessary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#6B1F2E] hover:bg-[#8B2635] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Schedule Free Consultation
            </a>
            <a
              href="tel:1-866-302-3427"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Call 1-866-302-3427
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
