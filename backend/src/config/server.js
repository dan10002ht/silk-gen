import { connectDB } from './database.js';
import { connectRedis } from './redis.js';

const initializeServer = async (app) => {
  try {
    // Connect to PostgreSQL
    await connectDB();

    // Connect to Redis
    await connectRedis();

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

export default initializeServer; 