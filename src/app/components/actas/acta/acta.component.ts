import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { ElementoProyecto } from 'src/app/model/ElementoProyecto';
import { ElementoUtils } from 'src/app/model/Utils';
import { Acta } from 'src/app/model/Acta';
import { ActaService } from 'src/app/services/acta.service';
import { DescargasService } from 'src/app/services/descargas.service';

@Component({
    templateUrl: './acta.component.html',
    providers: [ConfirmationService, MessageService]
})

export class ActaComponent implements OnInit {

    idActa!: number;
    acta!: Acta;
    proyecto!: Proyecto;
    tituloProyecto!: ElementoProyecto;
    isLoading:boolean=false;
    isLoadingBotton: boolean = false;
    isDownloading:boolean = false;

    constructor(private location: Location, private proyectoService: ProyectoService,
        private router: Router, private actaService: ActaService,
        private messageService: MessageService, private confirmationService: ConfirmationService,
        private descargasService: DescargasService) { }

    ngOnInit() {
        this.getIdActa();
        this.getActa();
    }

    getIdActa() {
        this.idActa = (this.location.getState() as { idActa: number }).idActa;
        if (this.idActa == undefined) {
            const storedIdActa = sessionStorage.getItem('idActa');
            this.idActa = storedIdActa ? JSON.parse(storedIdActa) : undefined;
        } else {
            sessionStorage.setItem('idActa', this.idActa.toString());
        }
        if (this.idActa == undefined) {
            this.listaActas();
        }
    }

    getActa() {
        this.isLoading=true;
        this.actaService.getActa(this.idActa).subscribe(acta => {
            this.acta = acta;
            this.getTituloProyecto();
            this.isLoading=false;
        }, (error) => {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Hubo un error al intentar obtener el acta.' });
            this.isLoading=false;
        });
    }

    getTituloProyecto() {
        this.proyectoService.getElementoProyecto(this.acta.proyecto!.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
            this.tituloProyecto = elementoProyecto;
        });
    }

    listaActas() {
        this.router.navigate(['actas/listado']);
    }

    generarActa() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de generar el acta?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                if (this.acta.tipo == 'ANTEPROYECTO') {
                    this.isLoadingBotton = true;
                    this.proyectoService.generarActaAnteproyecto(this.acta.proyecto!.idProyecto!, this.acta).subscribe(acta => {
                        this.isLoadingBotton = false;
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Acta generada', detail: 'El acta se ha generado exitosamente' });
                        this.acta = acta;
                    }, (error) => {
                        this.isLoadingBotton = false;
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se pudo generar el acta' });
                    })
                } else if (this.acta.tipo == 'EXAMEN GENERAL') {
                    this.isLoadingBotton = true;
                    this.proyectoService.generarActaExamenGeneral(this.acta.proyecto!.idProyecto!, this.acta).subscribe(acta => {
                        this.isLoadingBotton = false;
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Acta generada', detail: 'El acta se ha generado exitosamente' });
                        this.acta = acta;
                    }, (error) => {
                        this.isLoadingBotton = false;
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se pudo generar el acta' });
                    })
                } else if (this.acta.tipo == 'FINALIZACION') {
                    this.isLoadingBotton = true;
                    this.proyectoService.generarActaAprobacion(this.acta.proyecto!.idProyecto!, this.acta).subscribe(acta => {
                        this.isLoadingBotton = false;
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Acta generada', detail: 'El acta se ha generado exitosamente' });
                        this.acta = acta;
                    }, (error) => {
                        this.isLoadingBotton = false;
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se pudo generar el acta' });
                    })
                }
            }
        });
    }

    descargarActa() {
        if (this.acta.tipo == 'ANTEPROYECTO') {
            this.isDownloading=true;
            this.proyectoService.getElementoProyecto(this.acta.proyecto!.idProyecto!, ElementoUtils.ID_ELEMENTO_ACTA_ANTEPROYECTO).subscribe(elementoProyecto => {
                this.descargasService.descargar(elementoProyecto.informacion!).subscribe(
                    response => {
                        this.isDownloading=false;
                        window.open(response.link.toString(), '_blank');
                    }, (error) => {
                        this.isDownloading=false;
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se pudo descargar el acta' });
                    }
                );
            });
        } else if (this.acta.tipo == 'EXAMEN GENERAL') {
            this.isDownloading=true;
            this.proyectoService.getElementoProyecto(this.acta.proyecto!.idProyecto!, ElementoUtils.ID_ELEMENTO_ACTA_EXAMEN_GENERAL).subscribe(elementoProyecto => {
                this.descargasService.descargar(elementoProyecto.informacion!).subscribe(
                    response => {
                        this.isDownloading=false;
                        window.open(response.link.toString(), '_blank');
                    }, (error) => {
                        this.isDownloading=false;
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se pudo descargar el acta' });
                    }
                );
            });
        } else if (this.acta.tipo == 'FINALIZACION') {
            this.isDownloading=true;
            this.proyectoService.getElementoProyecto(this.acta.proyecto!.idProyecto!, ElementoUtils.ID_ELEMENTO_ACTA_APROBACION).subscribe(elementoProyecto => {
                this.descargasService.descargar(elementoProyecto.informacion!).subscribe(
                    response => {
                        this.isDownloading=false;
                        window.open(response.link.toString(), '_blank');
                    }, (error) => {
                        this.isDownloading=false;
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'No se pudo descargar el acta' });           
                    }
                );
            });
        }
    }

}
