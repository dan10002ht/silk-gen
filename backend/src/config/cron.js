import cron from 'node-cron';

// Schedule patterns
export const SCHEDULES = {
  EVERY_MINUTE: '* * * * *',
  EVERY_5_MINUTES: '*/5 * * * *',
  EVERY_15_MINUTES: '*/15 * * * *',
  EVERY_30_MINUTES: '*/30 * * * *',
  HOURLY: '0 * * * *',
  DAILY_MIDNIGHT: '0 0 * * *',
  DAILY_3AM: '0 3 * * *',
  WEEKLY_SUNDAY_3AM: '0 3 * * 0',
  MONTHLY_1ST_3AM: '0 3 1 * *',
};

// Cron job manager
class CronManager {
  constructor() {
    this.jobs = new Map();
    this.isEnabled = true;
  }

  // Add a new cron job
  addJob(name, schedule, task, options = {}) {
    if (this.jobs.has(name)) {
      throw new Error(`Job ${name} already exists`);
    }

    const job = cron.schedule(
      schedule,
      async () => {
        if (!this.isEnabled) return;

        try {
          console.log(`🕒 Starting cron job: ${name}`);
          await task();
          console.log(`✅ Completed cron job: ${name}`);
        } catch (error) {
          console.error(`❌ Error in cron job ${name}:`, error);
          if (options.onError) {
            await options.onError(error);
          }
        }
      },
      {
        scheduled: true,
        timezone: options.timezone || 'UTC',
      }
    );

    this.jobs.set(name, { job, schedule, task, options });
    console.log(`📅 Registered cron job: ${name} with schedule: ${schedule}`);
    return job;
  }

  // Stop a specific job
  stopJob(name) {
    const jobData = this.jobs.get(name);
    if (jobData) {
      jobData.job.stop();
      console.log(`⏹️ Stopped cron job: ${name}`);
    }
  }

  // Start a specific job
  startJob(name) {
    const jobData = this.jobs.get(name);
    if (jobData) {
      jobData.job.start();
      console.log(`▶️ Started cron job: ${name}`);
    }
  }

  // Stop all jobs
  stopAll() {
    this.isEnabled = false;
    for (const [name, jobData] of this.jobs) {
      jobData.job.stop();
    }
    console.log('⏹️ Stopped all cron jobs');
  }

  // Start all jobs
  startAll() {
    this.isEnabled = true;
    for (const [name, jobData] of this.jobs) {
      jobData.job.start();
    }
    console.log('▶️ Started all cron jobs');
  }

  // Get job status
  getJobStatus(name) {
    const jobData = this.jobs.get(name);
    if (!jobData) return null;

    return {
      name,
      schedule: jobData.schedule,
      isRunning: jobData.job.running,
      options: jobData.options,
    };
  }

  // Get all jobs status
  getAllJobsStatus() {
    const status = {};
    for (const [name] of this.jobs) {
      status[name] = this.getJobStatus(name);
    }
    return status;
  }
}

// Create cron manager instance
const cronManager = new CronManager();

export { cronManager };
