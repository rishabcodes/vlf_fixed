/**
 * SEO Hub Manager Component
 * UI for monitoring and controlling the MASTER ORCHESTRATOR autonomous SEO system
 * Updated to work with the new autonomous Master Orchestrator
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Pause, 
  BarChart3, 
  DollarSign, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface SEOHubStatus {
  master?: {
    isRunning: boolean;
    mode: string;
    decisionsToday: number;
    contentGenerated: number;
  };
  content?: {
    isRunning: boolean;
    todayPosts: number;
    queueLength: number;
  };
  distribution?: {
    isRunning: boolean;
    platformsActive: string[];
    postsDistributed: number;
  };
  mode: string;
  message: string;
  isRunning: boolean;
  config: any;
  todayPosts: number;
  maxDailyPosts: number;
  remainingToday: number;
  queueLength: number;
  budget: {
    daily: {
      used: number;
      budget: number;
      percentage: string;
    };
    monthly: {
      used: number;
      budget: number;
      percentage: string;
    };
    alerts: {
      dailyAlert: boolean;
      dailyExceeded: boolean;
      monthlyAlert: boolean;
      monthlyExceeded: boolean;
    };
  };
}

export function SEOHubManager() {
  const [status, setStatus] = useState<SEOHubStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch status
  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/seo-hub?action=status');
      const result = await response.json();
      
      if (result.success) {
        setStatus(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch status');
        }
};

  // Start orchestrator
  const handleStart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/seo-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start-autonomous' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage('🚀 Master Orchestrator ACTIVATED - Fully Autonomous Mode!');
        await fetchStatus();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to start SEO Hub');
    } finally {
      setLoading(false);
        }
};

  // Stop orchestrator
  const handleStop = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/seo-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stop-autonomous' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage('Master Orchestrator stopped - System offline');
        await fetchStatus();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to stop SEO Hub');
    } finally {
      setLoading(false);
        }
};

  // Generate daily content manually
  const handleGenerateDaily = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/seo-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'run-once' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage(`Master Orchestrator cycle complete: ${result.data?.message || 'Success'}`);
        await fetchStatus();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to generate content');
    } finally {
      setLoading(false);
        }
};

  // Auto-refresh status every 30 seconds
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!status) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading SEO Hub status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              MASTER ORCHESTRATOR - Autonomous SEO System
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={status.isRunning ? "success" : "secondary"}>
                {status.isRunning ? 'Running' : 'Stopped'}
              </Badge>
              {status.isRunning ? (
                <Button 
                  onClick={handleStop} 
                  disabled={loading}
                  variant="outline"
                  size="sm"
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Stop
                </Button>
              ) : (
                <Button 
                  onClick={handleStart} 
                  disabled={loading}
                  variant="default"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {successMessage && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Budget alerts */}
      {status.budget.alerts.dailyExceeded && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Daily budget exceeded! Content generation paused.</AlertDescription>
        </Alert>
      )}
      
      {status.budget.alerts.monthlyAlert && !status.budget.alerts.monthlyExceeded && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Monthly budget {status.budget.monthly.percentage}% used. Consider reducing generation frequency.
          </AlertDescription>
        </Alert>
      )}

      {/* Master Orchestrator Status */}
      {status.mode === 'AUTONOMOUS' && (
        <Card className="border-green-500 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              AUTONOMOUS MODE ACTIVE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Master Brain</p>
                <p className="font-semibold">{status.master?.isRunning ? '🧠 Thinking' : '💤 Sleeping'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Decisions Today</p>
                <p className="font-semibold">{status.master?.decisionsToday || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Content Created</p>
                <p className="font-semibold">{status.master?.contentGenerated || 0}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {status.message || 'System is making autonomous decisions without human intervention'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Posts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Today's Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {status.todayPosts} / {status.maxDailyPosts}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {status.remainingToday} remaining today
            </p>
            {status.remainingToday > 0 && (
              <Button 
                onClick={handleGenerateDaily}
                disabled={loading || !status.isRunning}
                size="sm"
                className="mt-2 w-full"
                variant="outline"
              >
                Generate Now
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Daily Budget */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Daily Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${status.budget.daily.used.toFixed(2)}
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>Budget: ${status.budget.daily.budget}</span>
                <span>{status.budget.daily.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className={`h-2 rounded-full ${
                    parseFloat(status.budget.daily.percentage) > 90 ? 'bg-red-500' :
                    parseFloat(status.budget.daily.percentage) > 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, parseFloat(status.budget.daily.percentage))}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Budget */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Monthly Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${status.budget.monthly.used.toFixed(2)}
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>Budget: ${status.budget.monthly.budget}</span>
                <span>{status.budget.monthly.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className={`h-2 rounded-full ${
                    parseFloat(status.budget.monthly.percentage) > 90 ? 'bg-red-500' :
                    parseFloat(status.budget.monthly.percentage) > 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, parseFloat(status.budget.monthly.percentage))}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Status */}
      {status.queueLength > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Content Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {status.queueLength} items in queue waiting to be processed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
