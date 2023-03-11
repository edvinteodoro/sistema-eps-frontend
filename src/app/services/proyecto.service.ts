import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../model/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient) {}

  crearProyecto(proyecto:Proyecto):Observable<Proyecto>{
    const formData = new FormData();
    const carreraJson = JSON.stringify(proyecto.carrera); 
    console.log('carrera: ',carreraJson); 
    formData.append('titulo',proyecto.titulo);
    formData.append('coordenadas',proyecto.coordenadas);
    formData.append('carrera.idCarrera', proyecto.carrera.idCarrera);
    formData.append('carrera.titulo', proyecto.carrera.titulo); 
    formData.append('constanciaInscripcion',proyecto.constanciaInscripcion);
    formData.append('constanciaPropedeutico',proyecto.constanciaPropedeutico);
    formData.append('certificadoNacimiento',proyecto.certificadoNacimiento);
    formData.append('cartaAsesorSupervisor',proyecto.cartaAsesorSupervisor);
    formData.append('anteproyecto',proyecto.anteproyecto);
    return this.http.post<any>('http://localhost:8080/api/proyectos',formData);     
  }

}
