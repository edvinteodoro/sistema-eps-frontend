import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { error } from 'console';
import { Router } from '@angular/router';
import { EventData } from '../shared/event.class';
import { EventBusService } from '../shared/event-bus.service';
import { StorageService } from './storage.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private storageService: StorageService,
    private router: Router, private eventBusService: EventBusService) { }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            this.storageService.saveUser(response);
            const updatedRequest = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${response.accessToken}`)
            });
            return next.handle(updatedRequest);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            if (error.status == '403') {
              alert('Su sesion ha expirado.');
              this.eventBusService.emit(new EventData('logout', null));
              this.storageService.clean();
              window.location.reload();
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.storageService.isLoggedIn() && !this.isRefreshing) {
      const token = this.storageService.getUser().accessToken;
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }
  
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
];
