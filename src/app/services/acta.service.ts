import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acta } from '../model/Acta';

@Injectable({
  providedIn: 'root'
})
export class ActaService {

  constructor(private http: HttpClient) { }

  getActas(page: number, size: number,nombres?:string,registroAcademico?:string): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    if (nombres != undefined) {
      params = params.set('nombre', nombres);
    }
    if (registroAcademico != undefined) {
      params = params.set('registroAcademico', registroAcademico);
    }
    return this.http.get<any>('http://localhost:8080/api/actas', { params });
  }

  getActa(idActa: number): Observable<Acta> {
    return this.http.get<any>('http://localhost:8080/api/actas/' + idActa);
  }
}
