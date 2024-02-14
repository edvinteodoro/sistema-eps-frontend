import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElementoProyecto } from '../model/ElementoProyecto';
import { Observable } from 'rxjs/internal/Observable';
import { Elemento } from '../model/Elemento';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {

  constructor(private http: HttpClient) { }

  crearElementoProyecto(idProyecto: String, idElemento: String, elementoProyecto: ElementoProyecto): Observable<ElementoProyecto> {
    return this.http.post<any>('http://localhost:8080/api/proyectos/' + idProyecto + '/elementos/' + idElemento + '/elemento-proyecto', elementoProyecto);
  }

  getElementos(idEtapa: number): Observable<Elemento[]> {
    return this.http.get<any>('http://localhost:8080/api/etapas/' + idEtapa + '/elementos');
  }
}
