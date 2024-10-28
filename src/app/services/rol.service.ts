import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../model/Rol';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRoles():Observable<Rol[]>{
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  getRol(idRol:number):Observable<Rol>{
    return this.http.get<any>(`${this.apiUrl}/roles/${idRol}`);
  }
}
