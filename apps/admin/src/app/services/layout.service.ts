import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private sidebarOpenSubject = new BehaviorSubject<boolean>(true);

  private mobileSidebarOpenSubject = new BehaviorSubject<boolean>(false);

  public isDesktop$: Observable<boolean>;

  public sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  public mobileSidebarOpen$ = this.mobileSidebarOpenSubject.asObservable();
  private breakpointObserver = inject(BreakpointObserver);
  constructor() {
    this.isDesktop$ = this.breakpointObserver
      .observe([`(min-width: 768px)`])
      .pipe(
        map((state) => state.matches),
        shareReplay()
      );

    this.isDesktop$.subscribe((isDesktop) => {
      if (!isDesktop) {
        this.sidebarOpenSubject.next(false);
        return;
      }
      this.sidebarOpenSubject.next(true);
      this.mobileSidebarOpenSubject.next(false);
    });
  }

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.getValue());
  }

  closeMobileSidebar() {
    this.mobileSidebarOpenSubject.next(false);
  }

  toggleMobileSidebar() {
    this.mobileSidebarOpenSubject.next(
      !this.mobileSidebarOpenSubject.getValue()
    );
  }
}
