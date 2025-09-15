export class ValidationError extends Error {
  constructor(public fieldErrors: Record<string, string>) {
    super('表单验证错误');
    this.name = 'ValidationError';
  }
}