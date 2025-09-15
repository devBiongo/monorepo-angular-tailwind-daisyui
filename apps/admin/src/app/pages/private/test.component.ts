import { Component, inject } from '@angular/core';
import { AlertService } from '@bion/shared';

@Component({
  imports: [],
  template: `
    <div>
      <button class="btn" (click)="showAlert()">alert</button>
    </div>
  `,
})
export class TestComponent {
  private alertService = inject(AlertService);
  showAlert() {
    this.alertService.warn('操作成功');
  }
}
