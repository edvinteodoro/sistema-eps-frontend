import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titulo } from '../model/Titulo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TituloService {
  apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTitulos():Observable<Titulo[]>{
    return this.http.get<any[]>(`${this.apiUrl}/titulos`);
  }

  getTitulo(idTitulo:string):Observable<Titulo>{
    return this.http.get<any>(`${this.apiUrl}/titulos/${idTitulo}`);
  }
}
