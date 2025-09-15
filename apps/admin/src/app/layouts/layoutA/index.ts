import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutAHeaderComponent } from './components/header.component';
import { LayoutASidebarComponent } from './components/sidebar.component';
import { LayoutService } from '../../services/layout.service';
import { AsyncPipe } from '@angular/common';
import { LayoutADrawerComponent } from './components/drawer.component';

@Component({
  selector: 'app-layout-a',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutAHeaderComponent,
    LayoutASidebarComponent,
    AsyncPipe,
    LayoutADrawerComponent,
  ],
  template: `
    <div>
      <header class="bg-white border-b border-gray-200 fixed z-30 w-full h-16">
        <app-layout-a-header />
      </header>

      <aside
        class="fixed z-20 h-full top-0 left-0 bottom-0 pt-16 w-64 bg-white transform transition-transform duration-300 border-r border-gray-200"
        [class.-translate-x-full]="
          (layoutService.sidebarOpen$ | async) === false
        "
      >
        <app-layout-a-sidebar />
      </aside>
      <app-layout-a-drawer>
        <app-layout-a-sidebar />
      </app-layout-a-drawer>
      <main
        class="min-h-screen pt-16 transition-all duration-300 bg-gray-50"
        [class.pl-64]="layoutService.sidebarOpen$ | async"
      >
        <div class="pt-4 px-4">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
})
export class LayoutAComponent {
  public layoutService = inject(LayoutService);
}
