// core/schedule/task/sync-logs.task.ts
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { LoggerService } from '../../services/ui/logger.service';

@Injectable({ providedIn: 'root' })
export class SyncLogsTask {
  private sub?: Subscription;

  constructor(private api: ApiService, private logger: LoggerService) { }

  start(intervalMs: number = 30000) {
    // this.sub = interval(intervalMs).subscribe(() => {
    //   const logs = this.logger['logsToSync'] || [];
    //   if (logs.length) {
    //     this.api.post('/sync-logs', logs).subscribe({
    //       next: () => console.log('日志同步成功'),
    //       error: err => console.error('日志同步失败', err),
    //     });
    //   }
    // });
  }

  stop() {
    this.sub?.unsubscribe();
  }
}
