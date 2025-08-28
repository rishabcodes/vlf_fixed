'use client';

import { useState, useEffect } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Play,
  Pause,
  Square,
  Plus,
  BarChart3,
  Users,
  TrendingUp,
  Activity,
  Target,
  RefreshCw,
} from 'lucide-react';
import { ABTestConfig, ABTestResult } from '@/lib/ab-testing/ab-test-engine';
import { formatDistanceToNow } from 'date-fns';

export default function ABTestingPage() {
  const [tests, setTests] = useState<ABTestConfig[]>([]);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<ABTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/ab-testing/tests');
      const data = await response.json();

      if (data.success) {
        setTests(data.tests);
      }
    } catch (error) {
      logger.error('Failed to fetch A/B tests:', error);
    } finally {
      setIsLoading(false);
        }
};

  const fetchTestResults = async (testId: string) => {
    try {
      const response = await fetch(`/api/ab-testing/tests/${testId}`);
      const data = await response.json();

      if (data.success) {
        setTestResults(data.results);
      }
    } catch (error) {
      logger.error('Failed to fetch test results:', error);
        }
};

  const handleTestAction = async (testId: string, action: string) => {
    try {
      const response = await fetch(`/api/ab-testing/tests/${testId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        alert(`Test ${action}ed successfully`);
        fetchTests();
      }
    } catch (error) {
      logger.error(`Failed to ${action} test:`, error);
        }
};

  // Removed unused calculateWinner function - can be added back when needed

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">A/B Testing Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Optimize content and conversions through data-driven testing
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchTests}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New A/B Test</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p className="text-gray-600">
                  A/B test creation form would be implemented here with fields for: test name,
                  variants, targeting rules, metrics, and duration.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Tests</p>
                <p className="text-2xl font-bold">
                  {tests.filter(t => t.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Tests</p>
                <p className="text-2xl font-bold">
                  {tests.filter(t => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Uplift</p>
                <p className="text-2xl font-bold">+12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold">25,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tests Management */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          <TabsTrigger value="draft">Draft Tests</TabsTrigger>
          <TabsTrigger value="all">All Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {tests
            .filter(t => t.status === 'active')
            .map(test => (
              <TestCard
                key={test.id}
                test={test}
                onAction={handleTestAction}
                onViewResults={() => {
                  setSelectedTest(test.id);
                  fetchTestResults(test.id);
                }}
              />
            ))}
          {tests.filter(t => t.status === 'active').length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No active tests found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {tests
            .filter(t => t.status === 'completed')
            .map(test => (
              <TestCard
                key={test.id}
                test={test}
                onAction={handleTestAction}
                onViewResults={() => {
                  setSelectedTest(test.id);
                  fetchTestResults(test.id);
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {tests
            .filter(t => t.status === 'draft')
            .map(test => (
              <TestCard
                key={test.id}
                test={test}
                onAction={handleTestAction}
                onViewResults={() => {
                  setSelectedTest(test.id);
                  fetchTestResults(test.id);
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {tests.map(test => (
            <TestCard
              key={test.id}
              test={test}
                onAction={handleTestAction}
                onViewResults={() => {
                setSelectedTest(test.id);
                fetchTestResults(test.id);
              }}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Test Results Modal */}
      {selectedTest && (
        <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Test Results</DialogTitle>
            </DialogHeader>
            <TestResults results={testResults} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function TestCard({
  test,
  onAction,
  onViewResults,
}: {
  test: ABTestConfig;
  onAction: (testId: string, action: string) => void;
  onViewResults: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'draft':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
        }
};

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {test.name}
              <Badge variant="outline" className="capitalize">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(test.status)} mr-1`} />
                {test.status}
              </Badge>
            </CardTitle>
            {test.description && <p className="text-gray-600 mt-1">{test.description}</p>}
          </div>

          <div className="flex gap-2">
            {test.status === 'draft' && (
              <Button size="sm" onClick={() => onAction(test.id, 'start')}>
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
            {test.status === 'active' && (
              <>
                <Button size="sm" variant="outline" onClick={() => onAction(test.id, 'pause')}>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button size="sm" variant="outline" onClick={() => onAction(test.id, 'complete')}>
                  <Square className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              </>
            )}
            {test.status === 'paused' && (
              <Button size="sm" onClick={() => onAction(test.id, 'start')}>
                <Play className="h-4 w-4 mr-1" />
                Resume
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onViewResults}>
              <BarChart3 className="h-4 w-4 mr-1" />
              Results
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Variants</p>
            <p className="font-semibold">{test.variants.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Traffic</p>
            <p className="font-semibold">{test.targetingRules.traffic}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Primary Metric</p>
            <p className="font-semibold">{test.metrics.primary}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold">
              {test.duration.endDate
                ? formatDistanceToNow(test.duration.endDate)
                : `${test.duration.maxDuration} days max`}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Variants:</p>
          <div className="flex flex-wrap gap-2">
            {test.variants.map(variant => (
              <Badge key={variant.id} variant="secondary">
                {variant.name} ({variant.weight}%)
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TestResults({ results }: { results: ABTestResult[] }) {
  const winner =
    results.length > 1
      ? results.reduce((best, current) =>
          current.conversionRate > best.conversionRate ? current : best
        )
      : null;

  return (
    <div className="space-y-6">
      {results.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No results available yet</p>
      ) : (
        <>
          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map(result => (
              <Card
                key={result.variant}

                className={winner?.variant === result.variant ? 'ring-2 ring-green-500' : ''}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Variant {result.variant}
                    {winner?.variant === result.variant && (
                      <Badge className="bg-green-500">Winner</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold">
                      {(result.conversionRate * 100).toFixed(2)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Sample Size</p>
                    <p className="font-semibold">{result.sampleSize.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Uplift</p>
                    <p
                      className={`font-semibold ${
                        result.uplift > 0
                          ? 'text-green-600'
                          : result.uplift < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {result.uplift > 0 ? '+' : ''}
                      {result.uplift.toFixed(1)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Statistical Significance</p>
                    <Badge variant={result.statisticalSignificance ? 'default' : 'secondary'}>
                      {result.statisticalSignificance ? 'Significant' : 'Not Significant'}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Confidence Interval</p>
                    <p className="text-sm">
                      [{(result.confidenceInterval.lower * 100).toFixed(2)}%,{' '}
                      {(result.confidenceInterval.upper * 100).toFixed(2)}%]
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistical Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Statistical Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Test Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Participants:</span>
                      <span className="font-medium">
                        {results.reduce((sum, r) => sum + r.sampleSize, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Conversions:</span>
                      <span className="font-medium">
                        {results.reduce((sum, r) => sum + r.value, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best Performing Variant:</span>
                      <span className="font-medium">{winner?.variant || 'No clear winner'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {winner?.statisticalSignificance ? (
                      <p>
                        ✅ Test has reached statistical significance. Consider implementing the
                        winning variant.
                      </p>
                    ) : (
                      <p>
                        ⏳ Test needs more data to reach statistical significance. Continue running.
                      </p>
                    )}
                    {results.some(r => r.sampleSize < 1000) && (
                      <p>
                        📊 Some variants have low sample sizes. Consider running longer for more
                        reliable results.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
