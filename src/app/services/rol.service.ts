import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../model/Rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  getRoles():Observable<Rol[]>{
    return this.http.get<any[]>('http://localhost:8080/api/roles');
  }
}
