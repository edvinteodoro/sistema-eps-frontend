import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carrera } from '../model/Carrera';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  crearCarrera(obj:any):Observable<any> {
    return this.http.post(`${this.apiUrl}/carreras`,obj);   
  }

  getCarreras():Observable<Carrera[]>{
    return this.http.get<any[]>(`${this.apiUrl}/carreras`);
  }
}
