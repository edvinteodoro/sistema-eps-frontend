import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carrera } from '../model/Carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http: HttpClient) { }

  crearCarrera(obj:any):Observable<any> {
    return this.http.post('http://localhost:8080/api/carreras',obj);   
  }

  getCarreras():Observable<Carrera[]>{
    return this.http.get<any[]>('http://localhost:8080/api/carreras').pipe(
      map(response => {
        return response.map(carrera => {
          const mappedRol: Carrera = {
            idCarrera: carrera.idCarrera,
            titulo: carrera.titulo
          };
          return mappedRol;
        });
      })
    );
  }

  
}
