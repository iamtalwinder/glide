import jwt from 'jsonwebtoken';

export class JwtService {
  static jwtConfig = {
    secret: 'secret',
    accessTokenExperation: '15m',
    refreshTokenExperation: '2d'
  };

  static generateTokens(user) {
    const accessToken = jwt.sign({ id: user.id, type: 'accessToken' }, jwtConfig.secret, {
      expiresIn: JwtService.jwtConfig.accessTokenExperation
    });

    const refreshToken = jwt.sign({ id: user.id, type: 'refreshToken' }, jwtConfig.secret, {
      expiresIn: JwtService.jwtConfig.refreshTokenExperation
    });

    return { accessToken, refreshToken };
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }

  static verify(token) {
    try {
      const decoded = jwt.verify(token, JwtService.jwtConfig.secret);
      return decoded;
    } catch (err) {
      return null;
    }
  }

  static verifyRequest(request) {
    const headers = request.requestHeaders;
    const authorization = headers['Authorization'] || headers['authorization'];
    const token = authorization ? authorization.split(' ')[1] : null;

    return JwtService.verifyToken(token);
  }

  static refreshToken(user, refreshToken) {
    const isValidRefreshToken = JwtService.verifyToken(refreshToken);

    if (isValidRefreshToken) {
      JwtService.generateTokens(user);
    }
  }
}
