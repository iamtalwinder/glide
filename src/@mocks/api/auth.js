import { users } from '../data/users';
import { JwtService } from '../service/jwt.service';

export function authRoutes() {
  this.post('/login', function (schema, request) {
    const attrs = JSON.parse(request.requestBody);
    const user = users.find(user => user.email === attrs.email && user.password === attrs.password);

    const errors = [];

    if (!user) {
      errors.push({
        type: 'invalid_credentials',
        message: 'Check your email & password'
      });
    }

    if (errors.length === 0) {
      delete user.password;

      return {
        user,
        ...JwtService.generateTokens(user)
      };
    }

    return new Response(401, {}, { errors });
  });

  this.post('/register', function (schema, request) {
    const attrs = JSON.parse(request.requestBody);
    const user = { id: Date.now(), ...attrs };
    return { user, ...JwtService.generateTokens(user) };
  });

  this.post('/refresh-token', function (schema, request) {
    const payload = JwtService.verifyRequest(request);
    if (!payload) {
      errors.push({
        type: 'unauthorized',
        message: 'Invalid token'
      });

      return new Response(401, {}, { errors });
    }

    const user = users.find(user => user.id === payload.id);

    return JwtService.generateTokens(user);
  });
}
