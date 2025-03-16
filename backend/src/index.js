import 'dotenv/config';
import { startServer } from './app.js';

// Start the application
startServer().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
