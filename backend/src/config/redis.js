import Redis from 'redis';
import { processInBackground } from '../services/backgroundHandler';

// Create Redis clients (one for pub, one for sub to avoid blocking)
const publisher = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

const subscriber = publisher.duplicate();

// Dynamic topics management
class TopicsManager {
  constructor() {
    this.topics = new Map();
    this.lastUsed = new Map();
    this.cleanupInterval = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Add or get topic
  getTopic(name) {
    if (!this.topics.has(name)) {
      this.topics.set(name, name.toLowerCase());
    }
    this.updateLastUsed(name);
    return this.topics.get(name);
  }

  // Update last used timestamp
  updateLastUsed(topic) {
    this.lastUsed.set(topic, Date.now());
  }

  // Get all active topics
  getAllTopics() {
    return Array.from(this.topics.values());
  }

  // Check if topic exists
  hasTopic(name) {
    return this.topics.has(name);
  }

  // Remove unused topics
  async cleanup(maxAge = this.cleanupInterval) {
    const now = Date.now();
    const unusedTopics = Array.from(this.lastUsed.entries())
      .filter(([topic, lastUsed]) => now - lastUsed > maxAge)
      .map(([topic]) => topic);

    for (const topic of unusedTopics) {
      this.topics.delete(topic);
      this.lastUsed.delete(topic);
      console.log(`Cleaned up unused topic: ${topic}`);
    }

    return unusedTopics;
  }
}

// Create topics manager instance
const topicsManager = new TopicsManager();

// Initialize with core topics
const CORE_TOPICS = {
  NOTIFICATION: 'notification',
  INVENTORY: 'inventory',
  ORDER: 'order',
  SYSTEM: 'system',
};

Object.entries(CORE_TOPICS).forEach(([key, value]) => {
  topicsManager.getTopic(value);
});

// Connect Redis clients
const connectRedis = async () => {
  try {
    await Promise.all([publisher.connect(), subscriber.connect()]);
    console.log('Redis Pub/Sub clients connected');

    // Start periodic cleanup
    setInterval(() => {
      topicsManager
        .cleanup()
        .then(cleaned => {
          if (cleaned.length > 0) {
            console.log('Cleaned topics:', cleaned);
          }
        })
        .catch(error => console.error('Cleanup error:', error));
    }, topicsManager.cleanupInterval);
  } catch (error) {
    console.error('Redis connection error:', error);
    process.exit(1);
  }
};

// Publisher class for handling message publishing
class Publisher {
  static async publish(topic, message) {
    try {
      const actualTopic = topicsManager.getTopic(topic);
      const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
      await publisher.publish(actualTopic, messageStr);
      console.log(`Published to ${actualTopic}:`, message);
      return { published: true, topic: actualTopic, message };
    } catch (error) {
      console.error(`Error publishing to ${topic}:`, error);
      throw error;
    }
  }

  // Get list of active topics
  static getActiveTopics() {
    return topicsManager.getAllTopics();
  }

  // Check topic status
  static getTopicStatus(topic) {
    const exists = topicsManager.hasTopic(topic);
    const lastUsed = topicsManager.lastUsed.get(topic);
    return {
      exists,
      lastUsed: lastUsed ? new Date(lastUsed) : null,
    };
  }
}

// Subscriber class for handling subscriptions
class Subscriber {
  constructor() {
    this.handlers = new Map();
  }

  // Subscribe to a topic with a message handler
  async subscribe(topic, handler) {
    const actualTopic = topicsManager.getTopic(topic);

    if (this.handlers.has(actualTopic)) {
      throw new Error(`Handler already registered for topic: ${actualTopic}`);
    }

    this.handlers.set(actualTopic, handler);
    await subscriber.subscribe(actualTopic, async message => {
      try {
        const data = JSON.parse(message);
        // Process message in background
        await processInBackground(actualTopic, data);
        // Update last used timestamp
        topicsManager.updateLastUsed(actualTopic);
      } catch (error) {
        console.error(`Error processing message from ${actualTopic}:`, error);
      }
    });

    console.log(`Subscribed to topic: ${actualTopic}`);
  }

  // Unsubscribe from a topic
  async unsubscribe(topic) {
    const actualTopic = topicsManager.getTopic(topic);
    await subscriber.unsubscribe(actualTopic);
    this.handlers.delete(actualTopic);
    console.log(`Unsubscribed from topic: ${actualTopic}`);
  }
}

// Create subscriber instance
const subscriberInstance = new Subscriber();

// Subscribe to core topics
Object.values(CORE_TOPICS).forEach(topic => {
  subscriberInstance.subscribe(topic, async message => {
    await processInBackground(topic, message);
  });
});

// Error handlers
publisher.on('error', error => console.error('Publisher error:', error));
subscriber.on('error', error => console.error('Subscriber error:', error));

export { connectRedis, Publisher, subscriberInstance as Subscriber, CORE_TOPICS as TOPICS };
