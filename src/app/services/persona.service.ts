import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPersona(idPersona:string): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/personas/${idPersona}`);
  }
}
