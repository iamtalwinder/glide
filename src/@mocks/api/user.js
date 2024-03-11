import { Response } from 'miragejs';
import { JwtService } from '../service/jwt.service';

export const userRoutes = function (schema, request) {
  this.get('/user-profile', () => {
    0;
    const payload = JwtService.verifyRequest(request);
    if (!payload) {
      errors.push({
        type: 'unauthorized',
        message: 'Invalid token'
      });

      return new Response(401, {}, { errors });
    }

    return users.find(user => user.id === payload.id);
  });
};
