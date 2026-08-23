import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'core/services';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink,Button],
  template: `
    <header class="bg-blue-900 text-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo / Title -->
          <div class="flex-shrink-0 flex items-center">
            <a routerLink="/" class="text-xl font-bold tracking-wider">
              Course Dashboard
            </a>
          </div>

          <!-- Navigation / Actions -->
          <div class="flex items-center space-x-4">
            <p-button 
            styleClass="bg-blue-700!"
              (click)="logout()" 
            >
              Logout
            </p-button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
