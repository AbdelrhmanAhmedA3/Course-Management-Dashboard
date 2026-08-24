import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
 private navEndSignal = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
  );

  private navEndEffect = effect(() => {
    if (!this.navEndSignal()) return;
    this.removeSplashScreen();
  });

  removeSplashScreen() {
    document.getElementById('splash-screen')?.remove();
    document.getElementById('splash-styles')?.remove();
  }
}
