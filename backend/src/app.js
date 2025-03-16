import express from 'express';
import { cronServer } from './cron/server';

const app = express();

// ... other middleware and route setup ...

// Start the server
const startServer = async () => {
  try {
    // Start the cron server if not running in standalone mode
    if (process.env.CRON_STANDALONE !== 'true') {
      await cronServer.start();
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  console.log('Shutting down server...');

  // Stop the cron server if not running in standalone mode
  if (process.env.CRON_STANDALONE !== 'true') {
    await cronServer.stop();
  }

  // Add other cleanup logic here
  // For example: close database connections, etc.

  process.exit(0);
};

// Handle shutdown signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

export { app, startServer };
