'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  FileText, 
  Calendar,
  Target,
  Info,
  Percent,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

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

interface CalculatorResultsProps {
  result: CalculatorResult;
  onNewCalculation: () => void;
  onScheduleConsultation: () => void;
}

export default function CalculatorResults({ 
  result, 
  onNewCalculation, 
  onScheduleConsultation 
}: CalculatorResultsProps) {
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 80) return { variant: 'success' as const, label: 'High Accuracy' };
    if (accuracy >= 60) return { variant: 'warning' as const, label: 'Moderate Accuracy' };
    return { variant: 'secondary' as const, label: 'Estimate Only' };
  };

  const renderPersonalInjuryResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Economic Damages</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Number(result.results.economicDamages) || 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pain & Suffering</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(Number(result.results.painAndSufferingAmount) || 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Estimated Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(Number(result.results.adjustedTotal) || 0)}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settlement Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Conservative Estimate:</span>
              <span className="text-xl font-bold text-orange-600">
                {formatCurrency(Number((result.results.settlementRange as any)?.low) || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Optimistic Estimate:</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(Number((result.results.settlementRange as any)?.high) || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-medium">Estimated Net to Client:</span>
              <span className="text-xl font-bold text-blue-600">
                {formatCurrency(Number(result.results.estimatedNettoClient) || 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderImmigrationResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Probability</p>
                <p className="text-2xl font-bold text-green-600">
                  {Number(result.results.successProbability) || 0}%
                </p>
              </div>
              <Percent className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estimated Timeline</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Number(result.results.estimatedTimeframe) || 0} mo
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(Number((result.results.estimatedCost as any)?.total) || 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Attorney Fees:</span>
              <span className="font-medium">{formatCurrency(Number((result.results.estimatedCost as any)?.attorney) || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Filing Fees:</span>
              <span className="font-medium">{formatCurrency(Number((result.results.estimatedCost as any)?.filing) || 0)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(Number((result.results.estimatedCost as any)?.total) || 0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {(() => {
        const nextSteps = result.results.nextSteps;
        return nextSteps && Array.isArray(nextSteps) && nextSteps.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              {(nextSteps as string[]).map((step: string, index: number) => (
                <li key={index}

                className="text-sm">{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
        ) : null;
      })()}
    </div>
  );

  const renderWorkersCompResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Benefit</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Number(result.results.weeklyBenefit) || 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Compensation</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(Number(result.results.totalCompensation) || 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Medical Benefits</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(Number(result.results.medicalBenefits) || 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Benefits</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(Number(result.results.totalBenefits) || 0)}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Benefit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Benefit Duration:</p>
              <p className="text-gray-600">{String(result.results.duration || 0)} weeks</p>
            </div>
            <div>
              <p className="font-medium">Medical Coverage:</p>
              <p className="text-gray-600">{String(result.results.maxMedicalBenefit || 'N/A')}</p>
            </div>
            <div>
              <p className="font-medium">Vocational Rehabilitation:</p>
              <p className="text-gray-600">{String(result.results.vocationalRehab || 'N/A')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCriminalDefenseResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estimated Sentence</p>
                <p className="text-2xl font-bold text-red-600">
                  {Number(result.results.estimatedSentenceMonths) || 0} months
                </p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Probation Likelihood</p>
                <p className="text-2xl font-bold text-green-600">
                  {Number(result.results.probationLikelihood) || 0}%
                </p>
              </div>
              <Percent className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Costs</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Number((result.results.estimatedCosts as any)?.total) || 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Possible Outcomes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Array.isArray(result.results.possibleOutcomes) && (result.results.possibleOutcomes as string[]).map((outcome: string, index: number) => (
              <Badge key={index} variant="outline" className="justify-center p-2">
                {outcome}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFamilyLawResults = () => {
    const calculationType = result.inputs.calculationType;
    
    return (
      <div className="space-y-6">
        {calculationType === 'child_support' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Child Support</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(Number(result.results.monthlyChildSupport) || 0)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Annual Support</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(Number(result.results.annualSupport) || 0)}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Income Share</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(Number(result.results.payorIncomeShare) || 0).toFixed(1)}%
                    </p>
                  </div>
                  <Percent className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {calculationType === 'spousal_support' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Support</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(Number(result.results.recommendedMonthlySupport) || 0)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Number(result.results.estimatedDurationYears) || 0} years
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(Number(result.results.totalSupportAmount) || 0)}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {calculationType === 'property_division' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Marital Estate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(Number(result.results.netMaritalEstate) || 0)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Share</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(Number(result.results.estimatedShare) || 0)}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const renderResults = () => {
    switch (result.calculatorType) {
      case 'personal_injury':
        return renderPersonalInjuryResults();
      case 'immigration':
        return renderImmigrationResults();
      case 'workers_compensation':
        return renderWorkersCompResults();
      case 'criminal_defense':
        return renderCriminalDefenseResults();
      case 'family_law':
        return renderFamilyLawResults();
      default:
        return <div>Results not available for this calculator type.</div>;
        }
};

  const accuracyBadge = getAccuracyBadge(result.estimatedAccuracy);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Calculation Results
              </CardTitle>
              <p className="text-gray-600">
                Calculated {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
              </p>
            </div>
            <Badge {...accuracyBadge}>
              {accuracyBadge.label} ({result.estimatedAccuracy}%)
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Results */}
      {renderResults()}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation: string, index: number) => (
                <li key={index}

                className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span
                className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Follow-up Actions */}
      {result.followUpActions && result.followUpActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.followUpActions.map((action: any, index: number) => (
                <div key={index}

                className="flex items-start gap-3 p-3 border rounded-lg">
                  <div
                className={`w-2 h-2 rounded-full mt-2 ${
                    action.priority === 'high' ? 'bg-red-500' :
                    action.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium capitalize">{action.action.replace(/_/g, ' ')}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    {action.timeframe && (
                      <p className="text-xs text-gray-500 mt-1">
                        Timeline: {action.timeframe}
                      </p>
                    )}
                  </div>
                  <Badge variant={
                    action.priority === 'high' ? 'destructive' :
                    action.priority === 'medium' ? 'warning' :
                    'secondary'
                  }>
                    {action.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> {result.disclaimer}
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onScheduleConsultation} size="lg" className="flex-1">
          <Phone className="h-4 w-4 mr-2" />
          Schedule Free Consultation
        </Button>
        <Button onClick={onNewCalculation} variant="outline" size="lg" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          New Calculation
        </Button>
      </div>
    </div>
  );
}
