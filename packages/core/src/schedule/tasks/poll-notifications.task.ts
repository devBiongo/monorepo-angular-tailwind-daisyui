import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ApiService } from '../../services/api/api.service';

@Injectable({ providedIn: 'root' })
export class PollNotificationsTask {
  private subscription?: Subscription;

  constructor(private api: ApiService) { }

  start(intervalMs: number = 10000) {
    this.subscription = interval(intervalMs).subscribe(() => {
      this.api.get('/notifications').subscribe({
        next: res => console.log('收到通知', res),
        error: err => console.error('轮询错误', err)
      });
    });
  }

  stop() {
    this.subscription?.unsubscribe();
  }
}