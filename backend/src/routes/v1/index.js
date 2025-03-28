import { Router } from 'express';
import { createRouteGroup } from '../../utils/routeGroup.js';
import { protect, authorize } from '../../middleware/authMiddleware.js';
import { apiLimiter, authLimiter } from '../../middleware/rateLimiterMiddleware.js';
import { checkV1Health } from '../../controllers/v1/healthController.js';
import { redirectToApiDocs } from '../../controllers/v1/docsController.js';

// Import route modules
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

// Public routes group
createRouteGroup('/auth').middleware(authLimiter).routes(authRoutes).getRouter();

// Protected routes group
const protectedRoutes = createRouteGroup('/users')
  .middleware([protect, apiLimiter])
  .routes(userRoutes)
  .getRouter();

// Admin routes group
const adminRoutes = createRouteGroup('/admin')
  .middleware([protect, authorize('admin'), apiLimiter])
  .routes(userRoutes)
  .getRouter();

// Manager routes group
const managerRoutes = createRouteGroup('/manager')
  .middleware([protect, authorize('manager', 'admin'), apiLimiter])
  .routes(userRoutes)
  .getRouter();

// Mount all route groups
router.use('/auth', authRoutes);
router.use('/users', protectedRoutes);
router.use('/admin', adminRoutes);
router.use('/manager', managerRoutes);

// Health check route
router.get('/health', checkV1Health);

// API Documentation
router.get('/docs', redirectToApiDocs);

export default router;
