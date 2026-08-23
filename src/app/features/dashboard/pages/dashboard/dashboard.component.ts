import { Component, inject } from '@angular/core';
import { AuthService } from 'core/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="mt-4">Welcome to the application!</p>
      <button (click)="logout()" class="mt-4 px-4 py-2 bg-red-600 text-white rounded">Logout</button>
    </div>
  `
})
export class DashboardComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
