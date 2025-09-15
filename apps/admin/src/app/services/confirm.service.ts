import { Component, inject, Injectable } from '@angular/core';
import { POPUP_PROPS, PopupService } from '@bion/shared';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private popupService = inject(PopupService);
  show(message: string) {
    this.popupService.show(ConfirmComponent, { props: message });
  }
}

@Component({
  template: `
    <div class="modal-box">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <button class="btn" (click)="close()">Close</button>
      </div>
    </div>
  `,
})
class ConfirmComponent {
  public service = inject(PopupService);

  public message = inject(POPUP_PROPS) as string;

  public close() {
    this.service.close();
  }
}
