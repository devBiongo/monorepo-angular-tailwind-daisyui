import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services';

const WHITE_LIST = ['/login', '/about'];

@Injectable({ providedIn: 'root' })
export class AdminPermissionGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;

    if (WHITE_LIST.includes(url)) {
      return true;
    }

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { redirect: url } });
      return false;
    }

    const requiredRoles = route.data['roles'] as string[] | undefined;
    if (
      requiredRoles &&
      !requiredRoles.some((r) => this.auth.getUserRoles().includes(r))
    ) {
      this.router.navigate(['/403']);
      return false;
    }

    return true;
  }
}
