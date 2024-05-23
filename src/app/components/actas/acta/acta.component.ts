import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Bitacora } from 'src/app/model/Bitacora';
import { Proyecto } from 'src/app/model/Proyecto';
import { Recurso } from 'src/app/model/Recurso';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { DocumentosService } from 'src/app/services/documentos.service';
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
        this.actaService.getActa(this.idActa).subscribe(acta => {
            this.acta = acta;
            this.getTituloProyecto();
        }, (error) => {
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
                    this.proyectoService.generarActaAnteproyecto(this.acta.proyecto!.idProyecto!, this.acta).subscribe(acta => {
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Cambios aprobados', detail: 'El acta se ha generado exitosamente' });
                        this.acta = acta;
                    })
                } else if (this.acta.tipo == 'EXAMEN GENERAL') {
                    this.proyectoService.generarActaExamenGeneral(this.acta.proyecto!.idProyecto!, this.acta).subscribe(acta => {
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Cambios aprobados', detail: 'El acta se ha generado exitosamente' });
                        this.acta = acta;
                    })
                } else if (this.acta.tipo == 'FINALIZACION') {
                    this.proyectoService.generarActaAprobacion(this.acta.proyecto!.idProyecto!, this.acta).subscribe(acta => {
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Cambios aprobados', detail: 'El acta se ha generado exitosamente' });
                        this.acta = acta;
                    })
                }
            }
        });
    }

    descargarActa() {
        if (this.acta.tipo == 'ANTEPROYECTO') {
            this.proyectoService.getElementoProyecto(this.acta.proyecto!.idProyecto!, ElementoUtils.ID_ELEMENTO_ACTA_ANTEPROYECTO).subscribe(elementoProyecto => {
                this.descargasService.descargar(elementoProyecto.informacion!).subscribe(
                    response => {
                        window.open(response.link.toString(), '_blank');
                    },
                    error => console.log('Error getting documento:', error)
                );
            });
        }else if (this.acta.tipo == 'EXAMEN GENERAL') {
            this.proyectoService.getElementoProyecto(this.acta.proyecto!.idProyecto!, ElementoUtils.ID_ELEMENTO_ACTA_EXAMEN_GENERAL).subscribe(elementoProyecto => {
                this.descargasService.descargar(elementoProyecto.informacion!).subscribe(
                    response => {
                        window.open(response.link.toString(), '_blank');
                    },
                    error => console.log('Error getting documento:', error)
                );
            });
        }else if (this.acta.tipo == 'FINALIZACION') {
            this.proyectoService.getElementoProyecto(this.acta.proyecto!.idProyecto!, ElementoUtils.ID_ELEMENTO_ACTA_APROBACION).subscribe(elementoProyecto => {
                this.descargasService.descargar(elementoProyecto.informacion!).subscribe(
                    response => {
                        window.open(response.link.toString(), '_blank');
                    },
                    error => console.log('Error getting documento:', error)
                );
            });
        }
    }

}
