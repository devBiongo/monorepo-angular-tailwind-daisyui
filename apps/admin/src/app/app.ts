import { Component, inject } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { AlertComponent } from './components/alert.component';
import { NgxNProgressService } from 'ngx-nprogress';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  providers: [NgxNProgressService],
  template: `<router-outlet /><app-alert></app-alert>`,
})
export class App {
  private router = inject(Router);
  private progress = inject(NgxNProgressService);
  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.progress.start();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.progress.done();
      }
    });
  }
}
