// core/schedule/task/refresh-cache.task.ts
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CacheService } from '../../services/api/cache.service';
import { ApiService } from '../../services/api/api.service';

@Injectable({ providedIn: 'root' })
export class RefreshCacheTask {
  private subscription?: Subscription;

  constructor(private api: ApiService, private cache: CacheService) { }

  start(intervalMs: number = 60000) {
    this.subscription = interval(intervalMs).subscribe(() => {
      this.api.get('/important-data').subscribe(data => {
        this.cache.set('important-data', data);
        console.log('缓存已刷新');
      });
    });
  }

  stop() {
    this.subscription?.unsubscribe();
  }
}
