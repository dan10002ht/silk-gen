import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import environment from '../config/environment.js';

class AuthService {
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      environment.JWT_SECRET,
      { expiresIn: environment.JWT_EXPIRES_IN }
    );
  }

  static async register(userData) {
    try {
      const existingUser = await User.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = await User.create(userData);
      const token = this.generateToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !user.isActive) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await user.validatePassword(password);

      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const token = this.generateToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
