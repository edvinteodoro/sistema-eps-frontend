import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bitacora } from '../model/Bitacora';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recurso } from '../model/Recurso';
import { ComentarioBitacora } from '../model/ComentarioBitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private http: HttpClient) { }

  getBitacoras(page: number, size: number, nombres?: string, registro?: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    if (nombres != undefined) {
      params = params.set('nombre', nombres);
    }
    if (registro != undefined) {
      params = params.set('registroAcademico', registro);
    }
    return this.http.get<any>('http://localhost:8080/api/bitacoras', { params });
  }

  getBitacora(idBitacora: number): Observable<Bitacora> {
    return this.http.get<any>('http://localhost:8080/api/bitacoras/' + idBitacora);
  }

  actualizarBitacora(idBitacora: number, bitacora: Bitacora): Observable<Bitacora> {
    return this.http.put<any>('http://localhost:8080/api/bitacoras/' + idBitacora, bitacora);
  }

  getRecursos(idBitacora: number): Observable<Recurso[]> {
    return this.http.get<any[]>('http://localhost:8080/api/bitacoras/' + idBitacora + '/recursos');
  }
  agregarRecurso(idBitacora: number, recurso: Recurso): Observable<Recurso> {
    const formData = new FormData();
    if (recurso.file != undefined) {
      formData.append('file', recurso.file);
    } else if (recurso.link != undefined) {
      formData.append('link', recurso.link);
    }
    console.log('tipoRecurso', recurso.tipoRecurso)
    if (recurso.tipoRecurso) {
      formData.append('tipoRecurso', recurso.tipoRecurso);
    }
    return this.http.post<any>('http://localhost:8080/api/bitacoras/' + idBitacora + '/recursos', formData);
  }

  eliminarRecurso(idBitacora: number, idRecurso: number): Observable<Bitacora> {
    return this.http.delete<any>('http://localhost:8080/api/bitacoras/' + idBitacora + '/recursos/' + idRecurso);
  }

  comentar(idBitacora: number, comentario: ComentarioBitacora): Observable<ComentarioBitacora> {
    return this.http.post<any>('http://localhost:8080/api/bitacoras/' + idBitacora + '/comentarios', comentario);
  }

  getComentarios(idBitacora: number, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>('http://localhost:8080/api/bitacoras/' + idBitacora + '/comentarios', { params });
  }

  revisarBitacora(idBitacora:number):Observable<Bitacora>{
    return this.http.put<any>('http://localhost:8080/api/bitacoras/'+idBitacora+'/revisar',{});  
  }

}
