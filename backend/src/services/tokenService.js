import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

class TokenService {
  static generateTokens(user) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      environment.JWT_ACCESS_SECRET,
      { expiresIn: environment.JWT_ACCESS_EXPIRES_IN }
    );

    const refreshToken = jwt.sign({ id: user.id }, environment.JWT_REFRESH_SECRET, {
      expiresIn: environment.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, environment.JWT_ACCESS_SECRET);
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, environment.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}

export default TokenService;
