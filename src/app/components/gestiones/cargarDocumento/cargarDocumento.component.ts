import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { EtapaUtils } from 'src/app/model/Utils';

@Component({
    templateUrl: './cargarDocumento.component.html',
    providers: [ConfirmationService, MessageService]
})

export class CargarDocumentoComponent implements OnInit {
    EtapaUtils = EtapaUtils;

    idProyecto!: number;
    proyecto!: Proyecto;
    idEtapaActiva!: number;
    informeFinal!: any;
    cartaFinalizacion!: any;
    finiquitoContraparte!: any;
    convocatoriaFirmada!: any;
    cartaAceptacion!: any;
    oficioContraparte!: any;
    articulo!: any;
    traduccionArticulo!: any;
    constanciaLinguistica!: any;
    dictamenRevision!: any;
    cartaRevision!: any;
    isLoadingBotton: boolean = false;

    constructor(private proyectoService: ProyectoService,
        private router: Router, private confirmationService: ConfirmationService,
        private messageService: MessageService, private location: Location) { }

    ngOnInit() {
        this.getIdProyecto();
        this.getProyecto();
    }

    getIdProyecto() {
        this.idProyecto = (this.location.getState() as { idProyecto: number }).idProyecto;
        if (this.idProyecto == undefined) {
            const storedIdProyecto = sessionStorage.getItem('idProyecto');
            this.idProyecto = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
        }
        if (this.idProyecto == undefined) {
            this.router.navigate(['gestiones/proyecto']);
        }
    }

    getProyecto() {
        this.proyectoService.getProyectoPorId(this.idProyecto).subscribe(proyecto => {
            this.proyecto = proyecto;
            this.idEtapaActiva = proyecto.etapaActiva!.idEtapa;
        })
    }

    finalizarBitacora() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de finalizar la bitacora?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isLoadingBotton = true;
                this.proyectoService.finalizarBitacora(this.idProyecto, this.finiquitoContraparte).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Bitacora Finalizada', detail: 'Se ha finalizado la bitacora exitosamente.' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                }, (error) => {
                    this.isLoadingBotton = false;
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo finalizar la bitacora.' });
                });
            }
        });
    }

    cargarConvocatoria() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cargar la convocatoria?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isLoadingBotton = true;
                this.proyectoService.cargarConvocatoria(this.idProyecto, this.convocatoriaFirmada).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Convocatoria Cargada', detail: 'Se ha cargado la convocatoria exitosamente' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                }, (error) => {
                    this.isLoadingBotton = false;
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo cargar la convocatoria' });
                });
            }
        });
    }

    cargarInformeFinal() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cargar el informe final?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isLoadingBotton = true;
                this.proyectoService.cargarInformeFinal(this.idProyecto, this.cartaFinalizacion, this.informeFinal).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Informe Final Cargada', detail: 'Se ha cargado el informe final exitosamente' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                }, (error) => {
                    this.isLoadingBotton = false;
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo cargar el informe final.' });
                });
            }
        });
    }

    cargarCartaAceptacion() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cargar la carta de aceptacion?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isLoadingBotton = true;
                this.proyectoService.cargarCartaAceptacionContraparte(this.idProyecto, this.cartaAceptacion, this.oficioContraparte).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Carta de Aceptacion Cargada', detail: 'Se ha cargado la carta de aceptacion exitosamente' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                }, (error) => {
                    this.isLoadingBotton = false;
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo cargar la carta de aceptacion.' });
                });
            }
        });
    }

    cargarArticulo() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cargar la articulo?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isLoadingBotton = true;
                this.proyectoService.cargarArticulo(this.idProyecto, this.articulo, this.traduccionArticulo, this.constanciaLinguistica).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Articulo Cargado', detail: 'Se ha cargado el articulo exitosamente' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                }, (error) => {
                    this.isLoadingBotton = false;
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo cargar el articulo' });
                });
            }
        });
    }

    /*cargarConstanciaLinguistica(){
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cargar la constancia de revision linguistica?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.proyectoService.cargarConstanciaLinguistica(this.idProyecto, this.constanciaLinguistica).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Constancia Linguistica Cargada', detail: 'Se ha cargado la constancia de revision linguistica exitosamente' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                });
            }
        });
    }*/

    cargarDictamenCartaRevision() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cargar dictamen y carta de revision?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.isLoadingBotton = true;
                this.proyectoService.cargarDictamenRevision(this.idProyecto, this.dictamenRevision, this.cartaRevision).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Dictamen y Carta de Revision Cargadas', detail: 'Se ha cargado el dictamen y carta de revision exitosamente.' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                }, (error) => {
                    this.isLoadingBotton = false;
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo cargar dictamen y carta de revision.' });
                });
            }
        });
    }

    onUploadConvocatoriaFirmada(event: any) {
        this.convocatoriaFirmada = event.currentFiles[0];
    }

    onRemoveConvocatoriaFirmada() {
        this.convocatoriaFirmada = undefined;
    }

    onUploadCartaAceptacion(event: any) {
        this.cartaAceptacion = event.currentFiles[0];
    }

    onRemoveCartaAceptacion() {
        this.cartaAceptacion = undefined;
    }

    onUploadOficioContraparte(event: any) {
        this.oficioContraparte = event.currentFiles[0];
    }

    onRemoveOficioContraparte() {
        this.oficioContraparte = undefined;
    }


    onUploadInformeFinal(event: any) {
        this.informeFinal = event.currentFiles[0];
    }

    onRemoveInformeFinal() {
        this.informeFinal = undefined;
    }

    onUploadCartaFinalizacion(event: any) {
        this.cartaFinalizacion = event.currentFiles[0];
    }

    onRemoveCartaFinalizacion() {
        this.cartaFinalizacion = undefined;
    }

    onUploadFiniquitoContraparte(event: any) {
        this.finiquitoContraparte = event.currentFiles[0];
    }

    onRemoveFiniquitoContraparte() {
        this.finiquitoContraparte = undefined;
    }
    onUploadArticulo(event: any) {
        this.articulo = event.currentFiles[0];
    }

    onRemoveArticulo() {
        this.articulo = undefined;
    }
    onUploadTraduccionArticulo(event: any) {
        this.traduccionArticulo = event.currentFiles[0];
    }

    onRemoveTraduccionArticulo() {
        this.traduccionArticulo = undefined;
    }

    onUploadRevisionLinguistica(event: any) {
        this.constanciaLinguistica = event.currentFiles[0];
    }

    onRemoveRevisionLinguistica() {
        this.constanciaLinguistica = undefined;
    }

    onUploadDictamenRevision(event: any) {
        this.dictamenRevision = event.currentFiles[0];
    }

    onRemoveDictamenRevision() {
        this.dictamenRevision = undefined;
    }

    onUploadCartaRevision(event: any) {
        this.cartaRevision = event.currentFiles[0];
    }

    onRemoveCartaRevision() {
        this.cartaRevision = undefined;
    }
}
