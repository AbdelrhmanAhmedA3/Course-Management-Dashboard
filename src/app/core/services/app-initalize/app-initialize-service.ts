import { Injectable, inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AppInitializeService {
  private authService = inject(AuthService);

  initialize(): void {
    this.authService.checkInitialAuthentication();
  }
}
