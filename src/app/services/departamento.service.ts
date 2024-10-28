import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../model/Departamento';
import { Municipio } from '../model/Municipio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDepartamentos():Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/departamentos`);
  }

  getDepartamento(idMunicipio:String):Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/municipios/${idMunicipio}/departamento`);
  }

  getMunicipios(idDepartamento:String):Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrl}/departamentos/${idDepartamento}/municipios`);
  }

}
