import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titulo } from '../model/Titulo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  constructor(private http: HttpClient) { }

  getTitulos():Observable<Titulo[]>{
    return this.http.get<any[]>('http://localhost:8080/api/titulos');
  }

  getTitulo(idTitulo:string):Observable<Titulo>{
    return this.http.get<any>('http://localhost:8080/api/titulos/'+idTitulo);
  }
}
