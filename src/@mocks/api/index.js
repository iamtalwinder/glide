import { createServer } from 'miragejs';
import { authRoutes } from './auth';
import { userRoutes } from './user';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = 'api';

      authRoutes.call(this);
      userRoutes.call(this);
    }
  });

  return server;
}
