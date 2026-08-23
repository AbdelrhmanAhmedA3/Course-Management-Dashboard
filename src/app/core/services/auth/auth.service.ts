import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isAuthenticated = signal<boolean>(false);
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor(private router: Router) {}

  checkInitialAuthentication(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this._isAuthenticated.set(true);
      return
    }
      this._isAuthenticated.set(false);
    
  }

  login(token: string): void {
    localStorage.setItem('user', token);
    this._isAuthenticated.set(true);
    this.router.navigate(['/']); 
  }

  logout(): void {
    localStorage.removeItem('user');
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
