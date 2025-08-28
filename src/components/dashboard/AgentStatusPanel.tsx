'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from './DashboardContext';

interface AgentStatusCardProps {
  agent: {
    id: string;
    name: string;
    task: string;
    status: 'idle' | 'working' | 'completed' | 'error';
    progress: number;
    lastActivity: Date;
    performance: {
      success: number;
      errors: number;
      efficiency: number;
    };
  };
}

const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ agent }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (agent.status === 'working') {
      setIsActive(true);
      const interval = setInterval(() => {
        setIsActive(prev => !prev);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsActive(false);
    }
  }, [agent.status]);

  const getStatusColor = () => {
    switch (agent.status) {
      case 'working':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
        }
};

  const getStatusText = () => {
    switch (agent.status) {
      case 'working':
        return 'Working';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return 'Idle';
        }
};

  const getAgentIcon = () => {
    if (agent.name.toLowerCase().includes('content')) return '📝';
    if (agent.name.toLowerCase().includes('seo')) return '🔍';
    if (agent.name.toLowerCase().includes('social')) return '📱';
    if (agent.name.toLowerCase().includes('review')) return '⭐';
    if (agent.name.toLowerCase().includes('lead')) return '🎯';
    return '🤖';
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${getStatusColor().replace('bg-', 'border-l-')} transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getStatusColor()}`}
          >
            {getAgentIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{getStatusText()}</p>
          </div>
        </div>
        <div
          className={`w-3 h-3 rounded-full ${getStatusColor()} ${isActive ? 'animate-pulse' : ''}`}
        />
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 mb-1">Current Task</p>
          <p className="text-sm font-medium text-gray-900">{agent.task}</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">{agent.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getStatusColor()}`}
      style={{ width: `${agent.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-50 rounded-lg p-2">
            <div className="text-sm font-semibold text-green-600">{agent.performance.success}</div>
            <div className="text-xs text-gray-600">Success</div>
          </div>
          <div className="bg-red-50 rounded-lg p-2">
            <div className="text-sm font-semibold text-red-600">{agent.performance.errors}</div>
            <div className="text-xs text-gray-600">Errors</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="text-sm font-semibold text-blue-600">
              {agent.performance.efficiency}%
            </div>
            <div className="text-xs text-gray-600">Efficiency</div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Last activity: {new Date(agent.lastActivity).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

const AgentStatusPanel: React.FC = () => {
  const { data, isConnected } = useDashboard();
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'performance'>('status');

  const sortedAgents = [...data.agents].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'status':
        const statusOrder = { working: 0, completed: 1, error: 2, idle: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      case 'performance':
        return b.performance.efficiency - a.performance.efficiency;
      default:
        return 0;
    }
  });

  const getOverallHealth = () => {
    if (data.agents.length === 0) return 'unknown';

    const workingCount = data.agents.filter(a => a.status === 'working').length;
    const errorCount = data.agents.filter(a => a.status === 'error').length;

    if (errorCount > 0) return 'warning';
    if (workingCount > 0) return 'healthy';
    return 'idle';
  };

  const getHealthColor = () => {
    switch (getOverallHealth()) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'idle':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
        }
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agent Status Panel</h2>
          <p className={`text-sm ${getHealthColor()}`}>
            System Health: {getOverallHealth().toUpperCase()}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="status">Sort by Status</option>
            <option value="name">Sort by Name</option>
            <option value="performance">Sort by Performance</option>
          </select>

          <div className="flex items-center space-x-2">
            <div      className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
            />
            <span className="text-sm text-gray-600">{isConnected ? 'Live' : 'Offline'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAgents.map(agent => (
          <AgentStatusCard key={agent.id} agent={agent} />
        ))}
      </div>

      {data.agents.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Agents Active</h3>
          <p className="text-gray-600">Agents will appear here when they start working.</p>
        </div>
      )}
    </div>
  );
};

export default AgentStatusPanel;
