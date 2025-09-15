import { ErrorHandler, Injectable } from '@angular/core';
import { AuthError } from '../models/auth-error';
import { ApiError } from '../models/api-error';
import { NetworkError } from '../models/network-error';
import { ValidationError } from '../models/validation-error';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {
    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        this.handleError(event.reason);
      }
    );
  }
  handleError(error: Error): void {
    console.error('全局捕获错误:', error);
    return;

    if (error instanceof AuthError) {
      alert('请重新登录');
      // 可以跳转到登录页
    } else if (error instanceof NetworkError) {
      alert('网络异常，请稍后重试');
    } else if (error instanceof ValidationError) {
      alert('表单验证失败：' + JSON.stringify(error));
    } else if (error instanceof ApiError) {
      alert('接口错误：' + JSON.stringify(error));
    } else {
      alert('未知错误，请联系管理员');
    }
  }
}
