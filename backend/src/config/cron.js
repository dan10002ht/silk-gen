import cron from 'node-cron';
import environment from './environment';

// Predefined schedules
export const SCHEDULES = {
  EVERY_MINUTE: '* * * * *',
  EVERY_5_MINUTES: '*/5 * * * *',
  EVERY_10_MINUTES: '*/10 * * * *',
  EVERY_30_MINUTES: '*/30 * * * *',
  HOURLY: '0 * * * *',
  DAILY_3AM: '0 3 * * *',
  WEEKLY: '0 0 * * 0',
  MONTHLY: '0 0 1 * *',
};

// Cron job manager
class CronManager {
  constructor() {
    this.jobs = new Map();
    this.isRunning = false;
  }

  addJob(name, schedule, task, options = {}) {
    if (this.jobs.has(name)) {
      throw new Error(`Job ${name} already exists`);
    }

    const job = {
      schedule,
      task,
      options: {
        timezone: options.timezone || 'UTC',
        onError: options.onError || this.defaultErrorHandler,
      },
    };

    this.jobs.set(name, job);
    console.log(`Registered cron job: ${name} with schedule: ${schedule}`);
  }

  start() {
    if (this.isRunning) {
      console.log('Cron manager is already running');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting cron manager...');

    // Start each job
    for (const [name, job] of this.jobs.entries()) {
      const cronJob = cron.schedule(
        job.schedule,
        async () => {
          console.log(`🕒 Starting cron job: ${name}`);
          try {
            await job.task();
            console.log(`✅ Completed cron job: ${name}`);
          } catch (error) {
            await job.options.onError(error);
          }
        },
        job.options
      );

      // Store the cron job instance
      this.jobs.set(name, { ...job, instance: cronJob });
    }

    console.log('✅ Cron manager is running');
  }

  stop() {
    if (!this.isRunning) {
      console.log('Cron manager is not running');
      return;
    }

    console.log('🛑 Stopping cron manager...');

    // Stop each job
    for (const [name, job] of this.jobs.entries()) {
      if (job.instance) {
        job.instance.stop();
        console.log(`Stopped cron job: ${name}`);
      }
    }

    this.isRunning = false;
    console.log('✅ Cron manager stopped');
  }

  defaultErrorHandler(error) {
    console.error('Cron job error:', error);
  }

  // Get status of a specific job
  getJobStatus(name) {
    const job = this.jobs.get(name);
    if (!job) return null;

    return {
      name,
      schedule: job.schedule,
      isRunning: !!job.instance?.running,
      options: job.options,
    };
  }

  // Get status of all jobs
  getAllJobsStatus() {
    const status = {};
    for (const [name] of this.jobs) {
      status[name] = this.getJobStatus(name);
    }
    return status;
  }
}

// Create a single instance of CronManager
const cronManager = new CronManager();

// Export the cron manager instance and schedules
export { cronManager };
