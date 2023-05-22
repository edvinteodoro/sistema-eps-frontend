import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../model/Proyecto';
import { Comentario, Etapa } from '../model/Comentario';
import { Evaluacion } from '../model/Evaluacion';

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
    formData.append('asesor.correo',proyecto.asesor!.correo!.toString());
    formData.append('asesor.fechaNacimiento',proyecto.asesor!.fechaNacimiento!.toString());
    formData.append('asesor.nombres',proyecto.asesor!.nombres!.toString());
    formData.append('asesor.apellidos',proyecto.asesor!.apellidos!.toString());
    formData.append('asesor.numeroColegiado',proyecto.asesor!.numeroColegiado!.toString());
    formData.append('asesor.registroAcademico',proyecto.asesor!.registroAcademico!.toString());
    formData.append('asesor.telefono',proyecto.asesor!.telefono!.toString());
    formData.append('asesor.dpi',proyecto.asesor!.dpi!.toString());
    formData.append('asesor.direccion',proyecto.asesor!.direccion!.toString());
    return this.http.post<any>('http://localhost:8080/api/proyectos',formData);     
  }

  getProyectoPorId(proyectoId:String):Observable<Proyecto>{
    return this.http.get<any>('http://localhost:8080/api/proyectos/'+proyectoId); 
  }

  getProyectos():Observable<Proyecto[]>{
    return this.http.get<any>('http://localhost:8080/api/proyectos'); 
  }

  getComentariosEtapa(proyectoId:String,etapaId:String):Observable<Comentario[]>{
    return this.http.get<any>('http://localhost:8080/api/proyectos/'+proyectoId+'/etapa/'+etapaId+'/comentarios'); 
  }

  getEtapasProyecto(proyectoId:String):Observable<Etapa[]>{
    return this.http.get<any>('http://localhost:8080/api/proyectos/'+proyectoId+'/etapas'); 
  }

  aprobarSecretaria(proyectoId:any){
    return this.http.post<any>('http://localhost:8080/api/proyectos/'+proyectoId+'/aprobarSecretaria',{}); 
  }

  comentar(proyectoId:any,texto:any):Observable<Comentario>{
    return this.http.post<any>('http://localhost:8080/api/proyectos/'+proyectoId+'/comentar',{texto:texto}); 
  }

  aprobarSupervisor(proyectoId:any){
    return this.http.post<any>('http://localhost:8080/api/proyectos/'+proyectoId+'/aprobarSupervisor',{}); 
  }

  definirEvaluacion(proyectoId:any, evaluacion:Evaluacion){
    return this.http.post<any>('http://localhost:8080/api/proyectos/'+proyectoId+'/definirEvaluacion',evaluacion); 
  }

}
