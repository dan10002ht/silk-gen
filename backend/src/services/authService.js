import User from '../models/User.js';
import TokenService from './tokenService.js';

class AuthService {
  static async register(userData) {
    try {
      const existingUser = await User.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = await User.create(userData);
      const tokens = TokenService.generateTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        ...tokens,
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

      const tokens = TokenService.generateTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        ...tokens,
      };
    } catch (error) {
      throw error;
    }
  }

  static async refresh(refreshToken) {
    try {
      const payload = TokenService.verifyRefreshToken(refreshToken);
      const user = await User.findByPk(payload.id);

      if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
      }

      const tokens = TokenService.generateTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        ...tokens,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
