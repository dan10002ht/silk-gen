import { Router } from 'express';
import v1Routes from './v1/index.js';
import { checkHealth } from '../controllers/healthController.js';
import { redirectToApiDocs } from '../controllers/docsController.js';
import { handleNotFound } from '../controllers/errorController.js';

const router = Router();

// API version routes
router.use('/api/v1', v1Routes);

// Health check route
router.get('/health', checkHealth);

// API documentation route
router.get('/api/docs', redirectToApiDocs);

// 404 handler
router.use(handleNotFound);

const setupRoutes = app => {
  app.use(router);
};

export default setupRoutes;
