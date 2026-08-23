import { Service, inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Service()
export class AppInitializeService {
  private authService = inject(AuthService);

  initialize(): void {
    this.authService.checkInitialAuthentication();
  }
}
