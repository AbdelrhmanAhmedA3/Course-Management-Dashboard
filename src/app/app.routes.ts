import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/courses/pages/course-list/course-list.component').then(m => m.CourseListComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./features/courses/pages/course-details/course-details.component').then(m => m.CourseDetailsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
