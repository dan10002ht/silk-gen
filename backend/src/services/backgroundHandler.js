import { TOPICS } from '../config/redis';
import { redisClient } from '../config/redis';

// Process message in background
export const processInBackground = async (topic, message) => {
  try {
    const { type, data } = message;
    switch (topic) {
      case TOPICS.EMAIL:
        break;
      case TOPICS.INVENTORY:
        break;
      default:
        break;
    }

    return { queued: true, topic, type };
  } catch (error) {
    console.error('Background processing error:', error);
    throw error;
  }
};

export class Publisher {
  constructor() {
    this.client = redisClient;
  }

  async publish(topic, message) {
    try {
      await this.client.publish(topic, JSON.stringify(message));
    } catch (error) {
      throw new Error(`Failed to publish message: ${error.message}`);
    }
  }
}
