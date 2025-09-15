import { Component, inject } from '@angular/core';
import { POPUP_PROPS, PopupService } from '@bion/shared';
import { ConfirmService } from '../../services/confirm.service';
import { AlertService } from '../../services/alert.service';

@Component({
  template: `
    <div>
      <button class="btn" (click)="handleClick()">test</button>
    </div>
    <div>
      <button class="btn" (click)="aaa()">alert</button>
    </div>
  `,
})
export class TestComponent {
  private confirmService = inject(ConfirmService);
  private alertService = inject(AlertService);

  async handleClick() {
    this.confirmService.show('nihao', async () => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(true);
        }, 3000);
      });
    });
  }
  aaa() {
    this.alertService.show('xxx');
  }
}

@Component({
  template: `<div
    class="bg-white w-[1000px] h-[800px] rounded overflow-hidden shadow-lg"
  >
    <button class="btn" (click)="this.popupService.close()">close</button>
  </div> `,
})
export class DemoPopupComponent {
  public props = inject(POPUP_PROPS);
  public popupService = inject(PopupService);

  close() {
    this.popupService.close();
  }
  open() {
    this.popupService.show(DemoPopupComponent, { props: {} });
  }
}
