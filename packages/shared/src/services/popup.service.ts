import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
  Type,
  createComponent,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DialogCloseDirective } from '../directives/dialog-close.directive';

export interface PopupConfig<P> {
  props?: P;
  disableClose?: boolean;
}

export const POPUP_PROPS = new InjectionToken<unknown>('POPUP_PROPS');

@Injectable({ providedIn: 'root' })
export class PopupService {
  private appRef = inject(ApplicationRef);

  private popupContainerRefs: ComponentRef<PopupContainerComponent>[] = [];

  show<T, P>(component: Type<T>, config: PopupConfig<P> = {}) {
    const popupContainerRef = createComponent(PopupContainerComponent, {
      environmentInjector: this.appRef.injector,
    });
    popupContainerRef.instance.config = config;
    document.body.appendChild(popupContainerRef.location.nativeElement);
    this.appRef.attachView(popupContainerRef.hostView);
    popupContainerRef.changeDetectorRef.detectChanges();

    popupContainerRef.instance.vc.createComponent(component, {
      injector: Injector.create({
        providers: [{ provide: POPUP_PROPS, useValue: config.props }],
      }),
    });

    setTimeout(() => {
      popupContainerRef.instance.show();
    });
    this.popupContainerRefs.push(popupContainerRef);
  }

  close() {
    const popupContainerRef = this.popupContainerRefs.pop();
    if (!popupContainerRef) return;

    const popupContainerEl = popupContainerRef.location
      .nativeElement as HTMLElement;

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === 'opacity') {
        this.appRef.detachView(popupContainerRef.hostView);
        popupContainerRef.destroy();
        popupContainerEl.remove();
        popupContainerEl.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    popupContainerEl.addEventListener('transitionend', onTransitionEnd);
    popupContainerRef.instance.close();
  }
}

@Component({
  imports: [DialogCloseDirective],
  template: `
    <dialog class="modal" libDialogClose #dialogEl (closed)="onDialogClosed()">
      <div
        class="modal-box bg-transparent shadow-none rounded-none p-0 flex justify-center max-w-none max-h-none"
      >
        <div #boxEl class="max-h-screen max-x-screen overflow-auto">
          <ng-template #vc></ng-template>
        </div>
      </div>
    </dialog>
  `,
})
class PopupContainerComponent {
  @ViewChild('dialogEl')
  public dialogEl!: ElementRef<HTMLDialogElement>;

  @ViewChild('boxEl')
  private boxEl!: ElementRef<HTMLElement>;

  @ViewChild('vc', { read: ViewContainerRef, static: true })
  public vc!: ViewContainerRef;

  public config?: PopupConfig<unknown>;

  public popupService = inject(PopupService);

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.config?.disableClose) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.config?.disableClose) {
      return;
    }
    if (!this.isClickInsideBox(event.target)) {
      this.close();
    }
  }

  private isClickInsideBox(target: EventTarget | null): boolean {
    return !!target && this.boxEl?.nativeElement.contains(target as Node);
  }

  public onDialogClosed() {
    this.popupService.close();
  }

  public close() {
    this.dialogEl.nativeElement.close();
  }

  public show() {
    this.dialogEl.nativeElement.showModal();
  }
}
