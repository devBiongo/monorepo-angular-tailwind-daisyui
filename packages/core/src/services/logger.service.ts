// logger.service.ts
import { Injectable } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private env: 'development' | 'production' = 'development';

  constructor() {
    // 可以从环境配置获取
    // this.env = environment.production ? 'production' : 'development';
  }

  private formatMessage(level: LogLevel, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${
      meta ? ' ' + JSON.stringify(meta) : ''
    }`;
  }

  debug(message: string, meta?: any) {
    if (this.env === 'development') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }

  info(message: string, meta?: any) {
    console.info(this.formatMessage('info', message, meta));
  }

  warn(message: string, meta?: any) {
    console.warn(this.formatMessage('warn', message, meta));
  }

  error(message: string, meta?: any) {
    console.error(this.formatMessage('error', message, meta));
    // 可扩展：上报到远程日志系统
  }

  /** ========== HTTP 专用日志方法 ========== */
  logRequest(req: any) {
    this.debug('HTTP Request', {
      method: req.method,
      url: req.url,
      headers: req.headers.keys().reduce((acc: any, key: string) => {
        acc[key] = req.headers.get(key);
        return acc;
      }, {} as Record<string, string | null>),
      body: req.body,
    });
  }

  logError(error: any) {
    this.error('HTTP Error', {
      status: error.status,
      message: error.message,
      url: error.url,
      error: error.error,
    });
  }

  logRequestComplete(url: string) {
    this.info('HTTP Request Completed', { url });
  }
}
