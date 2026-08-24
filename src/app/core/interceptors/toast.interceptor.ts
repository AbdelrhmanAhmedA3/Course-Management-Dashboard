import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';

const MUTATING_METHODS = ['POST', 'PUT', 'DELETE'];

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    tap((event) => {
      if (
        event instanceof HttpResponse &&
        event.status >= 200 &&
        event.status < 300 &&
        MUTATING_METHODS.includes(req.method)
      ) {
        messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Operation completed successfully',
          life: 3000,
        });
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let detail = 'An unexpected error occurred.';

      if (error.status === 0) {
        detail = 'Network error. Please check your connection.';
      } else if (error.status === 401) {
        detail = 'Unauthorized. Please log in again.';
      } else if (error.status === 403) {
        detail = 'Forbidden. You do not have permission.';
      } else if (error.status === 404) {
        detail = 'Resource not found.';
      } else if (error.status >= 500) {
        detail = 'Server error. Please try again later.';
      } else if (error.error?.message) {
        detail = error.error.message;
      }

      messageService.add({
        severity: 'error',
        summary: `Error ${error.status || ''}`.trim(),
        detail,
        life: 5000,
      });

      return throwError(() => error);
    })
  );
};
