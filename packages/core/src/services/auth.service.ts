// auth.service.ts
import { Injectable } from '@angular/core';

export interface User {
  username: string;
  roles: string[];
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'app_user';

  /** 保存用户信息 */
  private setUser(user: User | null) {
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  /** 读取用户信息 */
  private getUser(): User | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  /** 是否已登录 */
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  /** 获取用户角色 */
  getUserRoles(): string[] {
    return this.getUser()?.roles ?? [];
  }

  /** 获取 Token */
  getToken(): string | null {
    return this.getUser()?.token ?? null;
  }

  /** 登录（这里模拟，实际应调用后端 API） */
  login(username: string, password: string): boolean {
    // TODO: 替换为真实 API 调用
    if (username === 'aaa@gmail.com' && password === '123456') {
      this.setUser({
        username,
        roles: ['admin'],
        token: 'mock-jwt-token',
      });
      return true;
    }
    return false;
  }

  /** 登出 */
  logout() {
    this.setUser(null);
  }
}
