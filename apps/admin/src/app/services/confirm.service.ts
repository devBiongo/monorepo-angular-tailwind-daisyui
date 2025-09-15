import { Component, inject, Injectable } from '@angular/core';
import { POPUP_PROPS, PopupService } from '@bion/shared';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private popupService = inject(PopupService);
  show(message: string, onConfirm?: () => void) {
    const { componentRef } = this.popupService.show(ConfirmComponent, {
      props: { message, onConfirm },
      disableClose: true,
    });
    const instance = componentRef.instance;
    return instance.onResult$;
  }
}

@Component({
  template: `
    <div class="modal-box max-w-[600px] w-[90vw]">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">{{ props.message }}</p>
      <div class="modal-action">
        <button
          class="btn btn-primary"
          [class.loading]="loading"
          [disabled]="loading"
          (click)="ok()"
        >
          OK
        </button>
        @if(!loading){
        <button
          class="btn btn-secondary"
          [disabled]="loading"
          (click)="cancel()"
        >
          Cancel
        </button>
        }
      </div>
    </div>
  `,
})
class ConfirmComponent {
  public loading = false;
  private result$ = new Subject<boolean>();
  public onResult$ = this.result$.asObservable();

  public service = inject(PopupService);

  public props = inject(POPUP_PROPS) as {
    message: string;
    onConfirm?: () => void;
  };

  async ok() {
    this.loading = true;
    try {
      if (this.props.onConfirm) {
        await this.props.onConfirm();
      }

      this.result$.next(true);
      this.result$.complete();
      this.service.close();
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }

  cancel() {
    this.result$.next(false);
    this.result$.complete();
    this.service.close();
  }
}
