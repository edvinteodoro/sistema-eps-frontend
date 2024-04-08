import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Evaluacion } from 'src/app/model/Evaluacion';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Etapa } from 'src/app/model/Comentario';
import { ElementoUtils, EtapaUtils } from 'src/app/model/Utils';
import { DatePipe, Time } from '@angular/common';
import { ElementoProyecto } from 'src/app/model/ElementoProyecto';
import { Titulo } from 'src/app/model/Titulo';
import { TituloService } from 'src/app/services/titulo.service';
import { Acta } from 'src/app/model/Acta';
import { Convocatoria } from 'src/app/model/Convocatoria';


@Component({
    templateUrl: './evaluarProyecto.component.html',
    providers: [ConfirmationService, MessageService]
})

export class EvaluarProyectoComponent implements OnInit {
    idProyecto!: number;
    idEtapaActiva!:number;
    proyecto!: Proyecto;

    elementoTitulo!: ElementoProyecto;
    coordinadorEps!: Usuario;
    coordinadorCarrera!: Usuario;
    supervisor!: Usuario;
    asesor!: Usuario;
    titulos!: Titulo[];
    formatedFecha: string = '';
    mostrarFecha: boolean = false;
    validar: boolean = false;
    justificacion: any = '';
    fecha!: Date;
    hora!: Date;
    fechaDefinida!: String;
    fechaEvaluacionDefinida!: Evaluacion;
    convocatoriaGenerada!: Convocatoria;
    resuldados: any = ['APROBADO', 'APROBADO CON CORRECCIONES', 'RECHAZADO'];
    acta: Acta = {
        nota: 0,
        resultado: '',
        horaInicioEvaluacion: '',
        horaFinEvaluacion: ''
    }
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
            this.idEtapaActiva=etapaActiva.etapa.idEtapa;
            if (this.etapaActiva.idEtapa == EtapaUtils.CARGA_CONVOCATORIA
                || this.etapaActiva.idEtapa == EtapaUtils.SUBIR_NOTA) {
                this.proyectoService.getConvocatoriaAnteproyecto(this.idProyecto).subscribe(convocatoria => {
                    this.convocatoriaGenerada = convocatoria;
                    this.acta.fechaEvaluacion = convocatoria.fechaEvaluacionFormat;
                    this.acta.horaInicioEvaluacion = convocatoria.horaEvaluacion;
                    this.acta.horaFinEvaluacion = convocatoria.horaEvaluacion;
                });
            }else if(this.etapaActiva.idEtapa == EtapaUtils.EXAMEN_GENERAL){
                this.proyectoService.getConvocatoriaExamenGeneral(this.idProyecto).subscribe(convocatoria=>{
                    this.convocatoriaGenerada = convocatoria;
                    this.acta.fechaEvaluacion = convocatoria.fechaEvaluacionFormat;
                    this.acta.horaInicioEvaluacion = convocatoria.horaEvaluacion;
                    this.acta.horaFinEvaluacion = convocatoria.horaEvaluacion;
                })
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

    aceptar() {
        if (this.validarCampos(this.acta, [])) {
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de generar acta de evaluacion de anteproyecto?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {

                    this.proyectoService.crearActa(this.idProyecto, this.acta).subscribe({
                        next: () => {
                            this.messageService.add({ key: 'tst', severity: 'success', summary: 'Evaluacion Definida', detail: 'Se ha definido la fecha de evaluacion exitosamente' });
                            setTimeout(() => {
                                this.regresar();
                            }, 2000);
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    });
                }
            });
        }
    }



    definirEvaluacion() {/*
        this.evaluacion.hora = this.datePipe.transform(this.evaluacion.fecha, 'HH:mm')!;
        if (this.validarCampos(this.evaluacion,[])) {
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de definir la fecha de evaluacion?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    this.proyectoService.definirEvaluacionAnteproyecto(this.idProyecto, this.evaluacion).subscribe({
                        next: () => {
                            this.messageService.add({ key: 'tst', severity: 'success', summary: 'Evaluacion Definida', detail: 'Se ha definido la fecha de evaluacion exitosamente' });
                            setTimeout(() => {
                                this.regresar();
                            }, 2000);
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    });
                }
            });
        } else {
            this.validar = true;
        }*/
    }

    modificarEvaluacion() {/*
        this.evaluacion.hora = this.datePipe.transform(this.evaluacion.fecha, 'HH:mm')!;
        if (this.validarCampos(this.evaluacion,[])) {
            this.confirmationService.confirm({
                key: 'confirm1',
                message: '¿Estas seguro de definir la fecha de evaluacion?',
                acceptLabel: "Si",
                icon: 'pi pi-check-circle',
                accept: () => {
                    this.proyectoService.cambiarFechaEvaluacionAnteproyecto(this.idProyecto, this.evaluacion).subscribe({
                        next: () => {
                            this.messageService.add({ key: 'tst', severity: 'success', summary: 'Evaluacion Definida', detail: 'Se ha definido la fecha de evaluacion exitosamente' });
                            setTimeout(() => {
                                this.regresar();
                            }, 2000);
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    });
                }
            });
        } else {
            this.validar = true;
        }
    */}

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
