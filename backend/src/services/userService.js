import bcrypt from 'bcryptjs';
import userRepository from '../repositories/userRepository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

class UserService {
  constructor() {
    this.repository = userRepository;
  }

  async createUser(userData) {
    // Business logic: Check if user exists
    const existingUser = await this.repository.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    // Business logic: Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Business logic: Format user data
    const userToCreate = {
      ...userData,
      password: hashedPassword,
      status: 'active',
      lastLoginAt: null,
    };

    // Data access: Delegate to repository
    return this.repository.create(userToCreate);
  }

  async updateUser(id, updateData) {
    // Business logic: Prevent password update through this method
    if (updateData.password) {
      throw new BadRequestError('Cannot update password through this method');
    }

    // Business logic: Check if user exists
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Business logic: Format update data
    const sanitizedData = this.sanitizeUpdateData(updateData);

    // Data access: Delegate to repository
    return this.repository.update(id, sanitizedData);
  }

  async changePassword(id, oldPassword, newPassword) {
    // Business logic: Get user with password
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Business logic: Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new BadRequestError('Invalid old password');
    }

    // Business logic: Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Data access: Delegate to repository
    return this.repository.updatePassword(id, hashedPassword);
  }

  async getUserProfile(id) {
    // Business logic: Get user with roles
    const user = await this.repository.findWithRoles(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Business logic: Format user data for profile
    return this.formatUserProfile(user);
  }

  // Private helper methods
  sanitizeUpdateData(data) {
    const allowedFields = ['firstName', 'lastName', 'email', 'status'];
    return Object.keys(data)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  }

  formatUserProfile(user) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
      roles: user.roles.map(role => role.name),
      lastLoginAt: user.lastLoginAt,
    };
  }
}

export default new UserService();
