import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../model/Requisito';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRequisito(idElmentoProyecto:number):Observable<Requisito>{
    return this.http.get<any>(`${this.apiUrl}/documentos/${idElmentoProyecto}/elemento`);
  }

  getDocumento(url:String):Observable<Requisito>{
    return this.http.get<any>(`${this.apiUrl}/documentos/url?url=${url}`);
  }

  getDocumentos(categoria?:String):Observable<Requisito[]>{
    let params = new HttpParams();
    if(categoria && categoria.trim()!==''){
      params = params.set('categoria', categoria.toString());   
    }
    return this.http.get<any>(`${this.apiUrl}/documentos`,{params});
  }
}
