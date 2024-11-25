import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { ElementoUtils, Role } from 'src/app/model/Utils';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: './listado.component.html',
    providers: [MessageService]
})
export class ListadoComponent implements OnInit {

    mostrarOpcionBitacora: boolean = false;
    proyectos!: Proyecto[];

    totalRecords!: number;
    loading: boolean = false;
    idUsuario!: number;
    isSupervisor: boolean = false;
    isSecretaria: boolean = false;
    isEstudiante: boolean = false;
    isAsesor: boolean = false;
    isContraparte: boolean = false;
    isCoordinadorEps: boolean = false;
    isCoordinadorCarrera: boolean = false;

    rolUsuario: string = "";

    nombreFilter: string = '';
    registroFilter: string = '';

    constructor(private proyectoService: ProyectoService, private messageService: MessageService,
        private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.idUsuario = this.authService.getUserId();
        this.getUsuarioRol();
        this.rolUsuario = this.authService.getUserRole();
    }

    getUsuarioRol() {
        if (this.authService.hasRole(Role.Estudiante)) {
            this.isEstudiante = true;
        } if (this.authService.hasRole(Role.Secretaria)) {
            this.isSecretaria = true;
        } if (this.authService.hasRole(Role.Supervisor)) {
            this.isSupervisor = true;
        } if (this.authService.hasRole(Role.Contraparte)) {
            this.isContraparte = true;
        } if (this.authService.hasRole(Role.Asesor)) {
            this.isAsesor = true;
        } if (this.authService.hasRole(Role.Coordinador)) {
            this.isCoordinadorCarrera = true;
        } if (this.authService.hasRole(Role.CoordinadorEps)) {
            this.isCoordinadorEps = true;
        }
    }

    revisarProyecto(proyecto: Proyecto) {
        this.router.navigate(['gestiones/proyecto'], { state: { data: proyecto.idProyecto } });
    }

    revisarBitacora(proyecto: Proyecto) {
        this.router.navigate(['bitacoras/listado'], {
            state: {
                registroAcademico: proyecto.usuario!.registroAcademico,
                idProyecto: proyecto.idProyecto
            }
        });
    }

    loadProyectos(event: any) {
        this.proyectos = [];
        let page = event.first / 10;
        this.loading = true;
        this.proyectoService.getProyectos(page, 10).subscribe(response => {
            this.proyectos = response.content;
            this.proyectos.forEach(proyecto => {
                proyecto.requiereAtencion = false;
                this.proyectoService.getElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
                    proyecto.elementoTitulo = elementoProyecto;
                });
                if (this.isSupervisor && this.isCoordinadorEps) {
                    if (proyecto.etapaActiva!.rol && (proyecto.etapaActiva!.rol.titulo == Role.Supervisor)) {
                        this.proyectoService.getSupervisor(proyecto.idProyecto!).subscribe(supervisor => {
                            if (supervisor.idUsuario == this.idUsuario.toString()) {
                                proyecto.requiereAtencion = true;
                            }
                        });
                    } else if (proyecto.etapaActiva!.rol && (proyecto.etapaActiva!.rol.titulo == Role.CoordinadorEps)) {
                        proyecto.requiereAtencion = true;
                    }
                } else if (proyecto.etapaActiva!.rol && proyecto.etapaActiva!.rol.titulo == this.rolUsuario) {
                    proyecto.requiereAtencion = true;
                }
            })
            this.totalRecords = response.totalElements;
            this.loading = false;
        }, (error) => {
            this.loading = false;
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: "Hubo un error al intentar obtener el listado de proyectos." });
        })
    }

    buscar() {
        this.proyectoService.getProyectos(0, 10, this.nombreFilter, this.registroFilter).subscribe(response => {
            this.proyectos = response.content;
            this.proyectos.forEach(proyecto => {
                this.proyectoService.getElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
                    proyecto.elementoTitulo = elementoProyecto;
                })
            })
            this.totalRecords = response.totalElements;
        });
    }
}
