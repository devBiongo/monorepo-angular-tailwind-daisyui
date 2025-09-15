// src/app/shared/components/drawer/drawer.component.ts
import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { AsyncPipe } from '@angular/common';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-layout-a-drawer',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  template: `
    <!-- 背景遮罩 -->
    @if(layoutService.mobileSidebarOpen$ | async){
    <div
      class="fixed inset-0 bg-black/50 z-40 transition-opacity"
      role="button"
      tabindex="0"
      (click)="layoutService.closeMobileSidebar()"
      (keydown.enter)="layoutService.closeMobileSidebar()"
      (keydown.space)="layoutService.closeMobileSidebar()"
    ></div>
    }

    <!-- 抽屉 -->
    <div
      class="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300"
      [ngClass]="{
        'translate-x-0': layoutService.mobileSidebarOpen$ | async,
        'translate-x-full': (layoutService.mobileSidebarOpen$ | async) === false
      }"
    >
      <header class="p-1 flex justify-between items-center">
        <button
          class="btn btn-square btn-ghost"
          (click)="layoutService.closeMobileSidebar()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      <div class="overflow-y-auto h-[calc(100%-64px)]">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class LayoutADrawerComponent {
  public layoutService = inject(LayoutService);
}
