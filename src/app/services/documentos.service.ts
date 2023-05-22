import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../model/Requisito';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) { }

  getDocumento(idDocumento:String):Observable<Requisito>{
    return this.http.get<any>('http://localhost:8080/api/documentos/'+idDocumento);
  }
}
