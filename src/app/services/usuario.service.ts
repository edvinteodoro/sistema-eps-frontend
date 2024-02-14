import { HttpClient, HttpParams } from '@angular/common/http';
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

  getUsuarios(page: number, size: number,rol?:Number,
    nombreCompleto?:String,colegiado?:String,registro?:String,dpi?:String):Observable<any>{
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    console.log('dpi: ',dpi)
    if(rol){
      params = params.set('idRol', rol.toString());     
    }
    if(nombreCompleto && nombreCompleto.trim()!==''){
      params = params.set('nombre', nombreCompleto.toString());   
    }
    if(colegiado && colegiado.trim()!==''){
      params = params.set('colegiado', colegiado.toString());   
    }
    if(registro && registro.trim()!==''){
      params = params.set('registroAcademico', registro.toString());   
    }
    if(dpi && dpi.trim()!==''){
      params = params.set('dpi', dpi.toString());   
    }
    return this.http.get<any>('http://localhost:8080/api/usuarios',{params}); 
  }

  crearUsuario(usuario:any):Observable<Usuario>{
    return this.http.post<any>('http://localhost:8080/api/usuarios',usuario);  
  }

  getUsuario(idUsuario:string):Observable<Usuario>{
    return this.http.get<any>('http://localhost:8080/api/usuarios/'+idUsuario);  
  }

  getUsuarioCarreras():Observable<Carrera[]>{
    return this.http.get<any>('http://localhost:8080/api/usuarios/actual/carreras');
  }

  getCoordinadorEps():Observable<Usuario>{
    return this.http.get<any>('http://localhost:8080/api/usuarios/coordinador-eps');
  }

  activarUsuario(idUsuario:String):Observable<Usuario>{
    return this.http.post<any>('http://localhost:8080/api/usuarios/'+idUsuario+'/reset-password',{});
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
