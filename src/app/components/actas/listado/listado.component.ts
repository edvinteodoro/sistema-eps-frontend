import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Proyecto } from 'src/app/model/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EtapaUtils, Role } from 'src/app/model/Utils';
import { Acta } from 'src/app/model/Acta';
import { ActaService } from 'src/app/services/acta.service';

@Component({
    templateUrl: './listado.component.html',
    providers: [MessageService]
})
export class ListadoComponent implements OnInit {

    actas!: Acta[];
    cols: any[] = [];
    proyectoActivo?: Proyecto;
    totalRecords!: number;
    loading:boolean=false;

    nombreFilter: string = '';
    registroFilter: string = '';

    constructor(private actaService: ActaService,
        private proyectoService: ProyectoService, private authService: AuthService,
        private messageService: MessageService,
        private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.getActas();   
    }

    getActas(){
    }

    showErrorPage(){
        this.loading=false;
    }

    loadActas(event: any) {
        this.loading = true;
        this.actas = [];
        let page = event / 10;
        this.actaService.getActas(page, event,this.nombreFilter,this.registroFilter).subscribe(response => {
            this.actas = response.content;
            this.loading = false;
            this.totalRecords = response.totalElements;
        })
    }

    revisarActa(acta: Acta) {
        this.router.navigate(['actas/acta'], { state: { idActa: acta.idActa}});
    }

    getTagSeverity(revisado:boolean):any {
        let result={class:'danger',value:'Pendiente'};
        if(revisado)result={class:'success',value:'Finalizado'};
        return result;
    }

    buscar() {
        this.actaService.getActas(0, 10, this.nombreFilter, this.registroFilter).subscribe(response => {
            this.actas = response.content;
            this.totalRecords = response.totalElements;
        });
    }
}
