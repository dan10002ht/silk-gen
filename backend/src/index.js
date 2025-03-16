import 'dotenv/config';
import createApp from './config/app.js';
import setupRoutes from './routes/index.js';
import initializeServer from './config/server.js';



(async () => {
  try {
    // Create Express app with middleware
    const app = createApp();

    // Setup routes
    setupRoutes(app);

    // Initialize server (DB, Redis, and start listening)
    await initializeServer(app);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
})()