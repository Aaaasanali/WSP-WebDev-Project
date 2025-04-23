import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return userService.refreshToken().pipe(
          switchMap((response: any) => {
            const newAccessToken = response.access;
            localStorage.setItem('access_token', newAccessToken);

            // Clone the original request with new token
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });

            // Retry the failed request
            return next(clonedRequest);
          }),
          catchError(refreshError => {
            // Refresh failed — logout
            userService.logout();
            return throwError(refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
