import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      console.log('url: ',request.url);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('token',authToken)
    }
    return next.handle(request);
  }
}
