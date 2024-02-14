import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../model/Departamento';
import { Municipio } from '../model/Municipio';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getDepartamentos():Observable<Departamento[]> {
    return this.http.get<Departamento[]>('http://localhost:8080/api/departamentos');
  }

  getDepartamento(idMunicipio:String):Observable<Departamento> {
    return this.http.get<Departamento>('http://localhost:8080/api/municipios/'+idMunicipio+'/departamento');
  }

  getMunicipios(idDepartamento:String):Observable<Municipio[]> {
    return this.http.get<Municipio[]>('http://localhost:8080/api/departamentos/'+idDepartamento+'/municipios');
  }

}
