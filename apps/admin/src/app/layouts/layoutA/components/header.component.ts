import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { AuthService } from '@bion/core';

@Component({
  selector: 'app-layout-a-header',
  template: `
    <nav class="px-2 py-3 lg:px-3 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button class="btn btn-square btn-ghost" (click)="toggle()">
            <svg
              id="toggleSidebarMobileHamburger"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              id="toggleSidebarMobileClose"
              class="w-6 h-6 hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <a href="#" class="text-xl font-bold items-center md:flex hidden">
            <img
              src="https://demo.themesberg.com/windster/images/logo.svg"
              class="h-6 mr-2"
              alt="Windster Logo"
            />
            <span class="self-center whitespace-nowrap">Windster</span>
          </a>
        </div>
        <div class="flex gap-2">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="avatar btn btn-circle">
              <div class="w-10 rounded-full">
                <img
                  alt=""
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                />
              </div>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button alt="" (click)="authService.logout()">settings</button>
              </li>
              <li><a>logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class LayoutAHeaderComponent {
  private isDesktop: boolean | null = null;
  private layoutService = inject(LayoutService);
  public authService = inject(AuthService);
  constructor() {
    this.layoutService.isDesktop$.subscribe((val) => (this.isDesktop = val));
  }

  toggle() {
    if (this.isDesktop) {
      this.layoutService.toggleSidebar();
      return;
    }
    this.layoutService.toggleMobileSidebar();
  }
}
