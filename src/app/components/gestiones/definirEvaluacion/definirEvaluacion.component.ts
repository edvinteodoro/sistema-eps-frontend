import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Etapa } from 'src/app/model/Comentario';
import { ElementoUtils, EtapaUtils } from 'src/app/model/Utils';
import { DatePipe, Time } from '@angular/common';
import { ElementoProyecto } from 'src/app/model/ElementoProyecto';
import { Titulo } from 'src/app/model/Titulo';
import { TituloService } from 'src/app/services/titulo.service';
import { Convocatoria } from 'src/app/model/Convocatoria';


@Component({
    templateUrl: './definirEvaluacion.component.html',
    providers: [ConfirmationService, MessageService]
})

export class DefinirEvaluacionComponent implements OnInit {
    EtapaUtils = EtapaUtils;

    idProyecto!: number;
    proyecto!: Proyecto;

    elementoTitulo!: ElementoProyecto;
    coordinadorEps!: Usuario;
    coordinadorCarrera!: Usuario;
    supervisor!: Usuario;
    asesor!: Usuario;
    titulos!: Titulo[];
    formatedFecha: string = '';

    mostrarRepresentante: boolean = false;
    mostrarFecha: boolean = false;
    validar: boolean = false;
    isLoadingBotton: boolean = false;
    justificacion: any = '';
    fecha!: Date;
    hora!: Date;
    fechaDefinida!: String;
    convocatoriaGenerada!: Convocatoria;
    convocatoria: Convocatoria = {
        fechaEvaluacion: undefined,
        salon: '',
        horaEvaluacion: '',
        representante: '',
        tituloRepresentante: undefined
    };
    representante!: String;
    etapaActiva!: Etapa;

    constructor(private confirmationService: ConfirmationService,
        private messageService: MessageService, private location: Location,
        private documentosService: DocumentosService, private router: Router,
        private authService: AuthService, private proyectoService: ProyectoService,
        private usuarioService: UsuarioService, private route: ActivatedRoute,
        private datePipe: DatePipe, private tituloService: TituloService) { }

