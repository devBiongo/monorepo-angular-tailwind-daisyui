export class NetworkError extends Error {
  constructor(message = '网络错误') {
    super(message);
    this.name = 'NetworkError';
  }
}
