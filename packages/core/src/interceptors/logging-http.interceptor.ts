import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    alert('logging');
    const started = Date.now();
    console.log(`HTTP Request: ${req.method} ${req.url}`);
    return next.handle(req).pipe(
      tap({
        next: () =>
          console.log(`Request to ${req.url} took ${Date.now() - started} ms`),
        error: (err) => console.error(`Request to ${req.url} failed`, err),
      })
    );
  }
}
