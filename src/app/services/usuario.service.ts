import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Carrera } from '../model/Carrera';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsuarios(page: number, size: number, usuarioFilter?: Usuario, idRol?: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    if (usuarioFilter) {
      if (usuarioFilter.nombreCompleto && usuarioFilter.nombreCompleto.trim() !== '') {
        params = params.set('nombre', usuarioFilter.nombreCompleto.toString());
      }
      if (usuarioFilter.numeroColegiado && usuarioFilter.numeroColegiado.trim() !== '') {
        params = params.set('colegiado', usuarioFilter.numeroColegiado.toString());
      }
      if (usuarioFilter.registroAcademico && usuarioFilter.registroAcademico.trim() !== '') {
        params = params.set('registroAcademico', usuarioFilter.registroAcademico.toString());
      }
      if (usuarioFilter.dpi && usuarioFilter.dpi.trim() !== '') {
        params = params.set('dpi', usuarioFilter.dpi.toString());
      }
    }
    if (idRol) {
      params = params.set('idRol', idRol.toString());
    }
    return this.http.get<any>(`${this.apiUrl}/usuarios`, { params });
  }

  crearUsuario(usuario: any): Observable<Usuario> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
  }

  actualizarUsuario(idUsuario: String, usuario: any): Observable<Usuario> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${idUsuario}`, usuario);
  }

  getUsuario(idUsuario: string): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${idUsuario}`);
  }

  getUsuarioCarreras(): Observable<Carrera[]> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/actual/carreras`);
  }

  getCoordinadorEps(): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/coordinador-eps`);
  }

  activarUsuario(idUsuario: String): Observable<Usuario> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/${idUsuario}/reset-password`, {});
  }

  desactivarUsuario(idUsuario: String): Observable<Usuario> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/${idUsuario}/desactivar`, {});
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
