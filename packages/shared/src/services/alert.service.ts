import {
  ApplicationRef,
  Injectable,
  createComponent,
  Component,
  inject,
  ComponentRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';

type AlertType = 'success' | 'info' | 'warn' | 'error';

interface AlertMessage {
  id: number;
  type: AlertType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  public messagesSubject = new BehaviorSubject<AlertMessage[]>([]);

  private alertContainerRef?: ComponentRef<AlertComponent>;
  private counter = 0;
  private appRef = inject(ApplicationRef);

  private queue: AlertMessage[] = [];
  private isProcessing = false;
  private readonly interval = 500;

  private initContainer() {
    if (this.alertContainerRef) return;
    const alertContainerRef = createComponent(AlertComponent, {
      environmentInjector: this.appRef.injector,
    });
    document.body.appendChild(alertContainerRef.location.nativeElement);
    this.appRef.attachView(alertContainerRef.hostView);
    alertContainerRef.changeDetectorRef.detectChanges();
    this.alertContainerRef = alertContainerRef;
  }

  public info(message: string, duration?: number) {
    this.enqueue(message, 'info', duration);
  }

  public success(message: string, duration?: number) {
    this.enqueue(message, 'success', duration);
  }

  public error(message: string, duration?: number) {
    this.enqueue(message, 'error', duration);
  }

  public warn(message: string, duration?: number) {
    this.enqueue(message, 'warn', duration);
  }

  private enqueue(message: string, type: AlertType, duration = 5000) {
    const id = this.counter++;
    const alertMessage: AlertMessage = { id, message, type };
    this.queue.push(alertMessage);
    this.processQueue(duration);
  }

  private async processQueue(duration: number) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length) {
      const msg = this.queue.shift() as AlertMessage;
      this.initContainer();
      this.messagesSubject.next([...this.messagesSubject.getValue(), msg]);

      await new Promise((resolve) => setTimeout(resolve, this.interval));

      setTimeout(() => this.remove(msg.id), duration);
    }

    this.isProcessing = false;
  }

  private remove(id: number) {
    const current = this.messagesSubject.getValue();
    const msg = current.find((m) => m.id === id);
    if (!msg) return;

    this.messagesSubject.next([...current]);

    setTimeout(() => {
      const updated = this.messagesSubject.value.filter((m) => m.id !== id);
      this.messagesSubject.next(updated);
    }, 300);
  }
}

@Component({
  imports: [AsyncPipe, NgClass],
  template: `
    <div class="fixed top-2 right-5 flex flex-col gap-2 z-50 w-80 max-w-sm">
      @for (message of alertService.messagesSubject | async; track message) {
      <div
        role="alert"
        [animate.enter]="'slide-in-right'"
        [animate.leave]="'slide-out-left'"
        class="alert shadow-lg transition-all duration-500 ease-in-out"
        [ngClass]="{
          'alert-success': message.type === 'success',
          'alert-error': message.type === 'error',
          'alert-info': message.type === 'info',
          'alert-warning': message.type === 'warn'
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{{ message.message }}</span>
      </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOutLeft {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(120%);
          opacity: 0;
        }
      }

      .slide-in-right {
        animation: slideInRight 0.3s ease-out forwards;
      }
      .slide-out-left {
        animation: slideOutLeft 0.3s ease-in forwards;
      }
    `,
  ],
})
export class AlertComponent {
  public alertService = inject(AlertService);
}
