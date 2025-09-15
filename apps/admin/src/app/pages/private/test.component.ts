import { Component, inject } from '@angular/core';
import { POPUP_PROPS, PopupService } from '@bion/shared';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  template: ` <button class="btn" (click)="handleClick()">test</button> `,
})
export class TestComponent {
  private confirmService = inject(ConfirmService);

  handleClick() {
    this.confirmService.show('nihao');
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
