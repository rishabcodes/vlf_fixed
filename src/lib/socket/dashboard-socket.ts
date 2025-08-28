import { Server as SocketIOServer } from 'socket.io';
import { logger } from '@/lib/safe-logger';
import { Server as HTTPServer } from 'http';

interface DashboardData {
  agents: Array<{
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
  }>;
  metrics: {
    visitorCount: number;
    conversationsActive: number;
    reviewsToday: number;
    contentCreated: number;
    rankingChanges: number;
    socialEngagement: number;
    leadGeneration: number;
    conversionRate: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'content' | 'review' | 'lead' | 'call' | 'social';
    message: string;
    timestamp: Date;
    success: boolean;
  }>;
  systemHealth: {
    uptime: number;
    performance: number;
    errors: number;
    lastUpdate: Date;
  };
}

class DashboardSocketManager {
  private io: SocketIOServer | null = null;
  private updateInterval: NodeJS.Timeout | null = null;
  private connectedClients = new Set<string>();

  initialize(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin:
          process.env.NODE_ENV === 'production'
            ? ['https://vasquezlawnc.com', 'https://www.vasquezlawnc.com']
            : ['http://localhost:3000'],
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', socket => {
      logger.info(`Dashboard client connected: ${socket.id}`);
      this.connectedClients.add(socket.id);

      // Send initial data
      socket.emit('dashboard:update', this.generateMockData());

      socket.on('dashboard:subscribe', () => {
        logger.info(`Client ${socket.id} subscribed to dashboard updates`);
        socket.emit('dashboard:update', this.generateMockData());
      });

      socket.on('dashboard:unsubscribe', () => {
        logger.info(`Client ${socket.id} unsubscribed from dashboard updates`);
      });

      socket.on('dashboard:refresh', () => {
        logger.info(`Client ${socket.id} requested data refresh`);
        socket.emit('dashboard:update', this.generateMockData());
      });

      socket.on('disconnect', () => {
        logger.info(`Dashboard client disconnected: ${socket.id}`);
        this.connectedClients.delete(socket.id);
      });
    });

    // Start periodic updates
    this.startPeriodicUpdates();
  }

  private startPeriodicUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(() => {
      if (this.connectedClients.size > 0) {
        this.broadcastUpdate();
      }
    }, 10000); // Update every 10 seconds
  }

  private broadcastUpdate() {
    if (!this.io) return;

    const data = this.generateMockData();
    this.io.emit('dashboard:update', data);

    // Simulate agent activities
    if (Math.random() > 0.7) {
      const activity = this.generateRandomActivity();
      this.io.emit('activity:new', activity);
    }

    // Simulate metrics updates
    if (Math.random() > 0.5) {
      this.io.emit('metrics:update', data.metrics);
    }
  }

  private generateMockData(): DashboardData {
    return {
      agents: [
        {
          id: 'seo-agent-001',
          name: 'SEO Content Creator',
          task: this.getRandomTask('seo'),
          status: this.getRandomStatus(),
          progress: Math.floor(Math.random() * 100),
          lastActivity: new Date(),
          performance: {
            success: 124 + Math.floor(Math.random() * 10),
            errors: Math.floor(Math.random() * 3),
            efficiency: 95 + Math.floor(Math.random() * 5),
          },
        },
        {
          id: 'social-agent-002',
          name: 'Social Media Manager',
          task: this.getRandomTask('social'),
          status: this.getRandomStatus(),
          progress: Math.floor(Math.random() * 100),
          lastActivity: new Date(Date.now() - Math.random() * 10 * 60000),
          performance: {
            success: 89 + Math.floor(Math.random() * 10),
            errors: Math.floor(Math.random() * 2),
            efficiency: 93 + Math.floor(Math.random() * 7),
          },
        },
        {
          id: 'review-agent-003',
          name: 'Review Response Bot',
          task: this.getRandomTask('review'),
          status: this.getRandomStatus(),
          progress: Math.floor(Math.random() * 100),
          lastActivity: new Date(Date.now() - Math.random() * 5 * 60000),
          performance: {
            success: 67 + Math.floor(Math.random() * 5),
            errors: Math.floor(Math.random() * 1),
            efficiency: 98 + Math.floor(Math.random() * 2),
          },
        },
        {
          id: 'lead-agent-004',
          name: 'Lead Qualification Agent',
          task: this.getRandomTask('lead'),
          status: this.getRandomStatus(),
          progress: Math.floor(Math.random() * 100),
          lastActivity: new Date(Date.now() - Math.random() * 3 * 60000),
          performance: {
            success: 156 + Math.floor(Math.random() * 15),
            errors: Math.floor(Math.random() * 4),
            efficiency: 96 + Math.floor(Math.random() * 4),
          },
        },
      ],
      metrics: {
        visitorCount: 20 + Math.floor(Math.random() * 50),
        conversationsActive: 3 + Math.floor(Math.random() * 8),
        reviewsToday: 5 + Math.floor(Math.random() * 12),
        contentCreated: 15 + Math.floor(Math.random() * 20),
        rankingChanges: 2 + Math.floor(Math.random() * 5),
        socialEngagement: 100 + Math.floor(Math.random() * 150),
        leadGeneration: 18 + Math.floor(Math.random() * 25),
        conversionRate: 12 + Math.floor(Math.random() * 15),
      },
      recentActivity: this.generateRecentActivity(),
      systemHealth: {
        uptime: 99.8 + Math.random() * 0.2,
        performance: 95 + Math.floor(Math.random() * 5),
        errors: Math.floor(Math.random() * 3),
        lastUpdate: new Date(),
      },
    };
  }

  private getRandomTask(type: string): string {
    const tasks = {
      seo: [
        'Optimizing blog post for "personal injury lawyer"',
        'Creating meta descriptions for practice area pages',
        'Building backlinks from legal directories',
        'Analyzing competitor SEO strategies',
        'Generating local SEO content',
      ],
      social: [
        'Posting client testimonial to Facebook',
        'Sharing legal tip on LinkedIn',
        'Responding to Instagram comments',
        'Scheduling Twitter content for the week',
        'Creating social media graphics',
      ],
      review: [
        'Responding to 5-star Google review',
        'Addressing client feedback on Google',
        'Monitoring review platforms for new reviews',
        'Sending review request to satisfied client',
        'Analyzing review sentiment trends',
      ],
      lead: [
        'Qualifying new contact form submission',
        'Following up with potential client',
        'Scoring lead based on case potential',
        'Routing lead to appropriate attorney',
        'Updating CRM with lead information',
      ],
    };

    const taskList = tasks[type as keyof typeof tasks] || tasks.seo;
    return taskList[Math.floor(Math.random() * taskList.length)] || 'Processing task...';
  }

  private getRandomStatus(): 'idle' | 'working' | 'completed' | 'error' {
    const statuses: Array<'idle' | 'working' | 'completed' | 'error'> = [
      'idle',
      'working',
      'completed',
      'error',
    ];
    const weights = [0.2, 0.4, 0.35, 0.05]; // weighted probability

    const random = Math.random();
    let sum = 0;

    for (let i = 0; i < weights.length && i < statuses.length; i++) {
      sum += weights[i] || 0;
      const status = statuses[i];
      if (random <= sum && status) {
        return status;
      }
    }

    return 'idle';
  }

  private generateRandomActivity(): {
    id: string;
    type: 'content' | 'review' | 'lead' | 'call' | 'social';
    message: string;
    timestamp: Date;
    success: boolean;
  } {
    const activities = [
      { type: 'content', message: 'New blog post published about workers compensation' },
      { type: 'review', message: 'Responded to positive Google review' },
      { type: 'lead', message: 'New qualified lead from immigration landing page' },
      { type: 'social', message: 'Posted case result to LinkedIn' },
      { type: 'content', message: 'Improved ranking for "Charlotte personal injury lawyer"' },
    ];

    const index = Math.floor(Math.random() * activities.length);
    const activity = activities[index];
    
    if (!activity) {
      return {
        id: `activity-${Date.now()}-${Math.random()}`,
        type: 'content',
        message: 'System activity',
        timestamp: new Date(),
        success: true,
      };
    }

    return {
      id: `activity-${Date.now()}-${Math.random()}`,
      type: activity.type as 'content' | 'review' | 'lead' | 'call' | 'social',
      message: activity.message,
      timestamp: new Date(),
      success: Math.random() > 0.1, // 90% success rate
    };
  }

  private generateRecentActivity() {
    const activities: Array<{
      id: string;
      type: 'content' | 'review' | 'lead' | 'call' | 'social';
      message: string;
      timestamp: Date;
      success: boolean;
    }> = [];
    for (let i = 0; i < 10; i++) {
      const activity = this.generateRandomActivity();
      activities.push({
        ...activity,
        timestamp: new Date(Date.now() - i * 3 * 60000), // Space 3 minutes apart
      });
    }
    return activities;
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    if (this.io) {
      this.io.close();
      this.io = null;
    }
    this.connectedClients.clear();
  }
}

export const dashboardSocketManager = new DashboardSocketManager();
