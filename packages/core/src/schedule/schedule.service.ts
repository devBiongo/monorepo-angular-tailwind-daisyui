import { Injectable, OnDestroy } from '@angular/core';
import { PollNotificationsTask } from './tasks/poll-notifications.task';
import { RefreshCacheTask } from './tasks/refresh-cache.task';
import { SyncLogsTask } from './tasks/sync-logs.task';
import { CleanupTempFilesTask } from './tasks/cleanup-temp-files.task';

@Injectable({ providedIn: 'root' })
export class ScheduleService implements OnDestroy {
  private tasks: Record<string, { start: () => void; stop: () => void }> = {};

  constructor(
    private pollNotificationsTask: PollNotificationsTask,
    private refreshCacheTask: RefreshCacheTask,
    private syncLogsTask: SyncLogsTask,
    private cleanupTempFilesTask: CleanupTempFilesTask
  ) {
    // 初始化任务 map
    this.tasks = {
      pollNotifications: this.pollNotificationsTask,
      refreshCache: this.refreshCacheTask,
      syncLogs: this.syncLogsTask,
      cleanupTempFiles: this.cleanupTempFilesTask,
    };
  }

  /** 启动指定任务，默认启动所有 */
  start(taskName?: string) {
    if (taskName) {
      this.tasks[taskName]?.start();
    } else {
      Object.values(this.tasks).forEach(task => task.start());
    }
  }

  /** 停止指定任务，默认停止所有 */
  stop(taskName?: string) {
    if (taskName) {
      this.tasks[taskName]?.stop();
    } else {
      Object.values(this.tasks).forEach(task => task.stop());
    }
  }

  /** 获取任务列表 */
  getTaskNames(): string[] {
    return Object.keys(this.tasks);
  }

  ngOnDestroy() {
    this.stop(); // 组件销毁时自动停止所有任务
  }
}
