export class JwtService {
  static accessTokenExpiry = 15 * 60 * 1000; // 15 minutes in milliseconds
  static refreshTokenExpiry = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

  static generateToken(userId, type, expiryDuration) {
    const expiry = new Date(Date.now() + expiryDuration).toISOString();
    return `${userId}|${type}|${expiry}`;
  }

  static generateTokens(user) {
    const accessToken = this.generateToken(user.id, 'accessToken', this.accessTokenExpiry);
    const refreshToken = this.generateToken(user.id, 'refreshToken', this.refreshTokenExpiry);

    return { accessToken, refreshToken };
  }

  static decodeToken(token) {
    const parts = token.split('|');
    if (parts.length !== 3) {
      return null; // Invalid token format
    }
    return {
      userId: parts[0],
      type: parts[1],
      expiry: parts[2],
    };
  }

  static validateToken(token) {
    const decoded = this.decodeToken(token);
    if (!decoded) {
      return false;
    }

    const now = new Date();
    const expiry = new Date(decoded.expiry);
    return now <= expiry;
  }
}
