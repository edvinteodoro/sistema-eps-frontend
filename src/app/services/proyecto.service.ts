import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Proyecto } from '../model/Proyecto';
import { Comentario, Etapa, EtapaProyecto } from '../model/Comentario';
import { Evaluacion } from '../model/Evaluacion';
import { Carrera } from '../model/Carrera';
import { Usuario } from '../model/Usuario';
import { Bitacora } from '../model/Bitacora';
import { ElementoProyecto } from '../model/ElementoProyecto';
import { Institucion } from '../model/Institucion';
import { Recurso } from '../model/Recurso';
import { Convocatoria } from '../model/Convocatoria';
import { Acta } from '../model/Acta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<any>(`${this.apiUrl}/proyectos`, proyecto);
  }

  actualizarProyecto(idProyecto: number, proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}`, proyecto);
  }

  agregarElementoProyecto(idProyecto: number, idElemento: number, elementoProyecto: ElementoProyecto) {
    const formData = new FormData();
    if (elementoProyecto.informacion != undefined) {
      formData.append('informacion', elementoProyecto.informacion.toString());
    } else if (elementoProyecto.file != undefined) {
      formData.append('file', elementoProyecto.file);
    }
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/elementos/${idElemento}/elemento-proyecto`, formData);
  }

  desactivarElementoProyecto(idElementoProyecto: number) {
    return this.http.put<any>(`${this.apiUrl}/elementos/${idElementoProyecto}/desactivar`, {});
  }

  actualizarElementoProyecto(idProyecto: number, idElemento: number, elementoProyecto: ElementoProyecto) {
    const formData = new FormData();
    if (elementoProyecto.informacion != undefined) {
      formData.append('informacion', elementoProyecto.informacion.toString());
    } else if (elementoProyecto.file != undefined) {
      formData.append('file', elementoProyecto.file);
    }
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/elementos/${idElemento}/elemento-proyecto`, formData);
  }

  getElementoProyecto(idProyecto: number, idElemento: number) {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/elementos/${idElemento}/elemento-proyecto`);
  }

  getProyectoPorId(idProyecto: number): Observable<Proyecto> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}`);
  }

  finalizarProyecto(idProyecto: number, comentario: Comentario): Observable<Proyecto> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/finalizar-proyecto`, comentario);
  }

  getProyectos(page: number, size: number, nombreFilter?: string, registroAcademico?: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    if (nombreFilter && nombreFilter.trim() !== '') {
      params = params.set('nombre', nombreFilter);
    }
    if (registroAcademico && registroAcademico.trim() !== '') {
      params = params.set('registroAcademico', registroAcademico.toString());
    }
    return this.http.get<any>(`${this.apiUrl}/proyectos`, { params });
  }

  getProyectosActivos(): Observable<Proyecto[]> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/activos`);
  }

  getPersonaAsesor(idProyecto: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/personas/asesor`);
  }

  getUsuarioAsesor(idProyecto: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/usuarios/asesor`);
  }

  actualizarAsesorProyecto(idProyecto: number, asesor: Usuario): Observable<Usuario> {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}/usuarios/asesor`, asesor);
  }

  actualizarSupervisorProyecto(idProyecto: number, supervisor: Usuario): Observable<Usuario> {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}/usuarios/supervisor`, supervisor);
  }

  actualizarContraparteProyecto(idProyecto: number, contraparte: Usuario): Observable<Usuario> {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}/usuarios/contraparte`, contraparte);
  }

  getPersonaContraparte(idProyecto: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/personas/contraparte`);
  }

  getUsuarioContraparte(idProyecto: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/usuarios/contraparte`);
  }

  /*actualizarContraparte(proyectoId: String, contraparte: Usuario): Observable<Usuario> {
    return this.http.put<any>('http://localhost:8080/api/proyectos/' + proyectoId + '/contraparte', contraparte);
  }*/

  /*actualizarAsesor(idProyecto: String, idAsesor: String, asesor: Usuario): Observable<Usuario> {
    return this.http.put<any>('http://localhost:8080/api/proyectos/' + idProyecto + '/asesores/' + idAsesor, asesor);
  }*/

  actualizarPersona(idProyecto: number, idPersona: String, persona: Usuario): Observable<Usuario> {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}/personas/${idPersona}`, persona);
  }

  getInstitucion(idProyecto: number): Observable<Institucion> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/institucion`);
  }

  actualizarInstitucion(idProyecto: number, institucion: Institucion): Observable<Institucion> {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}/institucion`, institucion);
  }

  getAsesoresTecnicos(idProyecto: number): Observable<Usuario[]> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/personas/asesores-tecnicos`);
  }

  /*getAsesorTecnicos(idProyecto: String,idAsesorTecnico:string): Observable<Usuario> {
    return this.http.get<any>('http://localhost:8080/api/proyectos/' + idProyecto + '/asesores-tecnicos/'+idAsesorTecnico);
  }*/

  agregarAsesorTecnicos(idProyecto: number, asesorTecnico: Usuario): Observable<Usuario> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/personas/asesores-tecnicos`, asesorTecnico);
  }

  eliminarAsesorTecnicos(idProyecto: number, idAsesorTecnico: String) {
    return this.http.delete<any>(`${this.apiUrl}/personas/${idAsesorTecnico}`);
  }

  getSupervisor(idProyecto: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/usuarios/supervisor`);
  }

  getComentariosEtapa(idProyecto: number, etapaId: number): Observable<Comentario[]> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/etapa/${etapaId}/comentarios`);
  }

  getComentarios(idProyecto: number, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/comentarios`, { params });
  }

  getEtapasProyecto(idProyecto: number): Observable<Etapa[]> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/etapas`);
  }

  getEtapaActiva(idProyecto: number): Observable<EtapaProyecto> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/etapa-proyecto-activa`);
  }

  aprobacionSecretaria(idProyecto: number) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/aprobar-cambios-secretaria`, {});
  }

  aprobacionSupervisor(idProyecto: number, usuario: Usuario) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/aprobar-cambios-supervisor`, usuario);
  }

  aprobacionInformeFinalSupervisor(idProyecto: number) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/aprobar-informe-final-supervisor`, {});
  }

  habilitarBitacora(idProyecto: number, usuario: Usuario) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/habilitar-bitacora`, usuario);
  }

  comentar(idProyecto: number, comentario: Comentario): Observable<Comentario> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/comentarios`, comentario);
  }

  solicitarCambios(idProyecto: number, comentario: Comentario): Observable<Comentario> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/solicitar-cambios`, comentario);
  }

  solicitarRevision(idProyecto: number) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/solicitar-revision`, {});
  }

  crearConvocatoriaAnteproyecto(idProyecto: number, convocatoria: Convocatoria) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/convocatoria-anteproyecto`, convocatoria);
  }

  actualizarConvocatoriaAnteproyecto(idProyecto: number, convocatoria: Convocatoria) {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}/convocatoria-anteproyecto`, convocatoria);
  }

  getConvocatoriaAnteproyecto(idProyecto: number): Observable<Convocatoria> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/convocatoria-anteproyecto`);
  }

  getConvocatoriaExamenGeneral(idProyecto: number): Observable<Convocatoria> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/convocatoria-examen-general`);
  }

  getActaAnteproyecto(idProyecto: number): Observable<Acta> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/acta-anteproyecto`);
  }

  getActaExamenGeneral(idProyecto: number): Observable<Acta> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/acta-examen-general`);
  }

  crearActa(idProyecto: number, acta: Acta) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/acta`, acta);
  }

  generarActaAnteproyecto(idProyecto: number, acta: Acta): Observable<Acta> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/generar-acta-anteproyecto`, acta);
  }

  generarActaExamenGeneral(idProyecto: number, acta: Acta): Observable<Acta> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/generar-acta-examen-general`, acta);
  }

  generarActaAprobacion(idProyecto: number, acta: Acta): Observable<Acta> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/generar-acta-aprobacion`, acta);
  }

  getFechaEvaluacionAnteproyecto(idProyecto: number): Observable<Evaluacion> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/fecha-evaluacion-anteproyecto`);
  }
  cambiarFechaEvaluacionAnteproyecto(idProyecto: number, evaluacion: Evaluacion) {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${idProyecto}/fecha-evaluacion-anteproyecto`, evaluacion);
  }

  cargarConvocatoria(idProyecto: number, convocatoria: any) {
    const formData = new FormData();
    formData.append('file', convocatoria);
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/cargar-convocatoria-anteproyecto`, formData);
  }

  cargarInformeFinal(idProyecto: number, cartaAsesor: any,informeFinal: any) {
    const formData = new FormData();
    formData.append('informeFinal', informeFinal);
    formData.append('cartaAsesor', cartaAsesor);
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/cargar-informe-final`, formData);
  }

  cargarCartaAceptacionContraparte(idProyecto: number, carta: any,oficioContraparte:any) {
    const formData = new FormData();
    formData.append('cartaAceptacion', carta);
    formData.append('oficioContraparte', oficioContraparte);
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/cargar-carta-aceptacion-contraparte`, formData);
  }

  subirNota(idProyecto: number, evaluacion: Evaluacion) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/subir-nota`, evaluacion);
  }

  getCoordinadorCarrera(idProyecto: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/usuarios/coordinador-carrera`);
  }

  getResultado(idProyecto: number): Observable<Evaluacion> {
    return this.http.get<any>(`${this.apiUrl}/proyectos/${idProyecto}/resultado`);
  }

  agregarBitacora(idProyecto: number, bitacora: Bitacora): Observable<Bitacora> {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/bitacoras`, bitacora);
  }

  agregarRecursoBitacora(idBitacora: any, recurso: Recurso): Observable<Bitacora> {
    const formData = new FormData();
    if (recurso.file != undefined) {
      formData.append('file', recurso.file);
    } else if (recurso.link != undefined) {
      formData.append('link', recurso.link);
    }
    if (recurso.tipoRecurso) {
      formData.append('tipoRecurso', recurso.tipoRecurso);
    }
    return this.http.post<any>(`${this.apiUrl}/bitacoras/${idBitacora}/recursos`, formData);
  }

  finalizarBitacora(idProyecto: number, finiquitoContraparte: any) {
    const formData = new FormData();
    formData.append('finiquitoContraparte', finiquitoContraparte);
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/finalizar-bitacora`, formData);
  }

  aprobarBitacora(idProyecto: number) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/aprobar-bitacora`, {});
  }

  rechazarBitacora(idProyecto: number) {
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/rechazar-bitacora`, {});
  }

  cargarArticulo(idProyecto: number, articulo: any, traduccionArticulo: any,constanciaLinguistica: any) {
    const formData = new FormData();
    formData.append('articulo', articulo);
    formData.append('traduccionArticulo', traduccionArticulo);
    formData.append('constanciaLinguistica', constanciaLinguistica);
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/cargar-articulo`, formData);
  }

  /*cargarConstanciaLinguistica(idProyecto: number, constanciaLinguistica: any) {
    const formData = new FormData();
    formData.append('constanciaLinguistica', constanciaLinguistica);
    return this.http.post<any>('http://localhost:8080/api/proyectos/' + idProyecto + '/cargar-constancia-linguistica', formData);
  }*/

  cargarDictamenRevision(idProyecto: number, dictamenRevision: any, cartaRevision: any) {
    const formData = new FormData();
    formData.append('dictamenRevision', dictamenRevision);
    formData.append('cartaRevision', cartaRevision);
    return this.http.post<any>(`${this.apiUrl}/proyectos/${idProyecto}/cargar-dictamen-revision`, formData);
  }

}
