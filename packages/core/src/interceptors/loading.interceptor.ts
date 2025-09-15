import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgxNProgressService } from 'ngx-nprogress';
import { HttpInterceptorFn } from '@angular/common/http';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const progress = inject(NgxNProgressService);
  progress.start();

  return next(req).pipe(finalize(() => progress.done()));
};
