import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../model/Requisito';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescargasService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  descargar(key: string): Observable<Requisito> {
    const encodedKey = encodeURIComponent(key);
    return this.http.get<any>(`${this.apiUrl}/descargas?key=${encodedKey}`);
  }
}
