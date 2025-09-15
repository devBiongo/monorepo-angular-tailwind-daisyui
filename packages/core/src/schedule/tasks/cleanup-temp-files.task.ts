// core/schedule/task/cleanup-temp-files.task.ts
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CleanupTempFilesTask {
  private sub?: Subscription;

  start(intervalMs: number = 3600000) { // 默认每小时执行
    this.sub = interval(intervalMs).subscribe(() => {
      console.log('清理临时文件...');
      // TODO: 调用实际清理逻辑
    });
  }

  stop() {
    this.sub?.unsubscribe();
  }
}
