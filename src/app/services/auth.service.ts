import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivarUsuario } from '../model/ActivarUsuario';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'jwt';

  constructor(private http: HttpClient) { }

  onLogin(obj:any):Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login',obj).pipe(
      tap((authResult:any)=>{
        console.log('jwt: ',authResult.jwt);
        localStorage.setItem(this.JWT_TOKEN, authResult.jwt);
      })
    );   
  }

  getUserRole(): string{
    const token =localStorage.getItem('jwt');
    if(token){
      const decodedToken = jwt_decode<{ authorities: { authority: string }[] }>(token);
      const userRole = decodedToken.authorities[0].authority;
      return userRole;
    }
    return "No";
  }

  activarUsuario(activarUsuario:ActivarUsuario):Observable<any>{
    return this.http.post('http://localhost:8080/api/auth/activar',activarUsuario);
  }

  getAuthToken(){
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  refreshToken() {
    // Send a request to refresh the JWT
    return this.http.get('/api/refreshToken').pipe(
      tap((authResult: any) => {
        // Update the JWT in localStorage
        localStorage.setItem(this.JWT_TOKEN, authResult.jwt);
      })
    );
  }
}