    ngOnInit() {
        this.getIdProyecto();
        this.getTituloProyecto();
        this.getCoordinadorEps();
        this.getAsesor();
        this.getTitulos();
        this.getSupervisor();
        this.getCoordinadorCarrera();
        this.getEtapaActiva();
        this.proyectoService.getProyectoPorId(this.idProyecto).subscribe(proyecto => {
            this.proyecto = proyecto;
        }, (error) => {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', 
                detail: 'Hubo un error al intentar obtener los datos del proyecto, vuelva a intentar mas tarde.',life:10000 });
            setTimeout(() => {
                this.regresar();
            }, 2000);
        });
    }

    getTitulos() {
        this.tituloService.getTitulos().subscribe(titulos => this.titulos = titulos);
    }

    getCoordinadorEps() {
        this.usuarioService.getCoordinadorEps().subscribe(coordinadorEps => this.coordinadorEps = coordinadorEps);
    }

    getCoordinadorCarrera() {
        this.proyectoService.getCoordinadorCarrera(this.idProyecto).subscribe(coordinadorCarrera => this.coordinadorCarrera = coordinadorCarrera);
    }

    getAsesor() {
        this.proyectoService.getUsuarioAsesor(this.idProyecto).subscribe(asesor => {
            this.asesor = asesor;
        })
    }

    getSupervisor() {
        this.proyectoService.getSupervisor(this.idProyecto).subscribe(supervisor => this.supervisor = supervisor);
    }

    getEtapaActiva() {
        this.proyectoService.getEtapaActiva(this.idProyecto).subscribe(etapaActiva => {
            this.etapaActiva = etapaActiva.etapa;
            if (this.etapaActiva.idEtapa == EtapaUtils.ID_ETAPA_CARGA_CONVOCATORIA_ANTEPROYECTO
                || this.etapaActiva.idEtapa == EtapaUtils.ID_ETAPA_EVALUACION_ANTEPROYECTO) {
                this.proyectoService.getConvocatoriaAnteproyecto(this.idProyecto).subscribe(convocatoria => {
                    this.convocatoriaGenerada = convocatoria;
                    this.mostrarFecha = true;
                    this.fechaDefinida = this.datePipe.transform(convocatoria.fechaEvaluacion, 'dd-MM-yyyy')!;
                });
            }
        });
    }

    getIdProyecto() {
        this.idProyecto = (this.location.getState() as { data: number }).data;
        console.log('idProyecto', this.idProyecto)
        if (this.idProyecto == undefined) {
            const storedIdProyecto = sessionStorage.getItem('idProyecto');
            this.idProyecto = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
        }
        if (this.idProyecto == undefined) {
            this.router.navigate(['gestiones/proyectos']);
        }
    }

    getTituloProyecto() {
        this.proyectoService.getElementoProyecto(this.idProyecto, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
            this.elementoTitulo = elementoProyecto;
        });
    }

    removerRepresentante() {
        this.mostrarRepresentante = false;
        this.convocatoria.representante = undefined;
        this.convocatoria.tituloRepresentante = undefined;
    }

    aceptar() {
        if (this.etapaActiva.idEtapa == EtapaUtils.ID_ETAPA_CONVOCATORIA_ANTEPROYECTO
            || this.etapaActiva.idEtapa == EtapaUtils.ID_ETAPA_CONVOCATORIA_EXAMEN_GENERAL) {
            this.definirEvaluacion();
        } else {
            this.modificarEvaluacion();
        }
    }

    definirEvaluacion() {
        this.convocatoria.horaEvaluacion = this.datePipe.transform(this.hora, 'HH:mm')!;
        if ((this.validarCampos(this.convocatoria, ['representante', 'tituloRepresentante']) && !this.mostrarRepresentante) ||
            (this.validarCampos(this.convocatoria, []) && this.mostrarRepresentante)) {
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de definir la fecha de evaluacion?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    this.isLoadingBotton = true;
                    this.proyectoService.crearConvocatoriaAnteproyecto(this.idProyecto, this.convocatoria).subscribe({
                        next: () => {
                            this.messageService.add({ key: 'tst', severity: 'success', summary: 'Evaluacion Definida', detail: 'Se ha definido la fecha de evaluacion exitosamente' });
                            setTimeout(() => {
                                this.regresar();
                            }, 2000);
                        },
                        error: (error) => {
                            this.isLoadingBotton = false;
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se puede crear la convocatoria' });
                        }
                    });
                }
            });
        } else {
            this.validar = true;
        }
    }

    modificarEvaluacion() {
        this.convocatoria.horaEvaluacion = this.datePipe.transform(this.hora, 'HH:mm')!;
        if ((this.validarCampos(this.convocatoria, ['representante', 'tituloRepresentante']) && !this.mostrarRepresentante) ||
            (this.validarCampos(this.convocatoria, []) && this.mostrarRepresentante)) {
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de definir la fecha de evaluacion?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    this.isLoadingBotton = true;
                    this.proyectoService.actualizarConvocatoriaAnteproyecto(this.idProyecto, this.convocatoria).subscribe({
                        next: () => {
                            this.messageService.add({ key: 'tst', severity: 'success', summary: 'Evaluacion Definida', detail: 'Se ha definido la fecha de evaluacion exitosamente' });
                            setTimeout(() => {
                                this.regresar();
                            }, 2000);
                        },
                        error: (error) => {
                            this.isLoadingBotton = false;
                            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se puede definir la fecha de evaluacion.' });
                        }
                    });
                }
            });
        } else {
            this.validar = true;
        }
    }

    regresar() {
        this.router.navigate(['gestiones/proyecto']);
    }

    validarCampos(obj: any, excludeFields: string[]): boolean {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !excludeFields.includes(key)) {
                const value = obj[key];
                if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
                    return false;
                }
            }
        }
        return true;
    }

    isFieldInvalid(field: any): boolean {
        if (field == undefined && this.validar) {
            return true;
        } else if (typeof field === 'string') {
            return this.validar && field.trim() === '';
        }
        return false;
    }
}
