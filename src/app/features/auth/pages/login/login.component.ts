import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'core/services';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputIcon, IconField, InputText,Password],
  template: `
    <div class="min-h-screen flex flex-col md:flex-row justify-center">
      <!-- Image Half -->
      <div class="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        <!-- Placeholder for image -->
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Login Background" class="object-fill w-full h-full" />
      </div>
      
      <!-- Form Half -->
      <div class="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div class="max-w-md w-full">
          <h2 class="text-3xl font-bold mb-6 text-gray-900 text-center">Welcome Back</h2>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <div class="mt-1">
                <p-iconfield>
                  <input pInputText  id="email" 
                  type="email" 
                  formControlName="email"
                  fluid
                  placeholder="admin@example.com" />
                  <p-inputicon class="pi pi-envelope" />
            </p-iconfield>
            </div>
              @if (loginForm.controls['email'].invalid && loginForm.controls['email'].touched) {
                <p class="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
              }
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <p-password 
                formControlName="password"
                inputId="password"
                [toggleMask]="true" 
                fluid 
  
/>
              </div>
              @if (loginForm.controls['password'].invalid && loginForm.controls['password'].touched) {
                <p class="mt-2 text-sm text-red-600">Password is required.</p>
              }
            </div>

            <div>
              <button 
                type="submit" 
                [disabled]="loginForm.invalid"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['admin@example.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const fakeToken = btoa(this.loginForm.value.email || 'user');
      this.authService.login(fakeToken);
    }
  }
}
