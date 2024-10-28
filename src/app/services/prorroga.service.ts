import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prorroga } from '../model/Prorroga';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProrrogaService {
  apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProrrogas(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.apiUrl}/prorrogas`, { params });
  }

  crearProrroga(idProyecto: number, prorroga: Prorroga, solicitud: any, amparo: any): Observable<Prorroga> {
    const formData = new FormData();
    formData.append('solicitudFile', solicitud);
    formData.append('amparoFile', amparo);
    formData.append('diasExtension', prorroga.diasExtension.toString());
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/prorrogas`, formData);
  }

  actualizarProrroga(idProrroga: number, dias?: number, solicitud?: any, amparo?: any): Observable<Prorroga> {
    const formData = new FormData();
    if (dias) {
      formData.append('diasExtension', dias.toString());
    }
    if (solicitud) {
      formData.append('solicitudFile', solicitud);
    }
    if (amparo) {
      formData.append('amparoFile', amparo);
    }
    return this.http.put<any>(`${this.apiUrl}/prorrogas/${idProrroga}`, formData);
  }

  responderProrroga(idProrroga:number,prorroga:Prorroga):Observable<Prorroga>{
    return this.http.put<any>(`${this.apiUrl}/prorrogas/${idProrroga}/responder`, prorroga);
  }

  getProrroga(idProrroga: number): Observable<Prorroga> {
    return this.http.get<any>(`${this.apiUrl}/prorrogas/${idProrroga}`);
  }
}
