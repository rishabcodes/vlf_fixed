export const analyticsEngine = {
  async getRealTimeMetrics() {
    return { activeUsers: 0, pageViews: 0, events: [], sessions: 0 };
  }
};
