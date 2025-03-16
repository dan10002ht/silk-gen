import { cronManager } from '../config/cron.js';

// Import all cron jobs here
import './jobs/cleanupTopics.js';

// Initialize cron jobs
const initializeCronJobs = () => {
  console.log('🚀 Initializing cron jobs...');

  // Start all registered jobs
  cronManager.startAll();

  // Log initial status
  const status = cronManager.getAllJobsStatus();
  console.log('📊 Cron jobs status:', JSON.stringify(status, null, 2));
};

// Graceful shutdown
const shutdownCronJobs = () => {
  console.log('🛑 Shutting down cron jobs...');
  cronManager.stopAll();
};

export { initializeCronJobs, shutdownCronJobs };
