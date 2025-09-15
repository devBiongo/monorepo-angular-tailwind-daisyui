export class AuthError extends Error {
  constructor(message = '认证失败') {
    super(message);
    this.name = 'AuthError';
  }
}
