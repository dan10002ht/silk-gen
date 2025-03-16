import { Router } from 'express';
import v1Routes from './v1/index.js';

const router = Router();

// API version routes
router.use('/api/v1', v1Routes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API documentation route
router.get('/api/docs', (req, res) => {
  res.redirect('/api/v1/docs');
});

// 404 handler
router.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const setupRoutes = (app) => {
  app.use(router);
};

export default setupRoutes; 