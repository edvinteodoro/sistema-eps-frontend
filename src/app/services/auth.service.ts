import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivarUsuario } from '../model/ActivarUsuario';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Role } from '../model/Utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private readonly JWT_TOKEN = 'jwt';

  constructor(private http: HttpClient,
    private storageService: StorageService) { }

  login(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, obj).pipe(
      tap((authResult: any) => {
        this.storageService.saveUser(authResult);
      })
    );
  }

  getUserRole(): string {
    const token = this.storageService.getUser().accessToken;
    if (token) {
      const decodedToken = jwt_decode<{ authorities: string[] }>(token);
      const roles = decodedToken.authorities;
      let userRole = decodedToken.authorities[0];
      if (roles.length > 1) {
        if (roles.includes(Role.Supervisor)) {
          userRole = Role.Supervisor;
        }
      }
      return userRole;
    }
    return "No";
  }

  getUserId(): number {
    const userId = this.storageService.getUser().idUsuario;
    return userId;
  }

  hasRole(role: string): boolean {
    const token = this.storageService.getUser().accessToken;
    if (token) {
      const decodedToken = jwt_decode<{ authorities: string[] }>(token);
      return decodedToken.authorities.includes(role);
    }
    return false;
  }

  activarUsuario(activarUsuario: ActivarUsuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/activar-cuenta`, activarUsuario);
  }

  refreshToken() {
    console.log('Refreshing token');
    const authToken = {
      refreshToken: this.storageService.getUser().refreshToken,
    };
    return this.http.post(`${this.apiUrl}/auth/refresh-token`, authToken, httpOptions).pipe(
      tap((authResult: any) => {
        console.log('new token set')
        this.storageService.saveUser(authResult);
      })
    );
  }
}
