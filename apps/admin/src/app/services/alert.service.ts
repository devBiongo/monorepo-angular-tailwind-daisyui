import { Injectable, inject, ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  public messages$ = new BehaviorSubject<string[]>([]);

  private readonly duration = 3000;

  private appRef = inject(ApplicationRef);

  show(message: string) {
    const current = this.messages$.value;
    this.messages$.next([...current, message]);

    setTimeout(() => {
      this.remove(message);
    }, this.duration);
  }

  private remove(message: string) {
    const current = this.messages$.value;
    this.messages$.next(current.filter((m) => m !== message));

    // 可选：如果使用 OnPush 或 BehaviorSubject，手动刷新
    this.appRef.tick();
  }
}
