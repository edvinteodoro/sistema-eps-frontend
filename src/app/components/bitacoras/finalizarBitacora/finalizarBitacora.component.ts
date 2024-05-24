import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './finalizarBitacora.component.html',
    providers: [ConfirmationService, MessageService]
})

export class FinalizarBitacoraComponent implements OnInit {

    idProyecto!:number;
    proyecto!:Proyecto;
    cartaFinalizacion!: any;
    finiquitoContraparte!: any;

    constructor(private proyectoService: ProyectoService,
        private router: Router, private confirmationService: ConfirmationService,
        private messageService: MessageService,private location: Location) { }

    ngOnInit() {
        this.getIdProyecto();
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

    finalizarBitacora(){/*
        console.log('finalizar')
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de finalizar la bitacora?',
            acceptLabel: "Si",
            icon: 'pi pi-check-circle',
            accept: () => {
                this.proyectoService.finalizarBitacora(this.idProyecto,this.cartaFinalizacion,this.finiquitoContraparte).subscribe(() => {
                    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Bitacora Finalizada', detail: 'Se ha finalizado la bitacora exitosamente.' });
                    setTimeout(() => {
                        this.router.navigate(['gestiones/proyecto']);
                    }, 2000);
                });
            }
        });
    */}

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
}
