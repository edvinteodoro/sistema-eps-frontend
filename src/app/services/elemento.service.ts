import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElementoProyecto } from '../model/ElementoProyecto';
import { Observable } from 'rxjs/internal/Observable';
import { Elemento } from '../model/Elemento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  crearElementoProyecto(idProyecto: String, idElemento: String, elementoProyecto: ElementoProyecto): Observable<ElementoProyecto> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/elementos/${idElemento}/elemento-proyecto`, elementoProyecto);
  }

  getElementos(idEtapa: number): Observable<Elemento[]> {
    return this.http.get<any>(`${this.apiUrl}/etapas/${idEtapa}/elementos`);
  }
}
