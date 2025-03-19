/**
 * Controllers index
 * Re-exports all controllers for easier imports
 */

// Root-level controllers
export * as healthController from './healthController.js';
export * as docsController from './docsController.js';
export * as errorController from './errorController.js';

// V1 controllers
export * as v1AuthController from './v1/authController.js';
export * as v1UserController from './v1/userController.js';
export * as v1HealthController from './v1/healthController.js';
export * as v1DocsController from './v1/docsController.js'; 