import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Phase } from 'src/app/shared/models/phase.model';
import { Etapa } from 'src/app/model/Comentario';
import { DomSanitizer } from '@angular/platform-browser';
import { InputNumberModule } from 'primeng/inputnumber';
import { Evaluacion } from 'src/app/model/Evaluacion';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ElementoUtils, Role } from 'src/app/model/Utils';
import { ElementoProyecto } from 'src/app/model/ElementoProyecto';

@Component({
    templateUrl: './asignarUsuario.component.html',
    providers: [ConfirmationService, MessageService]
})

export class AsignarUsuarioComponent implements OnInit {
    idProyecto!: number;
    idPersona!: number;
    opcion!: Number;
    loading: boolean = true;
    isAsignando: boolean = false;
    proyecto!: Proyecto;
    elementoTitulo!: ElementoProyecto;
    persona!: Usuario;
    usuariosLista: Usuario[] = [];
    usuarioSeleccionado!: Usuario;
    nombresFiltro!: String;
    dpiFiltro!: String;
    colegiadoFiltro!: String;

    constructor(private location: Location, private router: Router, private confirmationService: ConfirmationService,
        private proyectoService: ProyectoService, private usuarioService: UsuarioService,
        private messageService: MessageService) { }


    ngOnInit() {
        this.getIdProyecto();
        this.getIdPersona();
        this.getOpcion();
        this.proyectoService.getProyectoPorId(this.idProyecto).subscribe(proyecto => {
            this.proyecto = proyecto;
            this.saveIdproyecto();
            this.saveIdPersona();
            this.saveOpcion();
            this.getTituloProyecto();
            this.getPersona();
        })
    }

    getIdProyecto() {
        this.idProyecto = (this.location.getState() as { idProyecto: number }).idProyecto;
        if (this.idProyecto == undefined) {
            const storedIdProyecto = sessionStorage.getItem('idProyecto');
            this.idProyecto = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
        }
        if (this.idProyecto == undefined) {
            this.regresar();
        }
    }

    saveIdproyecto() {
        sessionStorage.setItem('idProyecto', JSON.stringify(this.idProyecto));
    }

    getIdPersona() {
        this.idPersona = (this.location.getState() as { idPersona: number }).idPersona;
        if (this.idPersona == undefined) {
            const storedIdProyecto = sessionStorage.getItem('idPersona');
            this.idPersona = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
        }
        if (this.idPersona == undefined) {
            this.regresar();
        }
    }

    saveIdPersona() {
        sessionStorage.setItem('idPersona', JSON.stringify(this.idPersona));
    }

    getOpcion() {
        this.opcion = (this.location.getState() as { opcion: number }).opcion;
        if (this.opcion == undefined) {
            const storedIdProyecto = sessionStorage.getItem('opcion');
            this.opcion = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
        }
        if (this.opcion == undefined) {
            this.regresar();
        }
    }

    saveOpcion() {
        sessionStorage.setItem('opcion', JSON.stringify(this.opcion));
    }

    getTituloProyecto() {
        this.proyectoService.getElementoProyecto(this.idProyecto, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
            this.elementoTitulo = elementoProyecto;
            this.loading = false;
        });
    }

    getPersona() {
        if (this.opcion == 1) {
            this.proyectoService.getPersonaAsesor(this.idProyecto).subscribe(asesor => {
                this.persona = asesor;
                this.colegiadoFiltro = asesor.numeroColegiado!;
                this.getUsuarios();
            });
        }
        if (this.opcion == 2) {
            this.proyectoService.getPersonaContraparte(this.idProyecto).subscribe(contraparte => {
                this.persona = contraparte;
                this.dpiFiltro = contraparte.dpi!;
                this.getUsuarios();
            });
        }
    }

    getUsuarios() {
        if (this.opcion == 1) {
            this.usuarioService.getUsuarios(0, 10, { nombreCompleto: this.nombresFiltro, numeroColegiado: this.colegiadoFiltro }).subscribe(response => {
                console.log('usuarios', response.content);
                this.usuariosLista = response.content;
            })
        } else if (this.opcion == 2) {
            this.usuarioService.getUsuarios(0, 10, { nombreCompleto: this.nombresFiltro, numeroColegiado: this.colegiadoFiltro, dpi: this.dpiFiltro }).subscribe(response => {
                console.log('usuarios', response.content);
                this.usuariosLista = response.content;
            })
        }
    }

    getCarrerasString(usuario: Usuario): string {
        return usuario.carreras!.map(carrera => carrera.nombre).join(', ');
    }

    buscar() {
        this.getUsuarios();
    }

    crearUsuario() {
        this.router.navigate(['usuarios/crear-usuario'], { state: { idPersona: this.idPersona, tipo: this.opcion, carrera: this.proyecto.carrera } });
    }

    asignarAsesor() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de asignar el usuario seleccionado al proyecto?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isAsignando = true;
                this.proyectoService.aprobacionSupervisor(this.idProyecto, this.usuarioSeleccionado).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Asesor asignado', detail: 'Se ha asignado asesor exitosamente.' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                }, (error) => {
                    this.isAsignando = false;
                });
            }
        });
    }

    asignarContraparte() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de asignar la contraparte institucional seleccionada?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isAsignando = true;
                this.proyectoService.habilitarBitacora(this.idProyecto, this.usuarioSeleccionado).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Contraparte institucional asignado', detail: 'Se ha asignado contraparte institucional exitosamente.' });
                    setTimeout(() => {
                        this.isAsignando = false;
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                });
            }
        });
    }

    regresar() {
        this.router.navigate(['gestiones/proyecto'], { state: { data: this.idProyecto } });
    }

}
