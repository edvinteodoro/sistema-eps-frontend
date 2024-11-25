import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventData } from '../shared/event.class';
import { EventBusService } from '../shared/event-bus.service';
import { StorageService } from './storage.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: Subject<string> = new Subject<string>();

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private eventBusService: EventBusService
  ) {}

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next('');

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            this.storageService.saveUser(response);
            this.refreshTokenSubject.next(response.accessToken);

            const updatedRequest = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${response.accessToken}`)
            });
            return next.handle(updatedRequest);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.error(error);

            if (error.status === 403) {
              alert('Su sesión ha expirado.');
              this.eventBusService.emit(new EventData('logout', null));
              this.storageService.clean();
              window.location.reload();
            }

            return throwError(() => error);
          })
        );
      }
    }

    // Queue other requests while the token is refreshing
    return this.refreshTokenSubject.pipe(
      filter((token) => !!token),
      take(1),
      switchMap((token) => {
        const updatedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(updatedRequest);
      })
    );
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
