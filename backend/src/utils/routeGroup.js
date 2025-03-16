import { Router } from 'express';

class RouteGroup {
  constructor(prefix = '') {
    this.router = Router();
    this.prefix = prefix;
  }

  // Add middleware to all routes in the group
  middleware(middlewares) {
    this.router.use(middlewares);
    return this;
  }

  // Add routes to the group
  routes(routes) {
    this.router.use(routes);
    return this;
  }

  // Get the configured router
  getRouter() {
    return this.router;
  }
}

export const createRouteGroup = (prefix) => new RouteGroup(prefix); 