import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivarUsuario } from '../model/ActivarUsuario';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'jwt';

  constructor(private http: HttpClient,
    private storageService:StorageService) { }

  login(obj:any):Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login',obj).pipe(
      tap((authResult:any)=>{
        this.storageService.saveUser(authResult);
      })
    );   
  }

  getUserRole(): string{
    const token =this.storageService.getUser().accessToken;
    if(token){
      const decodedToken = jwt_decode<{ authorities: string[] }>(token);
      const userRole = decodedToken.authorities[0];
      return userRole;
    }
    return "No";
  }

  getUserId():number{
    const userId =this.storageService.getUser().idUsuario;
    return userId;
  }

  hasRole(role:string):boolean{
    const token = this.storageService.getUser().accessToken;
    if (token) {
      const decodedToken = jwt_decode<{ authorities: string[] }>(token);
      return decodedToken.authorities.includes(role);
    }
    return false;
  }

  activarUsuario(activarUsuario:ActivarUsuario):Observable<any>{
    return this.http.post('http://localhost:8080/api/auth/activar-cuenta',activarUsuario);
  }

  refreshToken() {
    const authToken = {refreshToken:this.storageService.getUser().refreshToken,
    };
    return this.http.post('http://localhost:8080/api/auth/refresh-token',authToken,httpOptions).pipe(
      tap((authResult: any) => {
        this.storageService.saveUser(authResult);
      })
    );
  }
}
