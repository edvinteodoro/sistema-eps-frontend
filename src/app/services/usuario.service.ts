import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Carrera } from '../model/Carrera';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<any[]>('http://localhost:8080/api/usuarios');
  }

  crearUsuario(usuario:any):Observable<Usuario>{
    return this.http.post<any>('http://localhost:8080/api/usuarios',usuario);  
  }

  getUsuarioCarreras():Observable<Carrera[]>{
    return this.http.get<any[]>('http://localhost:8080/api/usuarios/actual/carreras');
  }
/*
  getUsuarios() {
    return this.http.get<any>('http://localhost:8080/api/usuarios')
        .toPromise()
        .then(res => res.data as Usuario[])
        .then(data => data);
}
*/
}
