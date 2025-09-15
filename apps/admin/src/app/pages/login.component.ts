import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as v from 'valibot';
import { AuthService } from '@bion/core';

// TypeScript
type LoginData = {
  email: string;
  password: string;
};

// Valibot
const loginSchema = v.object({
  email: v.string(),
  password: v.string(),
});

@Component({
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <div
      class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style="background-image:url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')"
    >
      <div
        class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8"
      >
        <div class="text-white">
          <div class="mb-8 flex flex-col items-center">
            <img
              src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
              width="150"
              alt=""
            />
            <h1 class="mb-2 text-2xl">Instagram</h1>
            <span class="text-gray-300">Enter Login Details</span>
          </div>

          <!-- 表单 -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="mb-4 text-lg">
              <input
                class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="email"
                formControlName="email"
                placeholder="id@email.com"
              />
              @if(errors.email){
              <div class="text-red-400 text-sm mt-1">
                {{ errors.email }}
              </div>
              }
            </div>

            <div class="mb-4 text-lg">
              <input
                class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                formControlName="password"
                placeholder="*********"
              />
              @if(errors.password){
              <div class="text-red-400 text-sm mt-1">
                {{ errors.password }}
              </div>
              }
            </div>

            <div class="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                class="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: Partial<Record<keyof LoginData, string>> = {};

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    new Promise((_, reject) => {
      setTimeout(() => {
        reject('123123123');
      }, 3000);
    });
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    const result = v.safeParse(loginSchema, this.loginForm.value);

    if (!result.success) {
      // 收集错误
      this.errors = {};

      return;
    }

    // 清空错误
    this.errors = {};

    // 调用登录逻辑
    const success = this.auth.login(
      result.output.email,
      result.output.password
    );
    if (success) {
      this.router.navigate(['/']);
    } else {
      alert('登录失败，请检查账号或密码');
    }
  }
}
