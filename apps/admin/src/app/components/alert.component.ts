import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  imports: [AsyncPipe],
  selector: 'app-alert',
  template: `
    <div class="fixed right-1 top-5 z-999 min-w-[300px] flex flex-col gap-3">
      @for (message of alertService.messages$ | async; track message) {
      <div role="alert" class="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ message }}</span>
      </div>
      }
    </div>
  `,
})
export class AlertComponent {
  public alertService = inject(AlertService);
}
