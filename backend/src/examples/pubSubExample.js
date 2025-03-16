import { connectRedis, Publisher, Subscriber, TOPICS } from '../config/redis';

// Example of using the pub/sub system
async function runExample() {
  try {
    // Connect to Redis
    await connectRedis();
    console.log('🚀 Connected to Redis');

    // Example 1: Using core topics
    console.log('\n📢 Example 1: Core Topics');
    await Publisher.publish(TOPICS.NOTIFICATION, {
      type: 'email',
      data: {
        to: 'user@example.com',
        subject: 'Welcome',
        content: 'Welcome to our platform!',
      },
    });

    // Example 2: Dynamic topic
    console.log('\n📢 Example 2: Dynamic Topic');
    await Publisher.publish('custom_alerts', {
      type: 'system_warning',
      data: {
        level: 'warning',
        message: 'High CPU usage detected',
      },
    });

    // Example 3: Inventory update
    console.log('\n📢 Example 3: Inventory Update');
    await Publisher.publish(TOPICS.INVENTORY, {
      type: 'stock_update',
      data: {
        productId: 'PROD123',
        quantity: 50,
        warehouse: 'WH001',
      },
    });

    // Example 4: Check topics status
    console.log('\n📊 Active Topics:');
    const activeTopics = Publisher.getActiveTopics();
    console.log(activeTopics);

    // Keep the process running to see background processing
    console.log('\n👀 Watching for messages... (Press Ctrl+C to exit)');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the example
runExample();
