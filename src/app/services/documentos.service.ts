import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../model/Requisito';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) { }

  getRequisito(idElmentoProyecto:number):Observable<Requisito>{
    return this.http.get<any>('http://localhost:8080/api/documentos/'+idElmentoProyecto+'/elemento');
  }

  getDocumento(url:String):Observable<Requisito>{
    return this.http.get<any>('http://localhost:8080/api/documentos/url?url='+url);
  }

  getDocumentos(categoria?:String):Observable<Requisito[]>{
    let params = new HttpParams();
    if(categoria && categoria.trim()!==''){
      params = params.set('categoria', categoria.toString());   
    }
    return this.http.get<any>('http://localhost:8080/api/documentos',{params});
  }
}
