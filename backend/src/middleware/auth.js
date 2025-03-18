import TokenService from '../services/tokenService.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    const accessToken = authHeader.split(' ')[1];
    
    try {
      const decoded = TokenService.verifyAccessToken(accessToken);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ 
        error: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
  } catch (error) {
    return res.status(401).json({ 
      error: 'Authentication failed' 
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Not authorized to access this resource',
      });
    }
    next();
  };
};
