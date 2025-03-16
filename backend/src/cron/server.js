import 'dotenv/config';
import { initializeCronJobs, shutdownCronJobs } from './index.js';

class CronServer {
  constructor() {
    this.isRunning = false;
  }

  async start() {
    if (this.isRunning) {
      console.log('⚠️ Cron server is already running');
      return;
    }

    try {
      console.log('🚀 Starting cron server...');

      // Initialize cron jobs
      initializeCronJobs();

      // Setup shutdown handlers
      this.setupShutdownHandlers();

      this.isRunning = true;
      console.log('✅ Cron server is running');
    } catch (error) {
      console.error('❌ Failed to start cron server:', error);
      throw error;
    }
  }

  async stop() {
    if (!this.isRunning) {
      console.log('⚠️ Cron server is not running');
      return;
    }

    try {
      console.log('🛑 Stopping cron server...');
      shutdownCronJobs();
      this.isRunning = false;
      console.log('✅ Cron server stopped');
    } catch (error) {
      console.error('❌ Failed to stop cron server:', error);
      throw error;
    }
  }

  setupShutdownHandlers() {
    const handleShutdown = async signal => {
      console.log(`Received ${signal} signal`);
      try {
        await this.stop();
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
      }
    };

    // Handle graceful shutdown signals
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

    // Handle uncaught errors
    process.on('uncaughtException', error => {
      console.error('Uncaught Exception:', error);
      handleShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      handleShutdown('unhandledRejection');
    });
  }
}

// Create singleton instance
const cronServer = new CronServer();

export { cronServer };

// Allow running as standalone process
if (process.env.CRON_STANDALONE === 'true') {
  cronServer.start().catch(error => {
    console.error('Failed to start standalone cron server:', error);
    process.exit(1);
  });
}
