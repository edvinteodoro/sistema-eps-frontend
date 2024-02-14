import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../model/Requisito';

@Injectable({
  providedIn: 'root'
})
export class DescargasService {

  constructor(private http: HttpClient) { }

  descargar(key: string): Observable<Requisito> {
    const encodedKey = encodeURIComponent(key);
    return this.http.get<any>('http://localhost:8080/api/descargas?key=' + encodedKey);
  }
}
