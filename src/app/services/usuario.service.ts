import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<any[]>('http://localhost:8080/api/usuarios').pipe(
      map(response => {
        return response.map(usuario => {
          const mappedRol: Usuario = {
            idUsuario: usuario.idUsuario,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            correo:usuario.correo,
            fechaNacimiento:usuario.fechaNacimiento,
            dirreccion:usuario.dirreccion,
            telefono:usuario.telefono,
            dpi:usuario.dpi,
            estado:usuario.estado,
            rol:usuario.rol
          };
          return mappedRol;
        });
      })
    );
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
