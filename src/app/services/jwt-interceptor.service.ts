import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { error } from 'console';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        // Check if the error is due to an expired token
        if (error.status === 401 && error.error.message === 'Token has expired') {
          // Refresh the token and retry the request
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('jwt');
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(request);
            })
          );
        } else {
          /*this.authService.logout();
          this.router.navigate(['']);*/
          throw error;
        }
      })
    );
  }
}
