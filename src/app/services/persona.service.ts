import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  constructor(private http: HttpClient) { }

  getPersona(idPersona:string): Observable<Usuario> {
    return this.http.get<any>('http://localhost:8080/api/personas/' + idPersona);
  }
}
