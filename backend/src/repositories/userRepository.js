import BaseRepository from './base.repository.js';
import { User } from '../models/index.js';

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email, options = {}) {
    return this.findOne({ email }, options);
  }

  async findByUsername(username, options = {}) {
    return this.findOne({ username }, options);
  }

  async updatePassword(id, hashedPassword) {
    return this.update(id, { password: hashedPassword });
  }

  async findWithRoles(id, options = {}) {
    return this.findById(id, {
      include: ['roles'],
      ...options
    });
  }

  async updateLastLogin(id) {
    return this.update(id, { lastLoginAt: new Date() });
  }
}

export default new UserRepository(); 